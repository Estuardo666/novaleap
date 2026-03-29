# NovaLeap Performance Monitoring Checklist

## Goal
Keep server process usage stable after backend and build optimizations.

## Track On Every Deploy
1. Max Processes during build.
2. Max Processes 15-30 minutes after deploy with normal traffic.
3. Build duration from install start to build end.
4. Number of 5xx responses in first hour after deploy.

## Thresholds
1. Build max processes target: <= 220.
2. Runtime max processes target: <= 120 on normal traffic.
3. Alert threshold: >= 280 at any time.
4. Critical threshold: >= 350 sustained for 5 minutes.

## Deployment Rules
1. Production postinstall now skips Prisma generate by default.
2. Only force Prisma generate in production when schema/client mismatch is confirmed.
3. If forced, set NOVALEAP_RUN_PRISMA_GENERATE=1 only for that deployment.
4. Keep media snapshot refresh in build pipeline for static pages.

## Validation Steps After Deploy
1. Open home, services list, one service detail, and admin login.
2. Confirm pages render and media assets load.
3. Check process graph at minute 5, 15, and 30.
4. Confirm no abnormal process growth trend.

## If Process Spikes Reappear
1. Check whether production install ran Prisma generate unexpectedly.
2. Verify middleware is not forcing no-store globally.
3. Verify build used snapshot mode for site media.
4. Review admin media actions for excessive full-site revalidation.
5. Roll back to previous stable deploy if critical threshold is exceeded.

## Weekly Review
1. Compare peak build processes across releases.
2. Compare peak runtime processes by day and hour.
3. Record regressions and the exact commit range.