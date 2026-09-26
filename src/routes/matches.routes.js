/**
 * @fileoverview Match routes.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const express = require('express');
const controller = require('../controllers/matches.controller');
const {
  listMatchesQuery,
  createMatchSchema,
  updateScoreSchema,
} = require('../validators/matches.validator');
const { validate } = require('../middleware/validate');
const { requireAuth, requireRole } = require('../middleware/auth');
const { writeLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.get('/', validate(listMatchesQuery, 'query'), controller.list);
router.get('/:id', controller.detail);
router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  writeLimiter,
  validate(createMatchSchema),
  controller.create
);
router.patch(
  '/:id/score',
  requireAuth,
  requireRole('ADMIN'),
  writeLimiter,
  validate(updateScoreSchema),
  controller.updateScore
);

module.exports = router;