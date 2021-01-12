module.exports = {
    mobilizeDefensiveArmy: function()
    {
        const ownedRooms = Object.keys(Memory.cme['OwnedRooms'])
        
        for(var k in ownedRooms)
        {
            // in case we don't have vision in a room we claim to own
            try
            {
                var hostiles = Game.rooms[ownedRooms[k]].find(FIND_HOSTILE_CREEPS)
            }
            catch(err) { }
            
            // if there is at least 1 invader in the room, 
            //  assign lings as that home room
            //  break
            if (hostiles.length > 0)
            {
                var username = hostiles[0].owner.username;
                Game.notify(`User ${username} spotted in room ${ownedRooms[k]}`);
            
                for(var i in Memory.creeps)
                {
                    if(Memory.creeps[i].role == 'ling')
                    {
                        Memory.creeps[i].room = ownedRooms[k]
                    }
                }
            }
            
            // if there are no enemies,
            //  assign the main base as the lings' home room
            else
            {
                for(var i in Memory.creeps)
                {
                    if(Memory.creeps[i].role == 'ling')
                    {
                        Memory.creeps[i].room = 'W47N24'
                    }
                }
            }
        }
    },
    
    test: function()
    {
        console.log('hi')
    }
};



/*
Steps to colonize a remote mining room
- send a claimer
- wait for the claimer to get to the room (so i have visibility with scripts)
- getOverlordPath
- createOverlordPath
- create the container(s) next to the source(s)(can only happen after the road is created)
- assign miners to source(s)
- assign transporters to source(s)

*/
























