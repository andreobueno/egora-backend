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
        const data = request.only(["name", "facebookLink"]);
        const member = await Member.query()
            .where({ facebook: data.facebookLink })
            .first();
        if (!member) {
            const newMember = await Member.create({
                name: data.name,
                facebook: data.facebookLink
            });
            const priceStrike = await PriceStrike.create({
                member_id: newMember.id,
                strike_number: 1
            });
            return priceStrike;
        } else {
            const memberStrikeNumber = await PriceStrike.query()
                .where({ member_id: member.id })
                .count();

            let [{ count }] = memberStrikeNumber;

            const priceStrike = await PriceStrike.create({
                member_id: member.id,
                strike_number: 1 + Number(count)
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

        const member = await Member.query()
            .where({ facebook: params.id })
            .first();

        if (!member) {
            /* return response
                .status(404)
                .send({ error: { message: "User not Found!" } });*/
            return [];
        }

        const priceStrike = await PriceStrike.query()
            .where({ member_id: member.id })
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
        const data = request.only(["member_id", "strike_number"]);

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
