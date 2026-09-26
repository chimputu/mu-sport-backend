/**
 * @fileoverview Minimal logger wrapper.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 */

const config = require('../config/env');

const logger = {
  info: (...args) => {
    if (config.env !== 'test') console.info('[INFO]', ...args);
  },
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

module.exports = logger;