var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function () {
    
    // keep memory clear of creeps that no longer exist
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}

var Spawn1 = Game.spawns['Spawn1']
//console.log(" " + Spawn1.energy + " " + Spawn1.energyCapacity)
if ( Spawn1.energy == 300)
{
    //console.log("300 energy")
}
//Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester3' );

