/**
 * @fileoverview Match business logic.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const matchesRepo = require('../repositories/matches.repository');
const { NotFoundError, BadRequestError } = require('../utils/errors');

async function listMatches(filters) {
  return matchesRepo.findAll(filters);
}

async function getMatch(id) {
  const match = await matchesRepo.findById(id);
  if (!match) throw new NotFoundError('Match not found.');
  return match;
}

async function createMatch(data) {
  if (data.homeTeamId === data.awayTeamId) {
    throw new BadRequestError('Home and away teams must be different.');
  }
  return matchesRepo.create({
    homeTeamId: data.homeTeamId,
    awayTeamId: data.awayTeamId,
    venueId: data.venueId || null,
    kickoff: new Date(data.kickoff),
    status: 'SCHEDULED',
  });
}

async function updateScore(id, { homeScore, awayScore, status }) {
  const match = await matchesRepo.findById(id);
  if (!match) throw new NotFoundError('Match not found.');

  const update = { homeScore, awayScore };
  if (status) update.status = status;
  else if (status === undefined && match.status !== 'COMPLETED') {
    update.status = 'COMPLETED';
  }

  return matchesRepo.updateScore(id, update);
}

module.exports = { listMatches, getMatch, createMatch, updateScore };