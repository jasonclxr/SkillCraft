// Note: might want to consider max win rates of children nodes

class Skill {
    constructor(name, tags, row, maxPoints) {
        this.name = name;
        this.tags = tags;
        this.row = row;
        this.maxPoints = maxPoints;
    }

    is_legal() {
        return this.points < this.maxPoints;
    }
    
};

class SkillTree {
    constructor(skills, points_remaining, combat_row, signs_row, alchemy_row, general_row) {
        this.skills = skills;
        this.points_remaining = points_remaining;
        this.combat_row = 0;
        this.signs_row = 0;
        this.alchemy_row = 0;
        this.general_row = 0;
    }
};

class Branch {
    constructor(name, row_costs) {
        this.name = name;
        this.row_costs = row_costs; 
    }
}

class MCTS {
    constructor(tree, num_nodes, explore_factor) {
        this.tree = tree;
        this.num_nodes = num_nodes;
        this.explore_factor = explore_factor;
    }

    // Traverse graph using UCT function until leaf node is reached
    traverse_nodes() {

    }

    // Adds a new leaf to the tree by creating a new child node for the given node.
    // Constraints: Must have enough skill points in tree to reach row
    expand_leaf() {

    }

    // Selects random skills until points are depleted
    rollout() {
        while(this.tree.points_remaining > 0) {
            let skill_index = Math.floor(Math.random() * this.tree.skills.length);
            if (this.tree.skills[skill_index].is_legal()) {
                this.tree.skills[skill_index].points += 1;
                this.tree.points_remaining -= 1;
            }
        }
    // return win values of all skills
    }

    // Propagate result back through the graph
    backpropagate() {
    
    }

    // Performs MCTS by sampling games and returns the action
    think() {

    }
}

function createBranches() {
    
}

function createTree() {
    var tree = new SkillTree([], 20);

    var muscleMemory = new Skill("Muscle Memory", [], 0, 5);
    tree.skills.push(muscleMemory);
    var strengthTraining = new Skill("Strength Training", [], 0, 5);
    tree.skills.push(strengthTraining);
    var arrowDeflection = new Skill("Arrow Deflection", [], 0, 3);
    tree.skills.push(arrowDeflection);
    var lightningReflexes = new Skill("Lightning Reflexes", [], 0, 3);
    tree.skills.push(lightningReflexes);
    var resolve = new Skill("Resolve", [], 0, 5);
    tree.skills.push(resolve);

    var preciseBlows = new Skill("Precise Blows", [], 1, 5);
    tree.skills.push(preciseBlows);
    var crushingBlows = new Skill("Crushing Blows", [], 1, 5);
    tree.skills.push(crushingBlows);
    var fleetFooted = new Skill("Fleet Footed", [], 1, 5);
    tree.skills.push(fleetFooted);
    var coldBlood = new Skill("Cold Blood", [], 1, 5);
    tree.skills.push(coldBlood);
    var undying = new Skill("Undying", [], 1, 5);
    tree.skills.push(undying);

    var whirl = new Skill("Whirl", [], 2, 5);
    tree.skills.push(whirl);
    var rend = new Skill("Crushing Blows", [], 2, 5);
    tree.skills.push(rend);
    var counterAttack = new Skill("Counter Attack", [], 2, 3);
    tree.skills.push(counterAttack);
    var anatomicalKnowledge = new Skill("Anatomical Knowledge", [], 2, 5);
    tree.skills.push(anatomicalKnowledge);
    var razorFocus = new Skill("Razor Focus", [], 2, 5);
    tree.skills.push(razorFocus);

    var cripplingStrikes = new Skill("Crippling Strikes", [], 3, 5);
    tree.skills.push(cripplingStrikes);
    var sunderArmor = new Skill("Sunder Armor", [], 3, 5);
    tree.skills.push(sunderArmor);
    var deadlyPrecision = new Skill("Deadly Precision", [], 3, 2);
    tree.skills.push(deadlyPrecision);
    var cripplingShot = new Skill("Crippling Shot", [], 3, 5);
    tree.skills.push(cripplingShot);
    var floodOfAnger = new Skill("Flood of Anger", [], 3, 5);
    tree.skills.push(floodOfAnger);

    var farReachingAard = new Skill("Far Reaching Aard", [], 0, 3);
    tree.skills.push(farReachingAard);
    var meltArmor = new Skill("Strength Training", [], 0, 5);
    tree.skills.push(meltArmor);
    var sustainedGlyphs = new Skill("Sustained Glyphs", [], 0, 2);
    tree.skills.push(sustainedGlyphs);
    var explodingShield = new Skill("Exploding Shield", [], 0, 3);
    tree.skills.push(explodingShield);
    var delusion = new Skill("Delusion", [], 0, 3);
    tree.skills.push(delusion);

    var aardSweep = new Skill("Aard Sweep", [], 1, 3);
    tree.skills.push(aardSweep);
    var firestream = new Skill("Firestream", [], 1, 3);
    tree.skills.push(firestream);
    var magicTrap = new Skill("Magic Trap", [], 1, 3);
    tree.skills.push(magicTrap);
    var activeShield = new Skill("Active Shield", [], 1, 3);
    tree.skills.push(activeShield);
    var puppet = new Skill("Puppet", [], 1, 3);
    tree.skills.push(puppet);

    var aardIntensity = new Skill("Aard Intensity", [], 2, 5);
    tree.skills.push(aardIntensity);
    var igniIntensity = new Skill("Igni Intensity", [], 2, 5);
    tree.skills.push(igniIntensity);
    var yrdenIntensity = new Skill("Yrden Intensity", [], 2, 5);
    tree.skills.push(yrdenIntensity);
    var quenIntensity = new Skill("Quen Intensity", [], 2, 5);
    tree.skills.push(quenIntensity);
    var axiiIntensity = new Skill("Razor Focus", [], 2, 5);
    tree.skills.push(axiiIntensity);

    var shockWave = new Skill("Shock Wave", [], 3, 5);
    tree.skills.push(shockWave);
    var pyromanica = new Skill("Pyromanica", [], 3, 5);
    tree.skills.push(pyromanica);
    var superchargedGlyphs = new Skill("Supercharged Glyphs", [], 3, 5);
    tree.skills.push(superchargedGlyphs);
    var quenDischarge = new Skill("Quen Discharge", [], 3, 5);
    tree.skills.push(quenDischarge);
    var domination = new Skill("Domination", [], 3, 3);
    tree.skills.push(domination);

    var heightenedTolerance = new Skill("Heightened Tolerance", [], 0, 5);
    tree.skills.push(heightenedTolerance);
    var poisonedBlades = new Skill("Poisoned Blades", [], 0, 5);
    tree.skills.push(poisonedBlades);
    var steadyAim = new Skill("Steady Aim", [], 0, 3);
    tree.skills.push(steadyAim);
    var acquiredTolerance = new Skill("Acquired Tolerance", [], 0, 3);
    tree.skills.push(acquiredTolerance);
    var frenzy = new Skill("Frenzy", [], 0, 3);
    tree.skills.push(frenzy);

    var refreshment = new Skill("Refreshment", [], 1, 5);
    tree.skills.push(refreshment);
    var protectiveCoating = new Skill("Protective Coating", [], 1, 5);
    tree.skills.push(protectiveCoating);
    var pyrotechnics = new Skill("Pyrotechnics", [], 1, 5);
    tree.skills.push(pyrotechnics);
    var tissueTransmutation = new Skill("Tissue Transmutation", [], 1, 5);
    tree.skills.push(tissueTransmutation);
    var endurePain = new Skill("Endure Pain", [], 1, 5);
    tree.skills.push(endurePain);

    var sunAndStars = new Skill("Sun and Stars", [], 2, 3);
    tree.skills.push(sunAndStars);
    var survivalInstinct = new Skill("Surival Instinct", [], 2, 3);
    tree.skills.push(survivalInstinct);
    var catSchoolTechniques = new Skill("Cat School Techniques", [], 2, 5);
    tree.skills.push(catSchoolTechniques);
    var griffinSchoolTechniques = new Skill("Griffin School Techniques", [], 2, 5);
    tree.skills.push(griffinSchoolTechniques);
    var bearSchoolTechniques = new Skill("Bear School Techniques", [], 2, 5);
    tree.skills.push(bearSchoolTechniques);

    var steadyShot = new Skill("Steady Shot", [], 0, 1);
    tree.skills.push(steadyShot);
    var rageManagement = new Skill("Rage Management", [], 0, 1);
    tree.skills.push(rageManagement);
    var focusGen = new Skill("Focus", [], 0, 1);
    tree.skills.push(focusGen);
    var adrenalineBurst = new Skill("Adrenaline Burst", [], 0, 1);
    tree.skills.push(adrenalineBurst);
    var metabolismControl = new Skill("Metabolism Control", [], 0, 1);
    tree.skills.push(metabolismControl);
}


createTree();


//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/
