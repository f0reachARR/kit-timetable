FROM node:14.4.0-alpine

WORKDIR /app
ARG VERSION
ARG NODE_AUTH_TOKEN
# install server packages
COPY .npmrc .npmrc
ENV NODE_ENV="production"
RUN npm set registry https://npm.pkg.github.com/ && npm i -g @f0reacharr/kit-timetable-server@${VERSION} && rm -f .npmrc

EXPOSE 3000

CMD /usr/local/bin/kit-timetable-server
