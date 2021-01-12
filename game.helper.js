var debugging = false;


module.exports = {
    /*
    Description
        Gets the rest flag location in the same room as "obj"
        
    Return value
        the pos of the rest flag in the room of obj
    */
    getRestFlagLocation: function(obj)
    {
        const objRoom = obj.room
        
        for(var k in Game.flags)
        {
            console.log(Game.flags[k].room)
        }
    },
    
    /*
    Description
        checks list for closest object to e (entity)
        
    Return value
        null if the list length is 0
        closest obj to e in list
    */
    getClosestObject: function(e, list)
    {
        if (list.length == 0)
        {
            console.log("ERROR: list empty, can't get closest to:", e)
            return null
        }
        
        // if there's 1 obj 
        //  return that obj
        if (list.length == 1)
        {
            return list[0]
        }
        
        // if there's more than 1 obj, 
        //  cycle thru the list and return the closest
        else
        {
            var closest = list[0]
        
            for(var obj in list)
            {
                if (e.pos.getRangeTo(list[obj]) < e.pos.getRangeTo(closest))
                {
                    closest = list[obj]
                }
            }
            
            return closest
        }
    },
    
    /*
    Description
        checks if the creep is in the room
        "room" is a string of the room name
    
    Return value
        true if it's in the room
        false if it's not
    */
    isInRoom: function(obj, room)
    {
        if(obj.room.name == room)
        {
            return true
        }
        
        else
        {
            return false
        }
    },
    
    /*
    Description
        checks if the creep is in the room it wants to be in
        based off of memory.creep.room
        
    Return value
        true if it's in the home room
        false if it's NOT in the home room
    */
    isInHomeRoom: function(creep)
    {
        var n = creep.name
        
        // this gets the actual room object, not the name of the room
        //var destRoom = Game.rooms[Memory.creeps[n].room]
        var destRoom = Memory.creeps[n].room
        
        if(debugging)
        {
            console.log('NEW CREEP:', creep)
            console.log('homeRoom:', destRoom)
            console.log('creep.room:', creep.room)
            console.log('creep.room.name:', creep.room.name)
        }
        
        // if the creep doesn't have a home room memory obj, then
        //  set the creep's memory to the current room
        if(!destRoom)
        {
            console.log('!destRoom')
            Memory.creeps[n].room = creep.room.name
            destRoom = creep.room.name
        }
        
        // if the creep is in the right room, then
        //  return true
        if (creep.room.name == destRoom)
        {
            return true
        }
        
        // if the creep is in the right room, then
        //  return false
        else
        {
            return false
        }
    }
};









































