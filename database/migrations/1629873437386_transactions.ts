import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Transaction from "App/Models/Transaction";

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('sender_id').unsigned().references('users.id').onDelete('cascade')
      table.integer('receiver_id').unsigned().references('users.id').onDelete('cascade')
      table.double('amount', 20)
      table.enum('type', [Transaction.TYPE_DEBIT, Transaction.TYPE_CREDIT])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
