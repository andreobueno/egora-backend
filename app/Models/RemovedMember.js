"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class RemovedMember extends Model {
    member() {
        return this.belongsTo("App/Models/Member");
    }
}

module.exports = RemovedMember;
