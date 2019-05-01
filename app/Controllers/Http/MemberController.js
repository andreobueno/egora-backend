'use strict'

const Member = use('App/Models/Member')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with members
 */
class MemberController {
  /**
   * Show a list of all members.
   * GET members
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const members = await Member.all()
    return members
  }

  /**
   * Create/save a new member.
   * POST members
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'facebook'])

    const member = await Member.create(data)

    return member
  }

  /**
   * Display a single member.
   * GET members/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const member = await Member.findOrFail(params.id)

    return member
  }

  /**
   * Update member details.
   * PUT or PATCH members/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only(['name', 'facebook'])

    const member = await Member.findOrFail(params.id)

    member.merge(data)

    await member.save()

    return member
  }

  /**
   * Delete a member with id.
   * DELETE members/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const member = await Member.findOrFail(params.id)

    await member.delete()
  }
}

module.exports = MemberController
