FROM node:alpine

# In order to avoid placing files in the user's working directory, we build in
# /opt/build.

# Install npm dependencies
COPY package* /opt/build/
RUN npm ci --prefix /opt/build

# Copy code for the Next.js site
COPY pages /opt/build/pages

# Copy our build script
COPY entrypoint.sh /opt/build/entrypoint.sh

ENTRYPOINT ["/opt/build/entrypoint.sh"]