[![LinkedIn][linkedin-shield]][linkedin-url] [![Issues][issues-shield]][issues-url] [![License][license-shield]][license-url]
# SMA-SunnyBoy-Server

## Description

The purpose of this project it to retrieve the data of a `SMA Sunny Boy` device and make them accessible from outside in a secured way with a REST API.

This server can be used with the [Sma-SunnyBoy-UserApplication][sma-user-application] project to visualise your data in a mobile/tablet.

## Table of Contents
 * [Getting started](#getting-started)
    * [Prerequisites](#prerequisites)
        * [Set up the database](#set-up-the-database)
        * [Set up the server](#set-up-the-server)
        * [SSL](#ssl)
    * [Installation](#installation)
    * [Launch](#launch)
 * [Usage](#usage)
    * [API](#api)
 * [What's next ?](#whats-next)
 * [Acknowledgments](#acknowledgments)
 * [License](#license)

<!-- Getting started -->
## Getting started

<!-- Prerequestites -->
### Prerequisites

Before setting up the code, the following prerequisites must be on your device.
 * [NPM][npm]
 * [NodeJs][nodejs]
 * [MongoDB][mongodb]

#### Set up the database

Your server communicates with a `MongoDB` database. Once that `MongoDB` is installed, so you have to configure it.

The server will take the database configurations from `src/configs/user-database.json`.

```json
{
    "username": "database-username",
    "password": "database-password",
    "host": "<ip-address> or hostname",
    "port": <port> (default: 27017),
    "databaseName": "database-name"
}
```

First, create a database and check if it exists by using the following commands:

```shell
> use your-database-name
> show dbs
```

Then create a table named `"users"`.

```shell
> db.createCollection("users")
> show collections
```

Add as many users as you want by setting a username and password.

```shell
> db.users.insert({name: "your-username", password: "sha256-password"})
```

> Note that the password is hashed with SHA256 in the database. (Use an online editor to crypt your password such as [SHA Online][sha256-online])

(For more detail about how to configure a `MongoDB` database view [How to Create a Database in MongoDB][mongodb-setup])

#### Set up the server

The server loads its configuration from `src/configs/sma-configs.json`.

```json
{
    "host": "<ip-address> or hostname",
    "port": <port>,
    "right": "usr",
    "password": "password of the SMA device"
}
```

The `"right"` fields depend if you are an installer or a user. (Often you are a user 😉)

 * User: `"usr"`
 * Installer: `"istl"`

#### SSL

The API uses SSL certificates so you have to create a certificate and a private key.

To generate a certificate and a private key, use the following command.

```shell
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

Now you have two files: `key.pem` and `cert.pem`. Put them in the `src/ssl/` folder.

<!-- Installation -->
### Installation

To install the server you must clone the repository.

```shell
$ git clone https://github.com/alex210501/SMA-SunnyBoy-Server.git
$ cd SMA-SunnyBoy-Server
```

Update your version of `npm`.

```shell
$ npm install -g npm@latest
```

And finally, install the packages to be able to run the server.

```shell
$ npm install
```

<!-- Launch -->
### Launch

To launch the application, used the following command.

```shell
$ npm start
```

<!-- Usage -->
## Usage

To access the data from the server, you have to log into the server by presenting a pair of username and password.

If your username and password are correct, you will receive a `token` that will be available for 30 minutes. After that, you have to log in once again.

You can also log out from the server, this way your `token` will be destroyed.

### API

Requests can be made via a REST API. The documentation of the API is available at [SMA SunnyBoy API][sma-sunnyboy-api].

## What's next ?
 * Multilanguage support
 * Get historical of the SMA
 * Get value graphic between specific dates
 * Get and set the settings of the SMA

## Acknowledgments

Here are the resources used during the development phase.

 * [Postman][postman]
 * [OpenSLL][openssl]
 * [Visual Studio Code][vscode]
 * [MongoDB][mongodb]

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- Links -->
[npm]: https://www.npmjs.com/
[nodejs]: https://nodejs.org/en/
[mongodb]: https://www.mongodb.com/
[mongodb-setup]: https://www.mongodb.com/fr-fr/basics/create-database
[sha256-online]: https://emn178.github.io/online-tools/sha256.html
[sma-user-application]: https://github.com/alex210501/SMA-SunnyBoy-UserApplication
[sma-sunnyboy-api]: https://documenter.getpostman.com/view/21819621/2s84DmxPzT
[postman]: https://www.postman.com/
[openssl]: https://www.openssl.org/
[vscode]: https://code.visualstudio.com/

<!-- Badge links -->
[linkedin-shield]: https://img.shields.io/static/v1?label=LinkedIn&message=alejborbolla&color=blue?style=plastic&logo=linkedin
[linkedin-url]: https://linkedin.com/in/alejborbolla
[issues-url]: https://github.com/alex210501/SMA-SunnyBoy-Server/issues
[issues-shield]: https://img.shields.io/github/issues/alex210501/SMA-SunnyBoy-Server
[license-url]: https://github.com/alex210501/SMA-SunnyBoy-Server/blob/main/LICENSE
[license-shield]: https://img.shields.io/github/license/alex210501/SMA-SunnyBoy-Server