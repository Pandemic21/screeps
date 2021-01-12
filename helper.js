var helper = require('game.helper')

//var k = require('helper'); k.spawnerEx('testing','5bbcaa7b9099fc012e631720');
//var k = require('helper'); k.spawnerEx('upgrader','5bbcaa7a9099fc012e63171d');
//var k = require('helper'); k.spawnerEx('harvester','5bbcaa7a9099fc012e63171e');
//var k = require('helper'); k.creepTypes();
//var k = require('helper'); k.findSilo();
//var k = require('helper'); k.getCPUInfo();
//var k = require('helper'); k.getTowerInfo();
//var k = require('helper'); k.remoteMining();
//var k = require('helper'); k.getCreepMemory('builder-2966672');
//var k = require('helper'); k.getCreepRoom();
//var k = require('helper'); k.getExtension();
//var k = require('helper'); k.getRoadToRepair();
//var k = require('helper'); k.getStorage();
//var k = require('helper'); k.getRemoteSource();
//var k = require('helper'); k.getMemory();
//var k = require('helper'); k.setOverlordPath();
//var k = require('helper'); k.getOverlordPath();
//var k = require('helper'); k.createOverlordPath();
//var k = require('helper'); k.getOverlordRooms();
//var k = require('helper'); k.getFlags();



var debugging = true;

module.exports = {
    getFlags: function()
    {
        for(var k in Game.flags)
        {
            console.log(Game.flags[k].room)
            
            if(_.includes(Game.flags[k].room.name, "Rest"))
            {
                console.log(Game.flags[k].name, "has Rest")
            }
            else
            {
                console.log('no:', Game.flags[k].name)
            }
        }
    },
    
    getInvaders: function()
    {
        const ownedRooms = Object.keys(Memory.cme['OwnedRooms'])
        
        console.log(ownedRooms)
        
        for(var k in ownedRooms)
        {
            // in case we don't have vision in a room we claim to own
            try
            {
                var targets = Game.rooms[ownedRooms[k]].find(FIND_HOSTILE_CREEPS)
            }
            catch(err) { }
            
            console.log(k, targets.length)
            
            // if there is at least 1 invader in the room, 
            //  break
            if (targets.length > 0)
            {
                console.log("targets.length > 1")
                
                for(var i in Memory.creeps)
                {
                    if(Memory.creeps[i].role == 'ling')
                    {
                        console.log(i, Memory.creeps[i].room)
                        Memory.creeps[i].room = ownedRooms[k]
                        console.log(i, Memory.creeps[i].room)
                    }
                }
            }
        }
    },
    
    getOverlordRooms: function()
    {
        var rooms = Memory.overlord['ownedRooms']
        
        for(var k in rooms)
        {
            console.log(rooms[k])
        }
        
        var rooms = Object.keys(rooms)
        
        for(var k in rooms)
        {
            console.log(rooms[k])
        }
    },
    
    createOverlordPath: function()
    {
        var path = Memory.overlord['build'].road.path
        
        var k = 0
        while (k < path.length)
        {
            Game.rooms[path[k].roomName].createConstructionSite(path[k].x, path[k].y, STRUCTURE_ROAD);
            
            k++
        }
    },
    
    getOverlordPath: function()
    {
        var path = Memory.overlord['build'].road.path
        var k = 0
        
        console.log(path.length)
        while (k < path.length)
        {
            var p = new RoomPosition(path[k].x, path[k].y, path[k].roomName);
            
            Game.rooms[path[k].roomName].visual.circle(path[k].x,path[k].y)
            
            //console.log(p)
            k++
        }
    },
    
    setOverlordPath: function()
    {
        /*
        NOTE
        - origin of pathfinder doesn't get included in the path for construction purposes
        - shit gets fucky if you navigate directly to a source, need to find an empty space next to it
        */
        
        delete Memory.overlord['build'].road
        
        var stop = new RoomPosition(24, 15, "W47N24")
        var remoteSource = Game.getObjectById('5bbcaa7a9099fc012e631719')
        var remoteSource = new RoomPosition(25, 40, "W47N25")
        var dump = Game.getObjectById('5c2d32642aca2a45c7cc7e0b')
        
        var path = PathFinder.search(stop, remoteSource, 
            {
                plainCost: 10,
                swampCost: 10
            })
        
        Memory.overlord['build'].road = path
        
        return path
    },
    
    getMemory: function()
    {
        /*
        // This works too
        var mem = Memory.overlord['exists']
        
        if(!mem)
        {
            console.log("no mem")
            Memory.overlord['exists'] = { one: 'one', two: 'two' }
        }
        else
        {
            console.log('yes mem:', mem)
            delete Memory.overlord['exists']
        }
        */
        
        /*
        // This works
        var mem = Memory.overlord.exists
        
        if(!mem)
        {
            console.log("no mem")
            Memory.overlord.exists = "Hello world"
        }
        else
        {
            console.log("yes mem:", mem)
            delete Memory.overlord.exists
        }
        */
    },
    
    getRemoteSource: function()
    {
        var remoteSource = Game.getObjectById('5bbcaa6f9099fc012e631595')
        //var spawn = Game.getObjectById('5c266a396e0ae23205c19284')
        var goal = Game.getObjectById('5c2d65915fa7976134bd4254')
        
        var path = PathFinder.search(goal.pos, remoteSource.pos)
        console.log(path)
        
        console.log(path.path)
        
        console.log(Memory.overlord.exists)
        Memory.overlord['build'].road = path
    },
    
    getStorage: function()
    {
        var s = Game.getObjectById('5c2d32642aca2a45c7cc7e0b')
        
        console.log('store:',s.store)
        var store = s.store
        
        console.log('energy:',store[RESOURCE_ENERGY])
        console.log('storeCapacity:',s.storeCapacity)
    },
    
    getRoadToRepair: function()
    {
        var creep = Game.getObjectById('5c2ef6a48d273a6148b386f6')
        
        var r = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:s=>s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax})
        
        console.log(creep, creep.pos)
        console.log(r, r.pos)
    },
    
    getExtension: function()
    {
        var source = Game.getObjectById('5bbcaa7a9099fc012e63171e')
        
        var extensionList = Game.rooms['W47N24'].find(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_EXTENSION
        })
        
        //var r = helper.getClosestObject(source, extensionList)
        var r = _.sortBy(extensionList, s => source.pos.getRangeTo(s))
        console.log(r)
        console.log(r[0].pos)
        
        
    },
    
    getContainer: function()
    {
        var towerList = Game.rooms['W47N23'].find(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_CONTAINER
        })
        
        console.log(towerList)
        
        for(var tower in towerList)
        {
            console.log(towerList[tower])
        }
    },
    
    getCreepMemory: function(name)
    {
        var creep = Game.creeps[name]
        var n = creep.name
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
            console.log(destRoom)
        }
        else
        {
            console.log('yes destRoom', destRoom)
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
        //var testingCreep = Game.getObjectById('5c2c1fae7cea835c880f43c1')
        var mem = Memory.creeps[name]
        var keys = Object.keys(mem)
        
        // remove _move from the creep
        if(mem._move)
        {
            console.log('delete')
            delete mem._move
        }
        else
        {
            console.log('dne')
        }
        
        // cycle through the old creep memory and put it in the new creep
        for(var key in keys)
        {
            console.log(keys[key])
            console.log(mem[keys[key]])
        }
    },
    
    getCreepRoom: function()
    {
        var creep = Game.getObjectById('5c2a70b3388ac547068e76d4')
        
        var room = creep.room
        console.log(room)
        var hostiles = room.find(FIND_MY_STRUCTURES);
        
        console.log(hostiles)
        
        // if there are enemies in the room
        if(hostiles.length > 0)
        {
            hostiles = _.sortBy(hostiles, s => creep.pos.getRangeTo(s))
            console.log(hostiles)
        }
        else
        {
            console.log('no')
        }
    },
    
    remoteMining: function(){
        // testing creep ID:        5c29267e3d7fda2cee6cb1f4
        // remote mining source ID: 5bbcaa7b9099fc012e631720
        
        var testingCreep = Game.getObjectById('5c29373e97f2b9073857a59a')
        var remoteSource = Game.getObjectById('5bbcaa7b9099fc012e631720')
        var baseRoom = Game.rooms.W47N24

        const baseRoomExit = new RoomPosition(20, 49, 'W47N24');
        
        testingCreep.moveTo(baseRoomExit)
        
        /*
        console.log(baseRoom.find(FIND_EXIT_BOTTOM))
        
        console.log('testingCreep:', testingCreep)
        console.log('remoteSource:', remoteSource)
        console.log('remoteRoom:', remoteRoom)
        
        console.log('testingCreep.memory.source:', testingCreep.memory.source)
        console.log('remoteSource.room:', remoteSource.room)
        console.log('testingCreep.room:', testingCreep.room)
        */
    },
    
    getTowerInfo: function(){
        var tower = Game.getObjectById('5c2844ae7deeb21868bcfbf4')
        console.log(tower)
        
        var structureList = tower.room.find(FIND_STRUCTURES)
        
        for(var s in structureList)
        {
            var structure = structureList[s]
            if(structure.hits < structure.hitsMax) { 
                console.log('FOUND')
                break;
            }
            console.log(structure)
            console.log(structure.hits, "/", structure.hitsMax)
        }
        tower.repair(structure)
    },
    
    getCPUInfo: function(){
        var cpu = Game.cpu
        console.log(Object.keys(cpu))
        console.log("limit:", cpu.limit)
        console.log("getUsed:", cpu.getUsed())
        //getUsed,tickLimit,limit,bucket,getHeapStatistics,halt,shardLimits,setShardLimits
    },
    
    findSilo: function(){
        /*
        var structureList = Game.rooms.W47N24.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION || STRUCTURE_SPAWN }
        })
        */
        /*
        var structureList = Game.rooms.W47N24.find(FIND_MY_STRUCTURES, {
        	filter: function(s) { return s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN }
        })
        */
        
        // get all extensions, spawns, towers
        var structureList = Game.rooms.W47N24.find(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER
        })
        
        // display a list of gotten objects
        console.log('Gotten items (includes exclusions):', structureList.length, structureList)
        structureList.sort()
        console.log(structureList)
        
        // find the object with ID you want to exclude
        var exclude = structureList.find(s => s.id === '5c2844ae7deeb21868bcfbf4')
        console.log('Excluded object:', exclude)
        
        // get the index in the array of the object you want to exclude
        var excludeIndex = structureList.indexOf(exclude)
        
        // remove excluded object from array
        structureList.splice(excludeIndex, 1)
        
        // display results
        console.log('Gotten items without excluded item:', structureList.length, structureList)
        
        /*
        var towerIndex = structureList.indexOf(tower)
        tower = structureList.splice(towerIndex, 1)
        
        console.log(structureList)
        
        structureList.push(tower)
        
        console.log(structureList)
        */
        
        /*
        for(var structure in structureList)
        {
            var silo = structureList[structure]
            console.log(silo)
            console.log(silo.energy)
            console.log(silo.energyCapacity)
            console.log()
        }
        */
        
    },
    
    createRoad: function(){
        var start = Game.getObjectById('5bbcaa7a9099fc012e63171c'); // room controller
        var finish = Game.getObjectById('5bbcaa7a9099fc012e63171d'); // source they mine from
        
        var path = start.pos.findPathTo(finish.pos); 
        
        for(var part in path)
        {
            var value = path[part]
            //console.log(value)
            //console.log()
            //console.log(Object.keys(value))
            console.log(value.x, value.y)
            
            //break;
        }
        
        //console.log(path[2])
    },
    
    spawnerEx: function(role, source) {
        // define default configurations for various roles
        // total: 800
        var configurations = {
            "default"   : [WORK, CARRY, MOVE],
            "harvester" : [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            "upgrader"  : [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            "builder"   : [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            "testing"   : [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }
        
        // if the configuration doesn't exist for the role for some reason
        if(!configurations[role])
        {
            console.log('Role does not exist:',role)
            role = 'default'
        }
        
        if(debugging)
        {
            debug('in room.spawner')
            debug('role:',role)
            debug('source:',source)
            debug('spawning with config:',configurations[role])
        }
        
        // spawn the creep
        var name = role + "-" + Game.time.toString()
        var spawnResult = Game.spawns['Spawn1'].spawnCreep(configurations[role], name, { memory: {role: role, source: source} })
        
        return spawnResult;
    },
    
    
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

function debug(k='debugging',i=''){
    console.log(k,i)
}





























