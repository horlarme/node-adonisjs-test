import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Transaction from 'App/Models/Transaction'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Transfer {
  private async creditUser(user: User, amount: number, sender: User) {
    // crediting user
    user.balance += amount
    await user.save()
    Transaction.create({
      amount,
      id: string.generateRandom(15),
      completed: true,
      type: 'credit',
      receiver_id: user.id,
      sender_id: sender?.id,
    }).then(null)
  }

  private async debitSender(receiver: User, sender: User, amount: number) {
    sender.balance -= amount
    await sender.save()
    Transaction.create({
      amount,
      id: string.generateRandom(15),
      completed: true,
      type: 'debit',
      receiver_id: receiver.id,
      sender_id: sender?.id,
    }).then(null)
  }

  public async handle({ response, request, auth }: HttpContextContract) {
    const receiver = (await User.findByOrFail(
      'email',
      request.input('receiver_mail')
    )) as unknown as User
    const amount = parseFloat(request.input('amount'))
    const sender = auth.user as User

    await this.debitSender(receiver, sender, amount)
    await this.creditUser(receiver, amount, sender)
    return response.send({ message: 'Transfer Completed' })
  }
}
