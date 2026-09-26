/**
 * @fileoverview Date helpers for MU Sports.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

/** Start of day in CAT (UTC+2). */
function startOfDayCat(date) {
  const d = new Date(date);
  const offsetMs = 2 * 60 * 60 * 1000;
  const shifted = new Date(d.getTime() + offsetMs);
  shifted.setUTCHours(0, 0, 0, 0);
  return new Date(shifted.getTime() - offsetMs);
}

function endOfDayCat(date) {
  const start = startOfDayCat(date);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
}

module.exports = { startOfDayCat, endOfDayCat };