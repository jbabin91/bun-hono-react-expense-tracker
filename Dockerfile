# syntax = docker/dockerfile:1

ARG BUN_VERSION=1.1.6
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y -qq --no-install-recommends -y \
    build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
# Copy application code
COPY --link . .
RUN bun install --ci

RUN bun ws:build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

# Healthcheck
RUN apt-get update -qq
RUN apt-get --yes install curl
HEALTHCHECK --interval=5s --timeout=5s --start-period=5s CMD curl --silent --fail http://localhost:3000 || exit 1

CMD ["bun", "start"]