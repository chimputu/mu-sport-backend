/**
 * @fileoverview Team HTTP controllers.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const teamsService = require('../services/teams.service');
const { sendSuccess } = require('../utils/response');

async function list(req, res, next) {
  try {
    const teams = await teamsService.listTeams({
      sportId: req.query.sportId,
      college: req.query.college,
    });
    return sendSuccess(res, teams);
  } catch (err) {
    return next(err);
  }
}

async function detail(req, res, next) {
  try {
    const team = await teamsService.getTeamBySlug(req.params.slug);
    return sendSuccess(res, team);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const team = await teamsService.createTeam(req.body);
    return sendSuccess(res, team, 201);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, detail, create };