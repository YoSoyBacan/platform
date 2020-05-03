FROM node:10.15.3-jessie

# Setup env

# Creating application directory
RUN mkdir -p /usr/src/app
#Copy Application code to app folder and environment
COPY . /usr/src/app
WORKDIR /usr/src/app

# Install back-end packages 
RUN npm i
RUN npm install -g typescript@3.6.3
RUN npm install pm2 -g
RUN echo $GOOGLE_APPLICATION_CREDENTIALS > /usr/src/app/src/config/service-account.json
ENV GOOGLE_APPLICATION_CREDENTIALS /usr/src/app/src/config/service-account.json

WORKDIR /usr/src/app/client
# Install the front-end packages
RUN npm install

## Build front end
RUN npm run build && cd ..

WORKDIR /usr/src/app
# Bump contain heap memory
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_ENV production
# Compile Typescript
#UN npm run build-ts

#Expose port 8000 which the app runs on
EXPOSE 8000
ENV PM2_PUBLIC_KEY eetscc7i0fi5ixx
ENV PM2_SECRET_KEY da7i1470ecwo86a

CMD ["pm2-runtime", "index.js"]