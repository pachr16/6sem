# Derived from official mysql image (our base image)
FROM mysql

# Add a database
ENV MYSQL_DATABASE=opn MYSQL_ROOT_PASSWORD=STDgruppe20 MYSQL_USER=STDgruppe

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY . /docker-entrypoint-initdb.d/
