#!/bin/bash

echo "Generating Better Auth Secret..."
echo ""
echo "Add this to your .env file:"
echo ""
echo "BETTER_AUTH_SECRET=\"$(openssl rand -base64 32)\""
echo ""
