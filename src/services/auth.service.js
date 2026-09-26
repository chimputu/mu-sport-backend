/**
 * @fileoverview Authentication business logic.
 * @copyright (c) Mulungushi University Sports Platform. All rights reserved.
 * Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.
 * This file is the intellectual property of MU Sports and may not be
 * reproduced, distributed, or transmitted without the prior written
 * permission of the owners.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const usersRepo = require('../repositories/users.repository');
const { ConflictError, UnauthorizedError } = require('../utils/errors');

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
}

async function register({ email, name, password, studentId, college }) {
  const existing = await usersRepo.findByEmail(email);
  if (existing) throw new ConflictError('An account with that email already exists.');

  const hash = await bcrypt.hash(password, config.bcryptRounds);
  const user = await usersRepo.create({
    email,
    name,
    password: hash,
    studentId,
    college,
  });

  const token = signToken(user);
  return { user, token };
}

async function login({ email, password }) {
  const user = await usersRepo.findByEmail(email);
  if (!user) throw new UnauthorizedError('Email or password is incorrect.');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new UnauthorizedError('Email or password is incorrect.');

  const token = signToken(user);
  // eslint-disable-next-line no-unused-vars
  const { password: _pw, ...publicUser } = user;
  return { user: publicUser, token };
}

module.exports = { register, login };