/**
 * @fileoverview Booking business logic including conflict detection.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const bookingsRepo = require('../repositories/bookings.repository');
const { NotFoundError, ConflictError, ForbiddenError } = require('../utils/errors');

async function listBookings(filters) {
  return bookingsRepo.findMany(filters);
}

async function createBooking({ userId, venueId, startTime, endTime, purpose }) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const conflict = await bookingsRepo.findConflicts({
    venueId,
    startTime: start,
    endTime: end,
  });

  if (conflict) {
    throw new ConflictError('This slot is already booked. Choose another time.');
  }

  return bookingsRepo.create({
    userId,
    venueId,
    startTime: start,
    endTime: end,
    purpose,
    status: 'PENDING',
  });
}

async function updateBookingStatus(id, { status }, actor) {
  const booking = await bookingsRepo.findById(id);
  if (!booking) throw new NotFoundError('Booking not found.');

  const isOwner = booking.userId === actor.id;
  const isAdmin = actor.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('You cannot modify this booking.');
  }
  if (!isAdmin && status !== 'CANCELLED') {
    throw new ForbiddenError('Only admins can confirm or complete bookings.');
  }

  return bookingsRepo.update(id, { status });
}

module.exports = { listBookings, createBooking, updateBookingStatus };