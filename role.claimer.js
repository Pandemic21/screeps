var helper = require('game.helper')
var debugging = false;

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        var n = creep.name
        
        // if the creep is in the correct room, then
        //  claim / reserve the RC
        if (helper.isInHomeRoom(creep))
        {
            var remoteRC = creep.room.controller
            var remoteRoom = Game.rooms[Memory.creeps[n].room]
            
            // if the creep is set to claim the controller
            if(Memory.creeps[n].claim)
            {
                if(creep.claimController(remoteRC) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(remoteRC)
                }
            }
            // else it's going to reserve the controller
            else
            {
                if(creep.reserveController(remoteRC) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(remoteRC, {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            }
        }
        
        // if the creep is NOT in the correct room, then
        //  move to the correct room
        else
        {
            var remoteRoomDest = new RoomPosition(25, 25, Memory.creeps[n].room)
            creep.moveTo(remoteRoomDest, {visualizePathStyle: {stroke: '#ffaa00'}})
        }
    }
}



































