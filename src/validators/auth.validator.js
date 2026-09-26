/**
 * @fileoverview Zod schemas for auth endpoints.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  name: z.string().min(2, 'Enter your full name.').max(120),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  studentId: z.string().min(3).max(30).optional(),
  college: z.string().min(2).max(80).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
});

module.exports = { registerSchema, loginSchema };