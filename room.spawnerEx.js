var debugging = false;

// define default configurations for various roles
// total: 800
var configurations = {
    "default"   : [WORK, CARRY, MOVE],
    "harvester" : [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    /*"harvester" : [WORK, CARRY, MOVE],*/
    "upgrader"  : [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    "builder"   : [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    "claimer"   : [CLAIM, CLAIM, MOVE],
    "testing"   : [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
}

module.exports = {
    autoSpawn: function(name) 
    {
        // get old creep memory
        var mem = Memory.creeps[name]
        
        return spawn(mem)
    },
    
    manualSpawn: function(mem)
    {
        // mem.role required to exist, if it doesn't throw errors
        if (!mem.role)
        {
            console.log("No role, assigning default")
            mem.role = 'default'
        }
        
        return spawn(mem)
    }
}

function debug(k='debugging',i='')
{
    console.log(k,i)
}

function spawn(mem)
{
    // if the configuration doesn't exist for the role for some reason
    if(!configurations[mem.role])
    {
        console.log('Role does not exist:', mem.role)
        role = 'default'
    }
    
    // spawn the creep
    var name = mem.role + "-" + Game.time.toString()
    var spawnResult = Game.spawns['Spawn1'].spawnCreep(configurations[mem.role], name, { memory: mem })
    
    return spawnResult;
}






































