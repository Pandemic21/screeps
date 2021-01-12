var helper = require('game.helper')
var debugging = false;


module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        // if the creep is in the desired room, then
        //  build
        if (helper.isInHomeRoom(creep))
        {
            //console.log('helper.isInHomeRoom:', creep)
            work(creep)
        }
        
        // if it's not in the desired room, then
        //  move to home room
        else 
        {
            var remoteRoomDest = new RoomPosition(25, 25, Memory.creeps[creep.name].room)
            creep.moveTo(remoteRoomDest)
        }
    }
}

function debug(creep,i){
    console.log(creep.name + " " + i)
}

function work(creep)
{
    // if the creep is out of energy,
    //  set building to false
    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
        creep.say('⛏️');
    }
    
    // if the creep is at energy capacity
    //  set building to true
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
        creep.say('🚧');
    }
    
    // if the creep is building
    //  find the nearest construction site
    //  go build
    if(creep.memory.building) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        
        // this ensures the creep doesn't stand next to the source like an asshole
        else
        {
            creep.moveTo(Game.flags.rest)
        }
    }
    
    // if the creep need more energy
    //  get the nearest source silo
    else {
        var sourceSilo = getSourceSilo(creep)
        
        if(creep.withdraw(sourceSilo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sourceSilo, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}


function getSourceSilo(creep)
{
    var siloList = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
    })
    
    // get the closest container to the creep's source in memory
    return helper.getClosestObject(creep, siloList)
}








































