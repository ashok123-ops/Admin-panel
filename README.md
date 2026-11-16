# OG License Platform

Original dark admin console + activation API starter built with Next.js, TypeScript and Supabase.

## Features
- Admin email magic-link login and email allowlist
- Create permanent or time-limited license keys
- Key hashing at rest; full key shown once on creation
- Block/unblock/delete keys
- Package management
- Device list and unlink controls
- Activate, verify and deactivate API endpoints
- Activation event history
- PostgreSQL schema with RLS enabled

## Setup
1. Create a Supabase project at https://supabase.com.
2. In Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in project URL, anon key, service-role key, administrator email(s), and a random 32+ character `LICENSE_HASH_SECRET`.
4. In Supabase Authentication URL Configuration, set Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` as an allowed redirect.
5. Install Node.js 20.9+ then run:

   ```bash
   npm install
   npm run dev
   ```

6. Visit http://localhost:3000/login and request a magic link using an email included in `ADMIN_EMAILS`.

## API
`POST /api/v1/activate`
```json
{"key":"OG-ABCDEF-ABCDEF-ABCDEF-ABCDEF","device_id":"stable-device-id-from-your-own-app","app_id":"com.example.app","app_version":"1.0.0"}
```
`POST /api/v1/verify`
```json
{"key":"OG-ABCDEF-ABCDEF-ABCDEF-ABCDEF","device_id":"stable-device-id-from-your-own-app","app_id":"com.example.app"}
```
`POST /api/v1/deactivate`
```json
{"key":"OG-ABCDEF-ABCDEF-ABCDEF-ABCDEF","device_id":"stable-device-id-from-your-own-app"}
```

Responses include `ok` and a machine-readable `code` such as `ACTIVATED`, `VALID`, `INVALID_KEY`, `KEY_BLOCKED`, `KEY_EXPIRED`, or `DEVICE_LIMIT`.

## Deploy
Push to GitHub, import the repository into Vercel, add all environment variables, update Supabase Site URL and redirect URL to the deployed domain, then redeploy.

## Before production
This is an implementation starter, not a security-audited commercial product. Add durable rate limiting/WAF, transactional device-limit enforcement to prevent concurrent activation races, admin audit logs, origin/CSRF checks, monitoring, backups and an incident/key-rotation process. Never expose the service-role key or hash secret in a client app. Device identifiers are privacy-sensitive: document their use and provide a reset/support path. Use only with apps you own or are authorized to modify.
