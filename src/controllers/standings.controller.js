/**
 * @fileoverview Standings HTTP controllers.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const standingsService = require('../services/standings.service');
const { sendSuccess } = require('../utils/response');

async function list(req, res, next) {
  try {
    const standings = await standingsService.listStandings({
      sport: req.query.sport,
    });
    return sendSuccess(res, standings);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list };