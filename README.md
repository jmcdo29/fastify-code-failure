# NestJS Fastify Code Failure

Stumbled upon this recently, it appears that if `true` is returned from a guard when using NestJS Fastify, there is a problem with using `response.code` inside the `@nestjs/platform-fastify` adapter.

## Reproduction

```sh
git clone git@github.com:jmcdo29/fastify-code-failure.git
npm i 
# OR
yarn
npm run start:dev
# OR
yarn start:dev
curl http://localhost:3000 # this method should succeed and return { success: true }
curl http://localhost:3000/fail # this method should return an InternalServerExceptiom
```

## Work Around

Currently as a workaround I can go to the fastify adapter and change `response.code(statusCode)` to be `response.statusCode = statusCode` and I get the response as expected. It seems that the `res.res` object is being used (the server response) instead of `res` (the `FastifyReply<ServerResponse>`). Haven't tracked back any further than that.

## Environment

```sh
nest info

 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/


[System Information]
OS Version     : Linux 5.0
NodeJS Version : v13.14.0
YARN Version    : 1.22.4 

[Nest CLI]
Nest CLI Version : 7.2.0 

[Nest Platform Information]
platform-fastify version : 7.1.1
common version           : 7.1.1
core version             : 7.1.1
```