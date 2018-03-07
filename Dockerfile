FROM node:9.6.1

LABEL version="1.0"
LABEL description="Web app Articulos NodeJS"
LABEL maintainer="Miguel B mbaquer6@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install --production

EXPOSE 3000
CMD npm start
