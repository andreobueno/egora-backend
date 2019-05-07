"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MessagesSchema extends Schema {
    up() {
        this.create("messages", table => {
            table.increments();
            table.timestamps();
            table
                .string("name", 80)
                .notNullable()
                .unique();
            table

                .string("description", 2000)
                .notNullable()
                .unique();
        });
    }

    down() {
        this.drop("messages");
    }
}

module.exports = MessagesSchema;
