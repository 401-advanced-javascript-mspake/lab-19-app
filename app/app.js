'use strict';

const readWrite = require('../utils/read-write.js');
const events = require('../utils/events.js');
const client = require('@nmq/q/client');

/**
 * alterFile(file)
 * @param {*} file - File to read, uppercase, and write
 */
async function alterFile(file) {
  const data = await readWrite.read(file);
  const text = readWrite.uppercase(data);
  const message = await readWrite.write(file, text);
  console.log(message);
  client.publish('files', 'save', message);
}

let file = process.argv.slice(2).shift();

alterFile(file)
  .catch(error => {
    console.log(error);
    client.publish('files', 'error', error);
  });
