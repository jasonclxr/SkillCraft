// Note: might want to consider max win rates of children nodes

class Skill {
    constructor(name, tags, row, maxPoints, branch) {
        this.name = name;
        this.tags = tags;
        this.row = row;
        this.maxPoints = maxPoints;
        this.branch = branch;
    }

    is_legal() {
        return this.points < this.maxPoints;
    }
    
};

class SkillTree {
    constructor(points_remaining, state) {
        this.skills = [];
        this.points_remaining = points_remaining;
        this.combat_row = 0;
        this.signs_row = 0;
        this.alchemy_row = 0;
        this.general_row = 0;
        this.state = state;
    }
};

//example attributes: will need to be changed
class AttributesState {
    // attributes should add up to 100
    constructor(combat, stealth, defense, alchemy) {
        this.combat = 25;
        this.stealth = 25;
        this.defense = 25;
        this.alchemy = 25;
    }
}

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
            let skill_index = Math.floor(Math.random() * this.tree.skills.length); //instead of random we should choose a random skill with a bias towards what they want

            if (this.tree.skills[skill_index].is_legal()) { // this should also check if the row is accessible based on the amount of skills in the branch
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

function createTree() {
    var tree = new SkillTree(20, new AttributesState());
    
    var combat = new Branch("combat", [0, 8, 20, 30]);
    var signs = new Branch("signs", [0, 6, 18, 28]);
    var alchemy = new Branch("alchemy", [0, 8, 20, 28]);
    var general = new Branch("general", [0]);

    let combat_first_row = [];
    let muscleMemory = new Skill("Muscle Memory", [], 0, 5, combat);
    combat_first_row.push(muscleMemory);
    let strengthTraining = new Skill("Strength Training", [], 0, 5, combat);
    combat_first_row.push(strengthTraining);
    let arrowDeflection = new Skill("Arrow Deflection", [], 0, 3, combat);
    combat_first_row.push(arrowDeflection);
    let lightningReflexes = new Skill("Lightning Reflexes", [], 0, 3, combat);
    combat_first_row.push(lightningReflexes);
    let resolve = new Skill("Resolve", [], 0, 5, combat);
    combat_first_row.push(resolve);

    let combat_second_row = [];
    let preciseBlows = new Skill("Precise Blows", [], 1, 5, combat);
    combat_second_row.push(preciseBlows);
    let crushingBlows = new Skill("Crushing Blows", [], 1, 5, combat);
    combat_second_row.push(crushingBlows);
    let fleetFooted = new Skill("Fleet Footed", [], 1, 5, combat);
    combat_second_row.push(fleetFooted);
    let coldBlood = new Skill("Cold Blood", [], 1, 5, combat);
    combat_second_row.push(coldBlood);
    let undying = new Skill("Undying", [], 1, 5, combat);
    combat_second_row.push(undying);

    let combat_third_row = [];
    let whirl = new Skill("Whirl", [], 2, 5, combat);
    combat_third_row.push(whirl);
    let rend = new Skill("Crushing Blows", [], 2, 5, combat);
    combat_third_row.push(rend);
    let counterAttack = new Skill("Counter Attack", [], 2, 3, combat);
    combat_third_row.push(counterAttack);
    let anatomicalKnowledge = new Skill("Anatomical Knowledge", [], 2, 5, combat);
    combat_third_row.push(anatomicalKnowledge);
    let razorFocus = new Skill("Razor Focus", [], 2, 5, combat);
    combat_third_row.push(razorFocus);

    let combat_fourth_row = [];
    let cripplingStrikes = new Skill("Crippling Strikes", [], 3, 5, combat);
    combat_fourth_row.push(cripplingStrikes);
    let sunderArmor = new Skill("Sunder Armor", [], 3, 5, combat);
    combat_fourth_row.push(sunderArmor);
    let deadlyPrecision = new Skill("Deadly Precision", [], 3, 2, combat);
    combat_fourth_row.push(deadlyPrecision);
    let cripplingShot = new Skill("Crippling Shot", [], 3, 5, combat);
    combat_fourth_row.push(cripplingShot);
    let floodOfAnger = new Skill("Flood of Anger", [], 3, 5, combat);
    combat_fourth_row.push(floodOfAnger);

    let signs_first_row = [];
    let farReachingAard = new Skill("Far Reaching Aard", [], 0, 3, signs);
    signs_first_row.push(farReachingAard);
    let meltArmor = new Skill("Strength Training", [], 0, 5, signs);
    signs_first_row.push(meltArmor);
    let sustainedGlyphs = new Skill("Sustained Glyphs", [], 0, 2, signs);
    signs_first_row.push(sustainedGlyphs);
    let explodingShield = new Skill("Exploding Shield", [], 0, 3, signs);
    signs_first_row.push(explodingShield);
    let delusion = new Skill("Delusion", [], 0, 3, signs);
    signs_first_row.push(delusion);

    let signs_second_row = [];
    let aardSweep = new Skill("Aard Sweep", [], 1, 3, signs);
    signs_second_row.push(aardSweep);
    let firestream = new Skill("Firestream", [], 1, 3, signs);
    signs_second_row.push(firestream);
    let magicTrap = new Skill("Magic Trap", [], 1, 3, signs);
    signs_second_row.push(magicTrap);
    let activeShield = new Skill("Active Shield", [], 1, 3, signs);
    signs_second_row.push(activeShield);
    let puppet = new Skill("Puppet", [], 1, 3, signs);
    signs_second_row.push(puppet);

    let signs_third_row = [];
    let aardIntensity = new Skill("Aard Intensity", [], 2, 5, signs);
    signs_third_row.push(aardIntensity);
    let igniIntensity = new Skill("Igni Intensity", [], 2, 5, signs);
    signs_third_row.push(igniIntensity);
    let yrdenIntensity = new Skill("Yrden Intensity", [], 2, 5, signs);
    signs_third_row.push(yrdenIntensity);
    let quenIntensity = new Skill("Quen Intensity", [], 2, 5, signs);
    signs_third_row.push(quenIntensity);
    let axiiIntensity = new Skill("Razor Focus", [], 2, 5, signs);
    signs_third_row.push(axiiIntensity);

    let signs_fourth_row = [];
    let shockWave = new Skill("Shock Wave", [], 3, 5, signs);
    signs_fourth_row.push(shockWave);
    let pyromanica = new Skill("Pyromanica", [], 3, 5, signs);
    signs_fourth_row.push(pyromanica);
    let superchargedGlyphs = new Skill("Supercharged Glyphs", [], 3, 5, signs);
    signs_fourth_row.push(superchargedGlyphs);
    let quenDischarge = new Skill("Quen Discharge", [], 3, 5, signs);
    signs_fourth_row.push(quenDischarge);
    let domination = new Skill("Domination", [], 3, 3, signs);
    signs_fourth_row.push(domination);

    let alchemy_first_row = [];
    let heightenedTolerance = new Skill("Heightened Tolerance", [], 0, 5, alchemy);
    alchemy_first_row.push(heightenedTolerance);
    let poisonedBlades = new Skill("Poisoned Blades", [], 0, 5, alchemy);
    alchemy_first_row.push(poisonedBlades);
    let steadyAim = new Skill("Steady Aim", [], 0, 3, alchemy);
    alchemy_first_row.push(steadyAim);
    let acquiredTolerance = new Skill("Acquired Tolerance", [], 0, 3, alchemy);
    alchemy_first_row.push(acquiredTolerance);
    let frenzy = new Skill("Frenzy", [], 0, 3, alchemy);
    alchemy_first_row.push(frenzy);

    let alchemy_second_row = [];
    let refreshment = new Skill("Refreshment", [], 1, 5, alchemy);
    alchemy_second_row.push(refreshment);
    let protectiveCoating = new Skill("Protective Coating", [], 1, 5, alchemy);
    alchemy_second_row.push(protectiveCoating);
    let pyrotechnics = new Skill("Pyrotechnics", [], 1, 5, alchemy);
    alchemy_second_row.push(pyrotechnics);
    let tissueTransmutation = new Skill("Tissue Transmutation", [], 1, 5, alchemy);
    alchemy_second_row.push(tissueTransmutation);
    let endurePain = new Skill("Endure Pain", [], 1, 5, alchemy);
    alchemy_second_row.push(endurePain);

    let alchemy_third_row = [];
    let delayedRecovery = new Skill("Delayed Recovery", [], 2, 3, alchemy);
    alchemy_third_row.push(delayedRecovery);
    let fixative = new Skill("Fixative", [], 2, 3, alchemy);
    alchemy_third_row.push(fixative);
    let efficiency = new Skill("Efficiency", [], 2, 5, alchemy);
    alchemy_third_row.push(efficiency);
    let synergy = new Skill("Synergy", [], 2, 5, alchemy);
    alchemy_third_row.push(synergy);
    let fastMetabolism = new Skill("Fast Metabolism", [], 2, 5, alchemy);
    alchemy_third_row.push(fastMetabolism);
    
    let alchemy_fourth_row = [];
    let sideEffects = new Skill("Side Effects", [], 3, 5, alchemy);
    alchemy_fourth_row.push(sideEffects);
    let hunterInstinct = new Skill("Hunter Instinct", [], 3, 5, alchemy);
    alchemy_fourth_row.push(hunterInstinct);
    let clusterBombs = new Skill("Cluster Bombs", [], 3, 5, alchemy);
    alchemy_fourth_row.push(clusterBombs);
    let adaption = new Skill("Adaption", [], 3, 5, alchemy);
    alchemy_fourth_row.push(adaption);
    let killingSpree = new Skill("Killing Spree", [], 3, 5, alchemy);
    alchemy_fourth_row.push(killingSpree);

    let general_row = [];
    let sunAndStars = new Skill("Sun and Stars", [], 0, 1, general);
    general_row.push(sunAndStars);
    let survivalInstinct = new Skill("Surival Instinct", [], 0, 1, general);
    general_row.push(survivalInstinct);
    let catSchoolTechniques = new Skill("Cat School Techniques", [], 0, 1, general);
    general_row.push(catSchoolTechniques);
    let griffinSchoolTechniques = new Skill("Griffin School Techniques", [], 0, 1, general);
    general_row.push(griffinSchoolTechniques);
    let bearSchoolTechniques = new Skill("Bear School Techniques", [], 0, 1, general);
    general_row.push(bearSchoolTechniques);

    let steadyShot = new Skill("Steady Shot", [], 0, 1, general);
    general_row.push(steadyShot);
    let rageManagement = new Skill("Rage Management", [], 0, 1, general);
    general_row.push(rageManagement);
    let focusGen = new Skill("Focus", [], 0, 1, general);
    general_row.push(focusGen);
    let adrenalineBurst = new Skill("Adrenaline Burst", [], 0, 1, general);
    general_row.push(adrenalineBurst);
    let metabolismControl = new Skill("Metabolism Control", [], 0, 1, general);
    general_row.push(metabolismControl);

    tree.skills = tree.skills.concat(combat_first_row, signs_first_row, alchemy_first_row, general_row);
    return tree;
}

const tree = createTree();
console.log(tree);

//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/
