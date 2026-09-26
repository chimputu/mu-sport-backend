/**
 * @fileoverview Booking HTTP controllers.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const bookingsService = require('../services/bookings.service');
const { sendSuccess } = require('../utils/response');

async function list(req, res, next) {
  try {
    const bookings = await bookingsService.listBookings({
      venueId: req.query.venueId,
      date: req.query.date,
      status: req.query.status,
    });
    return sendSuccess(res, bookings);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const booking = await bookingsService.createBooking({
      userId: req.user.id,
      ...req.body,
    });
    return sendSuccess(res, booking, 201);
  } catch (err) {
    return next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const booking = await bookingsService.updateBookingStatus(
      req.params.id,
      req.body,
      req.user
    );
    return sendSuccess(res, booking);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, create, updateStatus };