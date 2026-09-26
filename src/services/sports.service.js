/**
 * @fileoverview Sport business logic.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const sportsRepo = require('../repositories/sports.repository');
const { NotFoundError } = require('../utils/errors');

async function listSports() {
  return sportsRepo.findAll();
}

async function getSportBySlug(slug) {
  const sport = await sportsRepo.findBySlug(slug);
  if (!sport) throw new NotFoundError('Sport not found.');
  return sport;
}

module.exports = { listSports, getSportBySlug };