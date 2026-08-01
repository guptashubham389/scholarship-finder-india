#!/usr/bin/env bash
# Ship: commit, push, deploy to production, and point the public URL at it.
#
# Why this exists: scholarshipfinder-india.vercel.app is a manual alias, and a
# manual alias stays pinned to whichever deployment it was set on. Without the
# last step, you deploy, the site "updates", and the link you gave students
# still shows the old build. That is a silent failure and it would cost the
# submission on Sunday.
#
# Usage:  ./ship.sh "what changed"

set -euo pipefail

PUBLIC_URL="scholarships-india.vercel.app"
MSG="${1:-ship}"

echo "==> committing"
git add -A
git commit -m "$MSG" || echo "    (nothing to commit)"

echo "==> pushing to github"
git push origin main

echo "==> deploying to vercel production"
DEPLOY_URL=$(vercel --prod --yes 2>&1 | grep -Eo 'https://[a-z0-9-]+-sentinel-[a-z0-9]+\.vercel\.app' | tail -1)

if [ -z "$DEPLOY_URL" ]; then
  echo "!! could not find the deployment url. run 'vercel ls' and alias by hand."
  exit 1
fi
echo "    deployed: $DEPLOY_URL"

echo "==> pointing $PUBLIC_URL at it"
vercel alias set "${DEPLOY_URL#https://}" "$PUBLIC_URL" >/dev/null 2>&1

echo "==> verifying the public url"
CODE=$(curl -s -o /dev/null -w '%{http_code}' -L "https://$PUBLIC_URL")
echo "    https://$PUBLIC_URL -> HTTP $CODE"

if [ "$CODE" != "200" ]; then
  echo "!! PUBLIC URL IS NOT 200. Strangers cannot use the product. Fix before sharing."
  exit 1
fi

echo "==> done. https://$PUBLIC_URL is live and current."
