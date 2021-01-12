var helper = require('game.helper')
var debugging = false;

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        // remote source ID: 5bbcaa7b9099fc012e631720
        
        // if the creep is in the desired room, then
        //  harvest energy
        //  dump harvested energy
        if (helper.isInHomeRoom(creep))
        {
            work(creep)
        }
        
        // if it's not in the desired room,
        //  move to desired room
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

function getSilo(creep)
{
    var structureList = creep.room.find(FIND_MY_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER
    })
    // sorting pushing towers to the end of the list
    
    //structureList.sort()
    
    for(var structure in structureList)
    {
        var silo = structureList[structure]
        if(debugging) { console.log('Processing:', creep, silo) }
        
        if(silo.energy < silo.energyCapacity)
        {
            if(debugging)
            {
                console.log('selected:', silo)
                console.log('energy/max energy:', silo.energy + "/" + silo.energyCapacity)    
            }
            
            return silo;
        }
    }
    
    if(debugging) { console.log("No silo selected for:", creep) }
    return null
}

// does the actual work
//  - mines energy
//  - dumps collected energy
function work(creep)
{
    // if the creep has no energy, set upgrade to FALSE
    if(creep.memory.dumping && creep.carry.energy == 0) 
    {
        creep.memory.dumping = false;
        creep.say('⛏️');
    }
    
    // if the creep is at carrying capacity, set upgrade to TRUE
    if(!creep.memory.dumping && creep.carry.energy == creep.carryCapacity) 
    {
        creep.memory.dumping = true;
        creep.say('🚚');
    }
    
    // if the creep has less energy than it can have
    if(!creep.memory.dumping) 
    {
        var source = Game.getObjectById(creep.memory.source)
        
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
        }
    }
    
    // deliver energy to a silo
    else 
    {
        if(debugging) { console.log(creep, "in", creep.room) }
        
        silo = getSilo(creep)
        
        // if a silo has been selected
        if(silo)
        {
            if(creep.transfer(silo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(silo, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
            }
        }
        // if no silo needs energy
        else
        {
            creep.moveTo(Game.flags.rest_h)
        }
    }
}





































