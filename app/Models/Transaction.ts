import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Transaction extends BaseModel {
  public static get TYPE_DEBIT(): string {
    return 'debit'
  }

  public static get TYPE_CREDIT(): string {
    return 'credit'
  }

  @column({ isPrimary: true })
  public id: string
  @column()
  public sender_id: number
  @column()
  public receiver_id: number
  @column()
  public amount: number
  @column()
  public type: 'debit' | 'credit'
  @column()
  public completed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'sender_id',
  })
  public sender: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'receiver_id',
    localKey: 'id',
  })
  public receiver: BelongsTo<typeof User>
}
