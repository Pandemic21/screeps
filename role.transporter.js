/*
Memory
    dumping - boolean - whether or not the creep needs to dump energy
    sourceRoom - string - room name where the desired source is
    dumpRoom - string - room where the creep desires to dump the energy
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
        if the creep has energy
            try to repair the nearest road
            move to the dest room
            dump energy
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
                creep.moveTo(sourceRoomDest, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
            }
            
            // if the creep is in the source room
            //  fill up from source container
            else
            {
                // get the closest container to the creep's desired source
                var sourceSilo = getSourceSilo(creep)
                
                // make sure sourceSilo isn't null
                if(sourceSilo)
                {
                    // if the CONTAINER has no energy to take
                    //  set the source silo to a STORAGE in the room, if there is one
                    if(_.sum(sourceSilo.store) == 0)
                    {
                        var storageList = creep.room.find(FIND_STRUCTURES, {
                            filter: s => s.structureType === STRUCTURE_STORAGE
                        })
                        
                        if(storageList.length > 0)
                        {
                            sourceSilo = storageList[0]
                        }
                    }
                    
                    // withdraw energy from the source silo
                    if(creep.withdraw(sourceSilo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(sourceSilo, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                    }
                }
            }
        }
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        // Creep has full energy
        // Dump energy to dump room silo
        else 
        {
            // try to repair the most nearby road
            // if it fails, continue walking
            //  this makes the transporter pause and repair the road fully before moving on
            if(!creep.repair(creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:s=>s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax})) == 0 || Memory.creeps[creep.name].speedRepair)
            {
                // if the creep is NOT in the dump room
                //  move to the dump room
                if (!helper.isInRoom(creep, creep.memory.dumpRoom))
                {
                    var dumpRoomDest = new RoomPosition(25, 25, Memory.creeps[creep.name].dumpRoom)
                    creep.moveTo(dumpRoomDest)
                }
                
                // if the creep is in the dest room
                //  dump energy in nearest silo
                else
                {
                    var dumpSilo = getDumpSilo(creep)
                    
                    //console.log(creep,dumpSilo,dumpSilo.pos)
                    
                    // make sure the dump silo exists
                    if(dumpSilo)
                    {
                        if(creep.transfer(dumpSilo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(dumpSilo, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                        }
                    }
                    else
                    {
                        //console.log("No dump silo for", creep)
                    }
                }
            }
        }
	}
}

function debug(creep,i){
    console.log(creep.name + " " + i)
}

function getSourceSilo(creep)
{
    var siloList = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
    })
    
    // get the closest container to the creep's source in memory
    return helper.getClosestObject(Game.getObjectById(creep.memory.source), siloList)
}

function getDumpSilo(creep)
{
    
    var siloList = creep.room.find(FIND_MY_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER
    })
    
    // sort the silo list by distance to creep (nearest --> furtherest)
    siloList = _.sortBy(siloList, s => creep.pos.getRangeTo(s))
    
    // check if each silo is full or not,
    //  if it's empty, return it
    for(var silo in siloList)
    {
        if(siloList[silo].energy < siloList[silo].energyCapacity)
        {
            return siloList[silo]
        }
    }
    
    ////////////////////////////////////////////////////
    // if it gets here,
    //  search for storage containers
    var siloList = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_STORAGE
    })
    
    //console.log(siloList)
    
    siloList = _.sortBy(siloList, s => creep.pos.getRangeTo(s))
    
    // check if each silo is full or not,
    //  if it's empty, return it
    for(var silo in siloList)
    {
        var store = siloList[silo].store 
        
        if(store[RESOURCE_ENERGY] < siloList[silo].storeCapacity)
        {
            return siloList[silo]
        }
    }
    
    
    
    
    /*
    var silo = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER && s.energy<s.energyCapacity
    })
    
    // if there are no empty silos, 
    //  include storage
    if (!silo)
    {
        silo = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_STORAGE && s.energy<s.energyCapacity
        })
    }
    
    return silo
    /*
    
    
    /*
    TODO:
    Change this function to this to save CPU
    
    creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:s=>s.structureType == STRUCTURE_EXTENSION && s.energy!=s.energyCapacity})
    
    
    
    
    === OR ===
    
    const silos = creep.room.find( /* the rest of that
    const availSilos = _.filter(silos, s => s.energy  < s.energyCapacity);
    const target = creep.pos.findClosestByRange(availSilos);
    */
}










































