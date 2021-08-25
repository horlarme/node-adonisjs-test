import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileController {
  public async handle({ response, auth }: HttpContextContract) {
    return response.send(auth.user)
  }
}
