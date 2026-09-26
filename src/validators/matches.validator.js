/**
 * @fileoverview Zod schemas for match endpoints.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const { z } = require('zod');

const listMatchesQuery = z.object({
  status: z.enum(['SCHEDULED', 'LIVE', 'COMPLETED', 'POSTPONED', 'CANCELLED']).optional(),
  sport: z.string().optional(),
  teamId: z.string().optional(),
});

const createMatchSchema = z.object({
  homeTeamId: z.string().min(1),
  awayTeamId: z.string().min(1),
  venueId: z.string().optional(),
  kickoff: z.string().datetime({ offset: true }),
});

const updateScoreSchema = z.object({
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
  status: z.enum(['SCHEDULED', 'LIVE', 'COMPLETED', 'POSTPONED', 'CANCELLED']).optional(),
});

module.exports = { listMatchesQuery, createMatchSchema, updateScoreSchema };