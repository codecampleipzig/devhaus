FROM cypress/included:3.8.3

RUN apt update \
 && apt -y install default-jre netcat \
 && rm -rf /var/lib/apt/lists/*

RUN yarn global add cypress

WORKDIR /code
ENTRYPOINT []
