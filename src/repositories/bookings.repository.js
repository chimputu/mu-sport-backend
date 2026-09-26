/**
 * @fileoverview Booking data access.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const prisma = require('../config/database');

async function findConflicts({ venueId, startTime, endTime, ignoreId }) {
  return prisma.booking.findFirst({
    where: {
      venueId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      id: ignoreId ? { not: ignoreId } : undefined,
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
    },
  });
}

async function findMany({ venueId, date, status } = {}) {
  const where = {};
  if (venueId) where.venueId = venueId;
  if (status) where.status = status;
  if (date) {
    const { startOfDayCat, endOfDayCat } = require('../utils/dates');
    where.startTime = { gte: startOfDayCat(date), lte: endOfDayCat(date) };
  }

  return prisma.booking.findMany({
    where,
    orderBy: { startTime: 'asc' },
    include: {
      user: { select: { id: true, name: true, email: true } },
      venue: { select: { id: true, name: true, type: true } },
    },
  });
}

async function create(data) {
  return prisma.booking.create({ data });
}

async function update(id, data) {
  return prisma.booking.update({ where: { id }, data });
}

async function findById(id) {
  return prisma.booking.findUnique({ where: { id } });
}

module.exports = { findConflicts, findMany, create, update, findById };