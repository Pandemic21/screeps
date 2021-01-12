var helper = require('game.helper')
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
        //  get the hostile list
        //  select the closest hostile as the target
        //  get healers in range of target
        //      if healers > 0
        //          get healer target
        //          attack healer
        //      if healers == 0
        //          attack target
        
        var hostileList = tower.room.find(FIND_HOSTILE_CREEPS)
        
        // make sure there are actually hostiles in the room
        if(hostileList.length > 0)
        {
            target = helper.getClosestObject(tower, hostileList)
            
            // set the range to keep healers away and get healers near the target
            var healerRange = 4
            var healerList= target.pos.findInRange(FIND_HOSTILE_CREEPS, healerRange, { 
                filter: s => _.some(s.body, bp => bp.type === HEAL)
            });
            
            // if there are any healers
            //  set the new target to the first healer
            if(healerList.length > 0)
            {
                target = healerList[0]
            }
            
            // attack the target
            tower.attack(target)
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



































