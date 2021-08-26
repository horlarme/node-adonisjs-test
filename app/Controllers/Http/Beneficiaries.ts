import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Beneficiaries {
  public async handle({ response, auth }: HttpContextContract) {
    await auth.user?.load('beneficiaries')
    return response.send(auth.user?.beneficiaries)
  }
}
