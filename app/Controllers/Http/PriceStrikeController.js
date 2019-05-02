"use strict";

const PriceStrike = use("App/Models/PriceStrike");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pricestrikes
 */
class PriceStrikeController {
    /**
     * Show a list of all pricestrikes.
     * GET pricestrikes
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const priceStrikes = await PriceStrike.query()
            .with("member")
            .fetch();

        return priceStrikes;
    }

    /**
     * Create/save a new pricestrike.
     * POST pricestrikes
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const data = request.only(["member_id", "strikeNumber"]);

        const priceStrike = await PriceStrike.create(data);

        return priceStrike;
    }

    /**
     * Display a single pricestrike.
     * GET pricestrikes/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        // const priceStrike = await PriceStrike.findOrFail(params.id);

        const priceStrike = await PriceStrike.query()
            .where({ id: params.id })
            .with("member")
            .fetch();

        return priceStrike;
    }

    /**
     * Update pricestrike details.
     * PUT or PATCH pricestrikes/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request }) {
        const data = request.only(["member_id", "strikeNumber"]);

        const priceStrike = await PriceStrike.findOrFail(params.id);

        priceStrike.merge(data);

        await priceStrike.save();

        return priceStrike;
    }

    /**
     * Delete a pricestrike with id.
     * DELETE pricestrikes/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params }) {
        const priceStrike = await PriceStrike.findOrFail(params.id);

        await priceStrike.delete();
    }
}

module.exports = PriceStrikeController;
