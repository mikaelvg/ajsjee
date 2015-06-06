dropdb --if-exists "ajsjee.staging"
createdb "ajsjee.staging"
pg_dump -h 103.25.203.226 -U postgres ajsjee | psql -h localhost -U postgres ajsjee.staging