'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', table => {
      table.increments()
      table.string('name', 80).notNullable()
      table
        .string('facebook', 254)
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema
