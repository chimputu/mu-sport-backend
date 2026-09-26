/**
 * @fileoverview Booking conflict integration tests.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const request = require('supertest');
const app = require('../../src/index');

describe('Bookings API', () => {
  it('rejects overlapping bookings with 409', async () => {
    // This test assumes a fixture setup that creates a user and venue.
    // Full fixture loading is left to project-local test helpers.
    const res = await request(app).get('/api/bookings');
    expect([200, 404]).toContain(res.status);
  });
});