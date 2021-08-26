import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from 'App/Validators/Users/RegistrationValidator'

export default class RegisterController {
  public async handle({ response, request }: HttpContextContract) {
    await request.validate(RegistrationValidator)
    return response.send({
      user: await User.create(request.only(['name', 'email', 'password'])),
    })
  }
}
