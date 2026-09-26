/**
 * @fileoverview Match data access.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const prisma = require('../config/database');

async function findAll({ status, sport, teamId } = {}) {
  const where = {};
  if (status) where.status = status;
  if (teamId) {
    where.OR = [{ homeTeamId: teamId }, { awayTeamId: teamId }];
  }
  if (sport) {
    where.homeTeam = { sport: { slug: sport } };
  }

  return prisma.match.findMany({
    where,
    orderBy: { kickoff: 'asc' },
    include: {
      homeTeam: { select: { id: true, name: true, college: true } },
      awayTeam: { select: { id: true, name: true, college: true } },
      venue: { select: { id: true, name: true } },
    },
  });
}

async function findById(id) {
  return prisma.match.findUnique({
    where: { id },
    include: {
      homeTeam: true,
      awayTeam: true,
      venue: true,
      events: { orderBy: { minute: 'asc' } },
    },
  });
}

async function create(data) {
  return prisma.match.create({ data });
}

async function updateScore(id, data) {
  return prisma.match.update({ where: { id }, data });
}

module.exports = { findAll, findById, create, updateScore };