"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RemovedMembersSchema extends Schema {
    up() {
        this.create("removed_members", table => {
            table.increments();
            table
                .integer("member_id")
                .unsigned()
                .references("id")
                .inTable("members")
                .onUpdate("CASCADE")
                .onDelete("SET NULL");
            table.bool("active").notNullable();
            table.string("reason", 100).notNullable();
            table.date("return_at");

            table.timestamps();
        });
    }

    down() {
        this.drop("removed_members");
    }
}

module.exports = RemovedMembersSchema;
