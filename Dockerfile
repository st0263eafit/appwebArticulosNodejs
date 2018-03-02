FROM node:9.6.1

LABEL version="1.0"
LABEL description="Web app Articulos NodeJS"
LABEL maintainer="Miguel B mbaquer6@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 5858 9229

HEALTHCHECK CMD curl -fs http://localhost:$PORT/healthz || exit 

WORKDIR "/opt/app"
COPY . ./
RUN chown -R node:node .

USER node
RUN npm install --production

CMD npm start