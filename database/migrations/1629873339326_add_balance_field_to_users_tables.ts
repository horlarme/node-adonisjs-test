import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.double('balance', 20).defaultTo(0).after('password')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('balance')
    })
  }
}
