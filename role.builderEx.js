var helper = require('game.helper')
var debugging = false;


module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) 
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
            // cycle thru all the owned rooms and get valid construction targets
            var ownedRooms = Object.keys(Memory.overlord['ownedRooms'])
            
            for(var k in ownedRooms)
            {
                // in case we don't have vision in a room we claim to own
                try
                {
                    var targets = Game.rooms[ownedRooms[k]].find(FIND_CONSTRUCTION_SITES)
                }
                catch(err) { }
                
                // if there is at least 1 construction site in the room, 
                //  break
                if (targets.length > 0)
                {
                    break
                }
            }
            
            // if there is a target to construct
            //  go construct it
            if (targets.length > 0)
            {
                target = helper.getClosestObject(creep, targets)
                
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                /*
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                */
            }
            
            // this will happen if there are no targets to construct
            else
            {
                creep.moveTo(Game.flags.rest)
            }
        }
        
        // if the creep need more energy
        //  get the nearest source silo
        else {
            var sourceSilo = getSourceSilo(creep)
            
            // if there is no sourceSilo in the room,
            //  run to your home room
            if(!sourceSilo)
            {
                var remoteRoomDest = new RoomPosition(25, 25, Memory.creeps[creep.name].room)
                creep.moveTo(remoteRoomDest)
            }
            
            // if there is a source silo,
            //  go get the energy
            else
            {
                if(creep.withdraw(sourceSilo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceSilo, {visualizePathStyle: {stroke: '#ffaa00'}});
                }   
            }
        }
        
        
        /*
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
        */
    }
}

function debug(creep,i){
    console.log(creep.name + " " + i)
}

function getSourceSilo(creep)
{
    // get all containers with energy in them
    var siloList = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && _.sum(s.store) > 0
    })
    
    // if there are no containers with energy, get storage with energy
    if (siloList.length == 0)
    {
        siloList = creep.room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
        })
    }
    
    // if the storage also doesn't have energy get fucked
    if (siloList.length == 0)
    {
        return null
    }
    
    // get the closest container to the creep's source in memory
    return helper.getClosestObject(creep, siloList)
}








































