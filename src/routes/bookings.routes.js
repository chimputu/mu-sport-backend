/**
 * @fileoverview Booking routes.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const express = require('express');
const controller = require('../controllers/bookings.controller');
const {
  createBookingSchema,
  updateBookingSchema,
  listBookingsQuery,
} = require('../validators/bookings.validator');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { writeLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.get('/', validate(listBookingsQuery, 'query'), controller.list);
router.post(
  '/',
  requireAuth,
  writeLimiter,
  validate(createBookingSchema),
  controller.create
);
router.patch(
  '/:id',
  requireAuth,
  writeLimiter,
  validate(updateBookingSchema),
  controller.updateStatus
);

module.exports = router;