/**
 * @fileoverview Zod schemas for team endpoints.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const { z } = require('zod');

const createTeamSchema = z.object({
  name: z.string().min(2).max(80),
  college: z.string().min(2).max(80),
  sportId: z.string().min(1),
});

const registerTeamSchema = z.object({
  teamName: z.string().min(2).max(80),
  sportId: z.string().min(1),
  notes: z.string().max(500).optional(),
});

module.exports = { createTeamSchema, registerTeamSchema };