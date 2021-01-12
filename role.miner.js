/*
Memory
    dumping - boolean - whether or not the creep needs to dump energy
    sourceRoom - string - room name where the desired source is
    source - string - object ID of the desired source
*/

var helper = require('game.helper')
var debugging = false;

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        /*
        if the creep has no energy
            move to the source room
            fill up energy
        if the creep has full energy
            if the storage container needs repair
                repair the container
            else
                dump energy in container
        */
        
        // if the creep has no energy, 
        //  set dumping to FALSE
        if(creep.memory.dumping && creep.carry.energy == 0) 
        {
            creep.memory.dumping = false;
            creep.say('⛏️');
        }
        
        // if the creep is at carrying capacity, 
        //  set dumping to TRUE
        if(!creep.memory.dumping && creep.carry.energy == creep.carryCapacity) 
        {
            creep.memory.dumping = true;
            creep.say('🚚');
        }
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        // Creep has no energy
        // Fill up energy from source silo
        if(!creep.memory.dumping) 
        {
            // if the creep is NOT in the source room
            //  move to the source room
            if (!helper.isInRoom(creep, creep.memory.sourceRoom))
            {
                var sourceRoomDest = new RoomPosition(25, 25, Memory.creeps[creep.name].sourceRoom)
                creep.moveTo(sourceRoomDest, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
            // if the creep is in the source room
            //  mine from source
            else
            {
                var source = Game.getObjectById(creep.memory.source)
                
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        // Creep has full energy
        // Dump energy to container
        else 
        {
            // get the container closest to the creep's desired source
            //var dumpSilo = getDumpSilo(creep)
            var dumpSilo = getDumpSilo(creep)
            
            // make sure the dump silo exists
            if(dumpSilo)
            {
                // if the dump silo does need repair,
                //  repair it
                if(dumpSilo.hits < dumpSilo.hitsMax)
                {
                    creep.repair(dumpSilo)
                }
                
                // if the dump silo does NOT need repair,
                //  dump energy into it
                else
                {
                    if(creep.transfer(dumpSilo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dumpSilo, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                    }
                }
            }
            else
            {
                console.log("No dump silo for", creep)
            }
        }
	}
}

function debug(creep,i){
    console.log(creep.name + " " + i)
}

function getDumpSilo(creep)
{
    var siloList = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
    })
    
    
    // get the closest container to the creep's source in memory
    return helper.getClosestObject(creep, siloList)
}












































