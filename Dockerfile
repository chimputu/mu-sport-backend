# @fileoverview Docker image for MU Sports backend.
# @copyright (c) Mulungushi University Sports Platform. All rights reserved.
# Owners: Kafiswe Chimputu and Elijah Manda, Full Stack Developers.

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev
RUN npx prisma generate

COPY src ./src

EXPOSE 4000

CMD ["node", "src/index.js"]