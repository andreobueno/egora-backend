"use strict";

const Member = use("App/Models/Member");
const RemovedMember = use("App/Models/RemovedMember");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with removedmembers
 */
class RemovedMemberController {
    /**
     * Show a list of all removedmembers.
     * GET removedmembers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({}) {
        const removedMembers = await RemovedMember.query()
            .where({ active: 1 })
            .with("member")
            .fetch();

        console.log(removedMembers);

        return removedMembers;
    }

    /**
     * Create/save a new removedmember.
     * POST removedmembers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request }) {
        const data = request.only(["name", "facebook", "reason", "return_at"]);
        const member = await Member.query()
            .where({ facebook: data.facebook })
            .first();
        console.log(member);
        if (!member) {
            const newMember = await Member.create({
                name: data.name,
                facebook: data.facebook
            });
            const removedMember = await RemovedMember.create({
                member_id: newMember.id,
                active: 1,
                reason: data.reason,
                return_at: data.return_at
            });
            return removedMember;
        } else {
            const removedMember = await RemovedMember.create({
                member_id: member.id,
                active: 1,
                reason: data.reason,
                return_at: data.return_at
            });

            return removedMember;
        }
    }

    /**
     * Display a single removedmember.
     * GET removedmembers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        let removedMember = null;
        const member = await Member.query()
            .where({ facebook: params.id })
            .first();

        if (!member) {
            /* return response
                        .status(404)
                        .send({ error: { message: "User not Found!" } });*/

            return removedMember;
        }
        removedMember = await RemovedMember.query()
            .where({ active: 1 })
            .where({ member_id: member.id })
            .with("member")
            .fetch();

        return removedMember.rows;
    }

    /**
     * Update removedmember details.
     * PUT or PATCH removedmembers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const data = request.only(["active"]);

        const removedMember = await RemovedMember.findOrFail(params.id);

        removedMember.merge(data);

        await removedMember.save();

        return removedMember;
    }

    /**
     * Delete a removedmember with id.
     * DELETE removedmembers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        const removedMember = await RemovedMember.findOrFail(params.id);

        removedMember.active = "0";

        await removedMember.save();
    }
}

module.exports = RemovedMemberController;
