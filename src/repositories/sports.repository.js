/**
 * @fileoverview Sport data access.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const prisma = require('../config/database');

async function findAll() {
  return prisma.sport.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { teams: true } } },
  });
}

async function findBySlug(slug) {
  return prisma.sport.findUnique({
    where: { slug },
    include: {
      teams: {
        orderBy: { name: 'asc' },
        include: { _count: { select: { members: true } } },
      },
    },
  });
}

module.exports = { findAll, findBySlug };