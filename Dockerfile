FROM node:alpine

# In order to avoid placing files in the user's working directory, we build in
# /opt/build.

# Install npm dependencies
COPY package* /opt/build/
RUN npm ci --prefix /opt/build

# Copy our build configuration
COPY . /opt/build/

ENTRYPOINT ["/opt/build/entrypoint.sh"]