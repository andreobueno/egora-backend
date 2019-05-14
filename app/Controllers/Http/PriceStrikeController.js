"use strict";

const Member = use("App/Models/Member");
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
            .where({ active: 1 })
            .with("member")
            .fetch();
        console.log(priceStrikes);

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
        const data = request.only(["name", "facebook"]);
        const member = await Member.query()
            .where({ facebook: data.facebook })
            .first();
        if (!member) {
            const newMember = await Member.create({
                name: data.name,
                facebook: data.facebook
            });
            const priceStrike = await PriceStrike.create({
                member_id: newMember.id,
                active: 1
            });
            return priceStrike;
        } else {
            const priceStrike = await PriceStrike.create({
                member_id: member.id,
                active: 1
            });

            return priceStrike;
        }
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
        let priceStrike = null;
        let count = 0;

        const member = await Member.query()
            .where({ facebook: params.id })
            .first();

        if (!member) {
            /* return response
                    .status(404)
                    .send({ error: { message: "User not Found!" } });*/

            return [priceStrike, count];
        } else {
            count = await PriceStrike.query()
                .where({ active: 1 })
                .where({ member_id: member.id })
                .count();

            priceStrike = await PriceStrike.query()
                .where({ active: 1 })
                .where({ member_id: member.id })
                .with("member")
                .fetch();
        }

        return [priceStrike.rows, count[0].count];
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
        const data = request.only(["active"]);

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

        priceStrike.active = "0";

        await priceStrike.save();
    }
}

module.exports = PriceStrikeController;
