// var k = require('helper'); k.getRoomMemory();

module.exports = {
    creepTypes: function() {
        for(var i in Game.creeps){
            console.log(Game.creeps[i].memory.role)
        }
    },
    
    creepTTL: function() {
        for(var i in Game.creeps){
            console.log(Game.creeps[i].ticksToLive)
        }
    },
    
    test: function() {
        console.log('test')
    },
    
    setRoomSourceMemory: function() {
        if (room.memory.sourceInfo === undefined) {
        	room.memory.sourceInfo = {};
        	for (const source of room.find(FIND_SOURCES)) {
                console.log(source)
        	}
        }
    }, 
    
    setRoomSources: function() {
        Source.prototype.memory = undefined;
    
        for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
            var room = Game.rooms[roomName];
            if(!room.memory.sources){//If this room has no sources memory yet
                room.memory.sources = {}; //Add it
                var sources = room.find(FIND_SOURCES);//Find all sources in the current room
                for(var i in sources){
                    var source = sources[i];
                    source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
                    //Now you can do anything you want to do with this source
                    //for example you could add a worker counter:
                    source.memory.maxWorkers = 0;
                    source.memory.currentWorkers = 0;
                }
            }else{ //The memory already exists so lets add a shortcut to the sources its memory
                var sources = room.find(FIND_SOURCES);//Find all sources in the current room
                for(var i in sources){
                    var source = sources[i];
                    source.memory = this.memory.sources[source.id]; //Set the shortcut
                }
            }
        }
    },
    
    getRoom: function(name) {
        //var k = Game.rooms(name)
        var k = Game.Room(name)
        console.log(k)
    },
    
    getRoomMemory: function() {
        
        for (var roomName in Game.rooms) {
        	var room = Game.rooms[roomName];
        	
        	for(var k in room.memory.sources)
        	{
        	    console.log(room.memory.sources[k].maxWorkers)
        	    console.log(room.memory.sources[k].assignedWorkers.length)
        	    
        	    if(room.memory.sources[k].assignedWorkers.length < room.memory.sources[k].maxWorkers)
        	    {
        	        console.log(console.log(k + " has too few workers"))
        	    }
        	}
        	
        }
    }
}































