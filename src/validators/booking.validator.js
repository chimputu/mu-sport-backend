/**
 * @fileoverview Zod schemas for booking endpoints.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const { z } = require('zod');

const createBookingSchema = z
  .object({
    venueId: z.string().min(1, 'Select a facility.'),
    startTime: z.string().datetime({ offset: true }),
    endTime: z.string().datetime({ offset: true }),
    purpose: z.string().max(200).optional(),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: 'End time must be after start time.',
    path: ['endTime'],
  });

const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
});

const listBookingsQuery = z.object({
  venueId: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
});

module.exports = { createBookingSchema, updateBookingSchema, listBookingsQuery };