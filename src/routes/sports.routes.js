/**
 * @fileoverview Sport routes.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const express = require('express');
const controller = require('../controllers/sports.controller');

const router = express.Router();

router.get('/', controller.list);
router.get('/:slug', controller.detail);

module.exports = router;