/**
 * @fileoverview Team business logic.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const teamsRepo = require('../repositories/teams.repository');
const { NotFoundError, ConflictError } = require('../utils/errors');

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

async function listTeams(filters) {
  return teamsRepo.findAll(filters);
}

async function getTeamBySlug(slug) {
  const team = await teamsRepo.findBySlug(slug);
  if (!team) throw new NotFoundError('Team not found.');
  return team;
}

async function createTeam({ name, college, sportId }) {
  const slug = slugify(name);
  const existing = await teamsRepo.findBySlugRaw(slug);
  if (existing) throw new ConflictError('A team with that name already exists.');
  return teamsRepo.create({ name, slug, college, sportId });
}

module.exports = { listTeams, getTeamBySlug, createTeam };