/**
 * @fileoverview Centralised error handler for MU Sports API.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const { AppError } = require('../utils/errors');
const { sendError } = require('../utils/response');
const logger = require('../utils/logger');
const config = require('../config/env');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode, err.code);
  }

  // Prisma unique constraint
  if (err.code === 'P2002') {
    return sendError(res, 'That record already exists.', 409, 'CONFLICT');
  }
  // Prisma record not found
  if (err.code === 'P2025') {
    return sendError(res, 'Record not found.', 404, 'NOT_FOUND');
  }

  logger.error('Unhandled error:', err);

  const message =
    config.env === 'production' ? 'Something went wrong. Try again.' : err.message;

  return sendError(res, message, 500, 'INTERNAL_ERROR');
}

module.exports = errorHandler;