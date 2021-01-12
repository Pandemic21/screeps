var debugging = false;
var reservePercent = 0.75

module.exports = {
    repair: function(tower) 
    {
        var energyPercent = tower.energy / tower.energyCapacity
        
        // if there's more energy than is reserved for defence
        if (energyPercent > reservePercent)
        {
            var repairTarget = getRepairTarget(tower)
        
            // make sure there's a valid repair target
            if(repairTarget)
            {
                tower.repair(repairTarget)
            }
            else
            {
                if(debugging) { console.log("No valid repair target") }
            }
        }
        
        // if there's not enough reserve energy
        else
        {
            //console.log("No reserve energy:", energyPercent)
        }
    },
    
    defend: function(tower)
    {
        var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0) 
        {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${tower.room.name}`);
            tower.attack(hostiles[0])
        }
    }
};



function debug(k='debugging',i=''){
    console.log(k,i)
}

function getRepairTarget(tower)
{
    if(debugging) { console.log(tower) }
        
    var structureList = tower.room.find(FIND_STRUCTURES)
    
    for(var s in structureList)
    {
        var structure = structureList[s]
        
        if(structure.hits < structure.hitsMax) 
        { 
            if(debugging) { console.log('Found repair target:', structure, " hits/hitsMax:", structure.hits, "/", structure.hitsMax) }
            return structure
        }
    }
}

















