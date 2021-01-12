var helper = require('game.helper')


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // if the creep has no energy, set upgrade to FALSE
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('⛏️');
        }
        
        // if the creep is at carrying capacity, set upgrade to TRUE
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⬆️');
        }
        
        // upgrade logic
        if(creep.memory.upgrading)
        {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: {stroke: '#ffaa00'},
                    reusePath: 5
                });
            }
        }
        
        // mining logic
        if(!creep.memory.upgrading)
        {
            var sourceSilo = getSourceSilo(creep)
        
            if(creep.withdraw(sourceSilo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceSilo, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;

function getSourceSilo(creep)
{
    var siloList = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
    })
    
    // get the closest container to the creep's source in memory
    return helper.getClosestObject(creep, siloList)
}






























