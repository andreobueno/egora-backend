"use strict";

const Message = use("App/Models/Message");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {
    async index({ request, response, view }) {
        const messages = await Message.all();
        return messages;
    }

    async store({ request }) {
        const data = request.only(["name", "description"]);

        const message = await Message.create(data);

        return message;
    }

    async show({ params }) {
        const message = await Message.findOrFail(params.id);

        return message;
    }

    async update({ params, request }) {
        const data = request.only(["name", "description"]);

        const message = await Message.findOrFail(params.id);

        message.merge(data);

        await message.save();

        return message;
    }

    async destroy({ params, request, response }) {
        const message = await Message.findOrFail(params.id);

        await message.delete();
    }
}

module.exports = MessageController;
