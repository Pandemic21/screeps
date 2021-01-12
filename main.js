const devTesting = require('dev.testing');
const cme = require('game.cme');
const roleBuilder = require('role.builder');
const roleBuilderEx = require('role.builderEx');
const roleClaimer = require('role.claimer');
const roleHarvester = require('role.harvester');
const roleHarvesterEx = require('role.harvesterEx');
const roleLing = require('role.ling');
const roleMiner = require('role.miner');
const roleTransporter = require('role.transporter');
const roleUpgrader = require('role.upgrader');
const roleUpgraderEx = require('role.upgraderEx');
const roomSpawner = require('room.spawner');
const roomTower = require('room.tower');
const roomTowerEx = require('room.towerEx')
const profiler = require('screeps-profiler');

/*
TODO
- create game.overlord
    - identify manual tasks i do
        - respawn from a wiped state
        - expand to other rooms
        - determine optimal miners / transporters / upgraders per source
- role.builder
    - fix the rest function (it keeps going back and forth between rooms because it tries to go to rest --> wrong room --> right room --> rest...)
*/


// This line monkey patches the global prototypes.
profiler.enable();
module.exports.loop = function() {
    profiler.wrap(function() {
        // main.js logic here
        
        // SPAWNING LOGIC
        // keep memory clear of creeps that no longer exist
        for(var name in Memory.creeps) 
        {
            if(!Game.creeps[name]) 
            {
                // if the NoRespawn flag is set, delete memory without respawn
                if(Memory.creeps[name].NoRespawn)
                {
                    console.log("NoRespawn flag set for creep:", name)
                    delete Memory.creeps[name];
                }
                
                // if the NoRespawn flag does not exist, respawn the creep
                else
                {
                    var spawnResult = roomSpawner.autoSpawn(name)
                    
                    // if it's successfully spawned
                    if(spawnResult == 0)
                    {
                        delete Memory.creeps[name];
                        console.log('Clearing non-existing creep memory:', name);
                    }
                    // if it's unsuccessful keep it in memory to respawn later
                    else
                    {
                        //console.log('Error spawning', name, ':', spawnResult)
                    }
                }
            }
        }
        
        
        // CREEP MANAGEMENT LOGIC
        // manage creeps
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                //roleBuilder.run(creep);
                roleBuilderEx.run(creep);
            }
            if(creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
            if(creep.memory.role == 'ling') {
                roleLing.run(creep);
            }
            if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            
            if(creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            
            
            // DEV LOGIC
            if(creep.memory.role == 'testing') {
                //devTesting.run(creep);
            }
        }
        
        
        // TOWER MANAGEMENT LOGIC
        var towers = Game.rooms['W47N24'].find(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_TOWER
        })
        
        for(var tower in towers)
        {
            roomTower.repair(towers[tower])
            //roomTower.defend(towers[tower])
            roomTowerEx.defend(towers[tower])
        }
        
        // run CME functions every few ticks
        if(Game.time % 5 == 0) { cme.mobilizeDefensiveArmy() }
        
        //console.log("CPU used:",Game.cpu.getUsed())
    } ) ;
}


















