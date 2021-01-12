var helper = require('game.helper')


module.exports = {
    run: function(creep) 
    {
        if (!helper.isInRoom(creep, creep.memory.room))
        {
            var sourceRoomDest = new RoomPosition(25, 25, Memory.creeps[creep.name].room)
            creep.moveTo(sourceRoomDest, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        
        else
        {
            var room = creep.room
            var hostiles = room.find(FIND_HOSTILE_CREEPS);
            
            // if there are enemies in the room
            if(hostiles.length > 0)
            {
                // sort hostiles to the closest
                hostiles = _.sortBy(hostiles, s => creep.pos.getRangeTo(s))
                target = hostiles[0]
                console.log(target)
                
                // move to / attack the target
                if(creep.attack(target) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff6666'}})
                }
            }
            // if there are no enemies in the room, rest
            else
            {
                creep.moveTo(Game.flags.rest_l)
            }
        }
        
        
    }
};















































