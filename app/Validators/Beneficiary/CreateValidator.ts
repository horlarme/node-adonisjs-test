import { schema } from '@ioc:Adonis/Core/Validator'

export default class CreateValidator {
  public schema = schema.create({
    name: schema.string(),
    account: schema.string(),
    bank: schema.number(),
  })
}
