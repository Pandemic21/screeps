var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var debugging = false;
        
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                
                var t = creep.harvest()
                t = 'creep.harvest = ' + t

                if(debugging) { debug(creep, t) }
            }
            if(debugging) { debug(creep, '2') }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               // creep.moveTo(Game.spawns['Spawn1']);
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffaa00'}});
                if(debugging) { debug(creep, '3') }
            }
            //if(debug) { console.log(creep.name + " 4") }
            if(debugging) { debug(creep, '4') }
        }
	}
	
	
};

function debug(creep,i){
    console.log(creep.name + " " + i)
}

module.exports = roleHarvester;
