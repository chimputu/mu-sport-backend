/**
 * @fileoverview 404 middleware for unmatched routes.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 */

const { sendError } = require('../utils/response');

function notFound(req, res) {
  return sendError(res, `Route ${req.method} ${req.originalUrl} not found.`, 404, 'NOT_FOUND');
}

module.exports = notFound;