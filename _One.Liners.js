https://underscorejs.org/
https://github.com/screepers/screeps-profiler


// sets up upgrader in W47N24
//  6 upgraders is too many
var k = require('room.spawner'); k.manualSpawn({ role: 'upgrader', room: 'W47N24'});
var k = require('room.spawner'); k.manualSpawn({ role: 'builder', room: 'W47N24'});
var k = require('room.spawner'); k.manualSpawn({ role: 'ling', room: 'W47N24'});

// sets up the nearest source in W47N24
//  3 miners
//  2 transporters
var k = require('room.spawner'); k.manualSpawn({ role: 'miner', sourceRoom: 'W47N24', source: '5bbcaa7a9099fc012e63171e'});
var k = require('room.spawner'); k.manualSpawn({ role: 'transporter', sourceRoom: 'W47N24', dumpRoom: 'W47N24', source: '5bbcaa7a9099fc012e63171e'});

// sets up the further source in W47N24
//  2 miners
var k = require('room.spawner'); k.manualSpawn({ role: 'miner', sourceRoom: 'W47N24', source: '5bbcaa7a9099fc012e63171d'});

// sets up remote mining in W47N23
//  2 miners
//  3 transporters
var k = require('room.spawner'); k.manualSpawn({ role: 'miner', sourceRoom: 'W47N23', source: '5bbcaa7b9099fc012e631720'});
var k = require('room.spawner'); k.manualSpawn({ role: 'transporter', sourceRoom: 'W47N23', dumpRoom: 'W47N24', source: '5bbcaa7b9099fc012e631720'});
var k = require('room.spawner'); k.manualSpawn({ role: 'claimer', room: 'W47N23'});

// sets up remote mining in W47N25
//  2 miners per source
//  4 transporters per source
var k = require('room.spawner'); k.manualSpawn({ role: 'miner', sourceRoom: 'W47N25', source: '5bbcaa7a9099fc012e63171a'});
var k = require('room.spawner'); k.manualSpawn({ role: 'transporter', sourceRoom: 'W47N25', dumpRoom: 'W47N24', source: '5bbcaa7a9099fc012e63171a'});

var k = require('room.spawner'); k.manualSpawn({ role: 'miner', sourceRoom: 'W47N25', source: '5bbcaa7a9099fc012e631719'});
var k = require('room.spawner'); k.manualSpawn({ role: 'transporter', sourceRoom: 'W47N25', dumpRoom: 'W47N24', source: '5bbcaa7a9099fc012e631719'});








































