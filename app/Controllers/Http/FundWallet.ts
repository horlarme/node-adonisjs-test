import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Transaction from 'App/Models/Transaction'
import { string } from '@ioc:Adonis/Core/Helpers'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

export default class FundWallet {
  public async handle({ request, auth, response }: HttpContextContract) {
    console.log(Route.makeUrl('paymentConfirmation'))
    const amount: number = request.input('amount') as number
    const reference: string = string.generateRandom(15)

    const paystackRequest = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: auth.user?.email,
        reference,
        callback_url: Route.makeUrl(
          'paymentConfirmation',
          {},
          { prefixUrl: 'http://' + Env.get('HOST') }
        ),
        amount: request.input('amount') * 100,
      },
      {
        headers: {
          authorization: 'Bearer ' + Env.get('PAYSTACK_SECRET_KEY'),
        },
      }
    )

    await Transaction.create({
      amount: amount,
      id: reference,
      sender_id: auth.user?.id as number,
      receiver_id: auth.user?.id as number,
      type: 'credit',
      completed: false,
    })

    return response.send({ url: paystackRequest.data.data.authorization_url })
  }
}
