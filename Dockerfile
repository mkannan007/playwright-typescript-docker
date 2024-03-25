FROM ubuntu:latest

# Set environment variables to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

WORKDIR /e2e

ARG CI=true

# Install Node.js
RUN apt-get update && apt-get install -y ca-certificates curl gnupg \
  && NODE_MAJOR=20 \
  && curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR.x | bash - \
  && apt-get update && apt-get install nodejs -y

# # Install Google Chrome
RUN apt-get install -y wget \
  && wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && apt-get install -y ./google-chrome-stable_current_amd64.deb

COPY ["package.json", "package-lock.json", "../"]

RUN npm install
RUN npx playwright install --with-deps chromium

COPY . .

CMD npx playwright test --grep $TAG
