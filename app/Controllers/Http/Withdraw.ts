import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Beneficiary from 'App/Models/Beneficiary'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import Transaction from 'App/Models/Transaction'

export default class Withdraw {
  public async handle({ response, request, auth }: HttpContextContract) {
    console.log(request.input('beneficiary'))
    const amount = parseFloat(request.input('amount'))
    const beneficiary = await Beneficiary.findOrFail(request.input('beneficiary'))

    const r = await axios.post(
      'https://api.paystack.co/transfer',
      {
        source: 'balance',
        amount: amount * 100,
        recipient: beneficiary.code,
      },
      {
        headers: {
          authorization: 'Bearer ' + Env.get('PAYSTACK_SECRET_KEY'),
        },
      }
    )

    auth.user.balance -= amount
    await auth.user?.save()
    await Transaction.create({
      amount: amount,
      id: string.generateRandom(15),
      sender_id: auth.user?.id as number,
      receiver_id: auth.user?.id as number,
      type: 'debit',
      completed: true,
    })

    return response.send({ message: 'Withdrawal Successfull' })
  }
}
