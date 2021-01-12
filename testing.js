module.exports = {
    run: function(creep) 
    {
        var n = creep.name
        var homeRoom = Game.rooms[Memory.creeps[n].room]
        
        console.log('homeRoom:', homeRoom)
        console.log('creep.room:', creep.room)
        console.log('creep.room.name:', creep.room.name)
        
        // if the creep doesn't have a home room memory obj,
        //  then set the memory to the current room 
        if(!homeRoom)
        {
            console.log('!homeRoom')
            Memory.creeps[n].room = creep.room.name
            homeRoom = Game.rooms[Memory.creeps[n].room]
        }
        
        // if the creep is in the desired room,
        //  then do work 
        if (creep.room == remoteRoom)
        {
            
        }
        
        // if it's not in the desired room, then move there
        else 
        {
            var remoteRoomDest = new RoomPosition(25, 25, Memory.creeps[n].room)
            creep.moveTo(remoteRoomDest)
        }
    }
}



















