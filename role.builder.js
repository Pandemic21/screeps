var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var debugging = false;

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
            
            if(debugging) { debug(creep, '1') }
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
            
            if(debugging) { debug(creep, '2') }
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    
                    if(debugging) { debug(creep, '3') }
                }
                if(debugging) { debug(creep, '4') }
            }
            
            // this ensures the creep doesn't stand next to the source like an asshole
            else
            {
                creep.moveTo(Game.flags.rest)
            }
            if(debugging) { debug(creep, '5') }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                
                if(debugging) { debug(creep, '6') }
            }
            if(debugging) { debug(creep, '7') }
        }
    }
};

function debug(creep,i){
    console.log(creep.name + " " + i)
}

module.exports = roleBuilder;
