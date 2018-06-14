#!/bin/sh

set -e
set -u

# goes to top directory.
cd "$(dirname "${0}")/.."

for db in tododb; do
  echo "CREATE DATABASE ${db} DEFAULT CHARSET utf8mb4" | mysql -u root
done