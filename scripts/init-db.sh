#!/bin/bash
# Run this once to create the database if it doesn't exist

DB_NAME="sanatandb"
DB_USER="postgres"

# Check if database exists, create if not
psql -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME
if [ $? -ne 0 ]; then
    echo "Creating database $DB_NAME..."
    psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
    echo "Database $DB_NAME created successfully!"
else
    echo "Database $DB_NAME already exists."
fi