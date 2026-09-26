/**
 * @fileoverview Standings business logic.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const standingsRepo = require('../repositories/standings.repository');

async function listStandings(filters) {
  return standingsRepo.findMany(filters);
}

module.exports = { listStandings };