/**
 * @fileoverview Route mount table.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/sports', require('./sports.routes'));
router.use('/teams', require('./teams.routes'));
router.use('/matches', require('./matches.routes'));
router.use('/bookings', require('./bookings.routes'));
router.use('/standings', require('./standings.routes'));

module.exports = router;