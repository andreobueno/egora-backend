"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PriceStrikeSchema extends Schema {
    up() {
        this.create("price_strikes", table => {
            table.increments();
            table
                .integer("member_id")
                .unsigned()
                .references("id")
                .inTable("members")
                .onUpdate("CASCADE")
                .onDelete("SET NULL");
            table.integer("strike_number").notNullable();
            table.timestamps();
        });
    }

    down() {
        this.drop("price_strikes");
    }
}

module.exports = PriceStrikeSchema;
