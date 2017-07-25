'use strict';

module.exports = {
    connections: {
      api: {
        port: 17883,
        label: 'api',
      },
    },
    plugins: {
      mongodb: {
        host: process.env.MONGO_PORT_27017_TCP_ADDR,
        port: process.env.MONGO_PORT_27017_TCP_PORT,
        db: 'viloCounter-dev',
        user: 'elephant-rw',
        pwd: 'elephant',
        authSource: 'admin',
      },
      mongoose: {
        host: process.env.MONGO_PORT_27017_TCP_ADDR,
        port: process.env.MONGO_PORT_27017_TCP_PORT,
        db: 'vilo-dev',
        user: 'elephant-rw',
        pwd: 'elephant',
        authSource: 'admin',
      },
      services: {},
      log: {},
    },
};
