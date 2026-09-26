/**
 * @fileoverview Sport HTTP controllers.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const sportsService = require('../services/sports.service');
const { sendSuccess } = require('../utils/response');

async function list(_req, res, next) {
  try {
    const sports = await sportsService.listSports();
    return sendSuccess(res, sports);
  } catch (err) {
    return next(err);
  }
}

async function detail(req, res, next) {
  try {
    const sport = await sportsService.getSportBySlug(req.params.slug);
    return sendSuccess(res, sport);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, detail };