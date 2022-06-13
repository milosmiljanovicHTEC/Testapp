#!/usr/bin/env bash
if [ "$1" == "production" ] || [ "$1" == "prod" ]; then
    docker-compose -f docker-compose.production.yaml up --build --remove-orphans -d
elif [ -z "$1" ] || [ "$1" == "development" ] || [ "$1" == "dev" ]; then
    docker-compose -f docker-compose.development.yaml up --build --remove-orphans -d
else
    echo "Unknown environment: $1";
    exit 1;
fi


# Remove old images, containers, networks...
docker system prune -f