/**
 * @fileoverview Standing data access.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const prisma = require('../config/database');

async function findMany({ sport } = {}) {
  const where = sport ? { team: { sport: { slug: sport } } } : {};

  return prisma.standing.findMany({
    where,
    orderBy: [{ points: 'desc' }, { goalsFor: 'desc' }, { goalsAgainst: 'asc' }],
    include: {
      team: { select: { id: true, name: true, college: true } },
      sport: { select: { name: true, slug: true } },
    },
  });
}

module.exports = { findMany };