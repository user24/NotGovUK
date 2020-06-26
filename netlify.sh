#! /bin/bash

set -euxo pipefail

# Prepare for pnpm run
npm install pnpm --no-progress --no-audit --no-fund --no-save --no-package-lock

# Install npm dependencies
./node_modules/.bin/pnpm i --shamefully-hoist
ls -l node_modules

# Build docs website
cd ./apps/govuk-docs/
npm run build

# Arrange static assets
mkdir public
mv dist/public/entrypoints.json public/
mv dist/public/ public/public
mv public/ dist/public
du -h dist/
cd ../../

# Dirty hack (fake vue package)
mkdir -p node_modules/vue
echo '{ "name": "vue", "version": "2.6.10" }' > node_modules/vue/package.json

# Prepare node_modules/ for caching
mv node_modules/.ignored/* node_modules/ || true
