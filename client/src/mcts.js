// Note: might want to consider max win rates of children nodes

// skill == action
class Skill {
    constructor(name, tags, row, maxPoints, branch) {
        this.name = name;
        this.tags = tags;
        this.row = row;
        this.points = 0;
        this.maxPoints = maxPoints;
        this.branch = branch;
    }

    is_legal() {
        return this.points < this.maxPoints;
    }
    
};

class Node {
    constructor(parent, parent_action, untried_skills) {
        this.parent = parent;
        this.parent_action = parent_action;
        this.untried_skills = untried_skills;
        this.child_nodes = new Map();
        this.visits = 0;
        this.score = 0;
    }
}

class Simulator {
    nextState(skill_tree, skill_index) {
        let new_tree = new SkillTree(skill_tree.skills, skill_tree.points_remaining, skill_tree.rows);
        if (new_tree.skills[skill_index].is_legal()) {
            new_tree.skills[skill_index].points += 1;
            new_tree.rows[new_tree.skills[skill_index].branch.name].addPoint();
            if (new_tree.skills[skill_index].points === new_tree.skills[skill_index].maxPoints) {
                new_tree.skills.splice(skill_index, 1);
            }
            new_tree.points_remaining -= 1;
        }
        return new_tree;
    }

    legalActions(skill_tree) {
        return skill_tree.skills();
    }

    isEnded(skill_tree) {
        if (skill_tree.points_remaining === 0) {
            return true;
        }
        return false;
    }

    getScore(skill_tree) {
        return 1;
    }
}

class SkillTree {
    constructor(skills, points_remaining, rows, attribute_values) {
        this.skills = skills;
        this.points_remaining = points_remaining;
        this.rows = rows;
        this.attribute_values = attribute_values;
    }

    addPoint(skill_index) {
        if (this.skills[skill_index].is_legal()) {
            this.skills[skill_index].points += 1;
            this.rows[this.skills[skill_index].branch.name].addPoint();
            if (this.skills[skill_index].points === this.skills[skill_index].maxPoints) {
                this.skills.splice(skill_index, 1);
            }
            this.points_remaining -= 1;
        }
    }
};

class Branch {
    constructor(name, row_costs) {
        this.name = name;
        this.row_costs = row_costs;
        this.points = 0; 
        this.current_row = 0;
    }

    addPoint() {
        this.points += 1;
        if (this.current_row + 1 < this.row_costs.length && this.points >= this.row_costs[this.current_row + 1]) {
            this.current_row += 1;
        }
    }
}

class MCTS {
    constructor(num_nodes, explore_factor, simulator) {
        this.num_nodes = num_nodes;
        this.explore_factor = explore_factor;
        this.simulator = simulator;
    }

    // Traverse graph using UCT function until leaf node is reached
    traverse_nodes(node) {
        let current_node = node;
        while (current_node.untried_skills.length > 0 && current_node.child_nodes.size > 0) {
            let max_uct = -1;
            let max_uct_node = current_node;
            for (let child_node of current_node.child_nodes.values()) {
                let uct = child_node.score / child_node.visits + this.explore_factor * Math.sqrt(Math.log(node.parent.visits) / child_node.visits);
                if (uct > max_uct) {
                    max_uct = uct;
                    max_uct_node = child_node;
                }
            }
            current_node = max_uct_node;
        }
        return current_node;
    }

    // Adds a new leaf to the tree by creating a new child node for the given node.
    expand_leaf(node, skill_tree) {
        let new_node = node;
        if (node.untried_skills.length > 0) {
            let move_index = Math.floor(Math.random() * node.untried_skills.length);
            //let new_action = JSON.parse(JSON.stringify(node.untried_skills[move_index]));
            skill_tree = this.simulator.nextState(skill_tree, move_index);
            new_node = new Node(node, move_index, simulator.legalActions(skill_tree));
            node.untried_skills.splice(move_index, 1);
            node.child_nodes.set(move_index, new_node);
        }
        return new_node;
    }

    // Selects random skills until points are depleted
    rollout(skill_tree) {
        while(skill_tree.isEnded !== true) {
            //instead of random we should choose a random skill with a bias towards what they want
            var skill_index = Math.floor(Math.random() * this.tree.skills.length); 
            skill_tree = this.simulator.nextState(skill_tree, skill_index);
        }
        return this.simulator.getScore(skill_tree);
    }

    // Propagate result back through the graph
    backpropagate(node, score) {
        while (node.parent !== null) {
            node.visits += 1;
            node.score += score;
            node = node.parent;
        }
        node.score += score;
        node.visits += 1;
        return node;
    }

    // Performs MCTS by sampling games and returns the action
    think(skill_tree) {
        let root_node = new Node(null, this.simulator.legalActions(skill_tree));
        for (let step = 0; step < this.num_nodes; step++) {
            let sampled_tree = skill_tree;
            let node = root_node;
            node = this.traverse_nodes(node, sampled_tree);
            let chosen_node = node;
            let chosen_actions = [];
            while (chosen_node.parent !== null) {
                chosen_actions.push(chosen_node.parent_action);
                chosen_node = chosen_node.parent;
            }
            for (let i = chosen_actions.length - 1; i >= 0; i--) {
                sampled_tree = this.simulator.nextState(sampled_tree, chosen_actions[i]);
            }
            if (sampled_tree.isEnded() !== true) {
                node = this.expand_leaf(node, sampled_tree);
                sampled_tree = this.simulator.nextState(sampled_tree, node.parent_action);
                let score = this.rollout(sampled_tree);
                this.backpropagate(node, score);
            }
        }
    }

}

function createTree() {
    var combat = new Branch("combat", [0, 8, 20, 30]);
    var signs = new Branch("signs", [0, 6, 18, 28]);
    var alchemy = new Branch("alchemy", [0, 8, 20, 28]);
    var general = new Branch("general", [0]);

    var tree_rows = {"combat": combat, "signs": signs, "alchemy": alchemy, "general": general};

    var tree = new SkillTree([], 50, tree_rows, {"crits": 0,
        "melee": 0,
        "ranged": 0,
        "adrenaline": 0});

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
const simulator = new Simulator();
const mcts = new MCTS(100, 2, simulator);
mcts.rollout();
console.log(tree);

//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/
