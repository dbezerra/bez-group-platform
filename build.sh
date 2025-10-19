#!/bin/bash
set -e

echo "Starting Angular build process..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Verify Angular CLI is available
echo "Verifying Angular CLI..."
npx ng version

# Run the build
echo "Running Angular build..."
npx ng build --configuration production

echo "Build completed successfully!"
