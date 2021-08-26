import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/Beneficiary/CreateValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class AddBeneficiary {
  public async handle({ response, auth, request }: HttpContextContract) {
    await request.validate(CreateValidator)

    const paystackRequest = await axios.post(
      'https://api.paystack.co/transferrecipient',
      {
        type: 'nuban',
        account_number: request.input('account'),
        bank_code: request.input('bank'),
      },
      {
        headers: {
          authorization: 'Bearer ' + Env.get('PAYSTACK_SECRET_KEY'),
        },
      }
    )
    console.log(paystackRequest.data.data)
    const beneficiary = await auth.user?.related('beneficiaries').create({
      code: paystackRequest.data.data.recipient_code,
      name: paystackRequest.data.data.details.account_name,
      account: paystackRequest.data.data.details.account_number,
      bank: paystackRequest.data.data.details.bank_name,
    })

    return response.send(beneficiary)
  }
}
