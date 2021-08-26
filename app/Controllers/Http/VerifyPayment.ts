import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'

export default class VerifyPayment {
  public async handle({ response, request }: HttpContextContract) {
    const transaction = (await Transaction.find(request.input('reference'))) as Transaction

    if (transaction.completed) {
      return response.send({ message: 'Transaction Claimed Already' })
    }
    transaction.completed = true
    await transaction.save()

    await transaction.load('sender')
    await transaction.load('receiver')
    transaction.receiver.balance = transaction.receiver.balance + transaction?.amount
    await transaction?.receiver?.save()
    return response.send({ message: 'Wallet Credited' })
  }
}
