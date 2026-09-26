/**
 * @fileoverview Team data access.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const prisma = require('../config/database');

async function findAll({ sportId, college } = {}) {
  const where = {};
  if (sportId) where.sportId = sportId;
  if (college) where.college = college;

  return prisma.team.findMany({
    where,
    orderBy: { name: 'asc' },
    include: {
      sport: { select: { name: true, slug: true } },
      _count: { select: { members: true } },
    },
  });
}

async function findBySlug(slug) {
  return prisma.team.findUnique({
    where: { slug },
    include: {
      sport: true,
      members: {
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      },
      standings: true,
    },
  });
}

async function create(data) {
  return prisma.team.create({ data });
}

async function findBySlugRaw(slug) {
  return prisma.team.findUnique({ where: { slug } });
}

module.exports = { findAll, findBySlug, create, findBySlugRaw };