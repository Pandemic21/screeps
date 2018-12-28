/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.spawner');
 * mod.thing == 'a thing'; // true
 */
 
 
 /*
for(var k in Game.creeps.Blake.room.memory.sources) { 
    console.log(k); 
    
    if(Game.creeps.Blake.room.memory.sources[k].maxWorkers == 2) { 
        console.log('yes') 
    }
}
*/

module.exports = {
    
    // spawn harvesters

    for(var r in Game.rooms)
    {
        for(let sources of r.find(FIND_SOURCES)) 
        { 
            console.log(sources.id);
            console.log(r.memory.sources[sources.id].maxWorkers) 
        }
    }
};





































