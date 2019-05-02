"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PriceStrike extends Model {
    member() {
        return this.belongsTo("App/Models/Member");
    }
}

module.exports = PriceStrike;
