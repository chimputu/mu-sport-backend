# MU Sports — Backend

Express.js API for the MU Sports platform at Mulungushi University.
Handles fixtures, standings, facility bookings, team registration, and auth.

## Quick start

```bash
git clone https://github.com/mu-sports/backend.git
cd backend
npm install
cp .env.example .env
# Edit .env — set DATABASE_URL and JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev