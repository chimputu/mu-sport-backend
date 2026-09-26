/**
 * @fileoverview User data access.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const prisma = require('../config/database');

const PUBLIC_FIELDS = {
  id: true,
  email: true,
  name: true,
  role: true,
  studentId: true,
  college: true,
  createdAt: true,
};

async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
  return prisma.user.findUnique({ where: { id }, select: PUBLIC_FIELDS });
}

async function create(data) {
  return prisma.user.create({ data, select: PUBLIC_FIELDS });
}

module.exports = { findByEmail, findById, create };