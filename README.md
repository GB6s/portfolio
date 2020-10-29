# My portfolio website

This portfolio uses a lot of popular web technologies and was a project that I learned a lot from.

## Used technologies

#### Nuxt (Vue)

For the front end design I chose the Nuxt framework because I wanted a Javascript framework that allowed server sided rendering and had little need for boilerplate code.

#### NodeJS

I choose NodeJS for the back-end API that handles the database query and authentication routes. I chose NodeJS because it's event driven and programmed in the same language as my front-end.

#### [SWAG](https://github.com/linuxserver/docker-swag)

SWAG or Secure Web Application Gateway sets up an Nginx webserver and reverse proxy with built-in certbot client that automates free SSL server certificate generation and renewal processes. It also contains fail2ban for intrusion prevention. This already dockerized piece of software requires little setup and was exactly what I was looking for.

#### PostgreSQL

For my database I chose PostgreSQL because it has be come the industry standard for data integrity and because it is easily extensible.

#### PgAdmin

I wanted to easily interact with PostgreSQL so I chose to install a well-known panel called PgAdmin.

## Dockerized

Everything listed above is dockerized by a single docker-compose file and therefore easily distributed onto my VPS.

For development reasons I also included a dev-dependencies folder which houses a PostgreSQL, SWAG and PgAdmin instance. These are configured to work on localhost and make development a thousand times better.
