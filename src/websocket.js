import socketio from 'socket.io';

import parseStringAsArray from './utils/parseStringAsArray';
import calculateDistance from './utils/calculateDistance';

let io;
const connections = [];

function setupWebsocket(server) {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
}

function findConnections(coordinates, techs) {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
}

function sendMessage(to, message, data) {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}

export { setupWebsocket, findConnections, sendMessage };
