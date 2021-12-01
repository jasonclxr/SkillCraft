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

class MCTSNode {
    constructor(parent, parent_action, untried_skills) {
        this.parent = parent;
        this.parent_action = parent_action;
        this.untried_skills = untried_skills;
        this.child_nodes = new Map();
        this.visits = 0;
        this.score = 0;
    }
}

export class Simulator {
    nextState(skill_tree, skill_name) {
        let new_tree = new SkillTree(skill_tree.skills, skill_tree.points_remaining, skill_tree.attribute_values, skill_tree.combat_count, skill_tree.combat_row, skill_tree.signs_count, skill_tree.signs_row, skill_tree.alchemy_count, skill_tree.alchemy_row);
        new_tree.addPoint(skill_name);
        return new_tree;
    }

    legalActions(skill_tree) {
        let legal_actions = [];
        for (let [key, value] of skill_tree.skills.entries()) {
            if (skill_tree.isLegal(key)) {
                legal_actions.push(key);
            }
        }
        return legal_actions;
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
    constructor(skills, points_remaining, attribute_values, combat_count, combat_row, signs_count, signs_row, alchemy_count, alchemy_row) {
        this.skills = skills;
        this.points_remaining = points_remaining;
        this.attribute_values = attribute_values;
        this.combat_count = combat_count;
        this.combat_row = combat_row;
        this.signs_count = signs_count;
        this.signs_row = signs_row;
        this.alchemy_count = alchemy_count;
        this.alchemy_row = alchemy_row;
    }

    addPoint(skill_name) {
        if (this.skills.get(skill_name).is_legal()) {
            this.skills.get(skill_name).points += 1;
            let branch_name = this.skills.get(skill_name).branch;
            if (branch_name === "combat") {
                this.combat_count++;
                if (this.combat_count >= 30) {
                    this.combat_row = 3;
                } else if (this.combat_count >= 20) {
                    this.combat_row = 2;
                } else if (this.combat_count >= 8) {
                    this.combat_row = 1;
                } else {
                    this.combat_row = 0;
                }
            } else if (branch_name === "signs") {
                this.signs_count++;
                if (this.signs_count >= 28) {
                    this.signs_row = 3;
                } else if (this.signs_count >= 18) {
                    this.signs_row = 2;
                } else if (this.signs_count >= 6) {
                    this.signs_row = 1;
                } else {
                    this.signs_row = 0;
                }
            } else if (branch_name === "alchemy") {
                this.alchemy_count++;
                if (this.alchemy_count >= 28) {
                    this.alchemy_row = 3;
                } else if (this.alchemy_count >= 20) {
                    this.alchemy_row = 2;
                } else if (this.alchemy_count >= 8) {
                    this.alchemy_row = 1;
                } else {
                    this.alchemy_row = 0;
                }
            }
            this.points_remaining -= 1;
        }
    }

    isLegal(skill_name) {
        let skill = this.skills.get(skill_name);
        if (skill.is_legal() === false) {
            return false;
        }
        let branch_name = skill.branch;
        if (branch_name === "general") {
            return true;
        }
        if (branch_name === "combat") {
            if (skill.row > this.combat_row) {
                return false;
            }
        }
        else if (branch_name === "signs") {
            if (skill.row > this.signs_row) {
                return false;
            }
        }
        else if (branch_name === "alchemy") {
            if (skill.row > this.alchemy_row) {
                return false;
            }
        }
        return true;
    }
};

export class MCTS {
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
            let new_action = node.untried_skills[move_index];
            skill_tree = this.simulator.nextState(skill_tree, new_action);
            new_node = new MCTSNode(node, new_action, simulator.legalActions(skill_tree));
            node.untried_skills.splice(move_index, 1);
            node.child_nodes.set(new_action, new_node);
        }
        return new_node;
    }

    // Selects random skills until points are depleted
    rollout(skill_tree) {
        //console.log(skill_tree);
        while (this.simulator.isEnded(skill_tree) !== true) {
            //instead of random we should choose a random skill with a bias towards what they want
            var legal_actions = this.simulator.legalActions(skill_tree);
            var move_index = Math.floor(Math.random() * legal_actions.length);
            skill_tree = this.simulator.nextState(skill_tree, legal_actions[move_index]);
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
        let root_node = new MCTSNode(null, null, this.simulator.legalActions(skill_tree));
        for (let step = 0; step < this.num_nodes; step++) {
            let sampled_tree = skill_tree;
            let node = root_node;
            node = this.traverse_nodes(node);
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
        let maximum_score = -1;
        let action = null;
        for (let [key, skill_node] of root_node.child_nodes) {
            if (skill_node.score > maximum_score) {
                maximum_score = skill_node.score;
                action = key;
            }
        }
        return action;
    }

}

export function createTree() {

    var tree = new SkillTree(new Map(), 50, {
        "crits": 0,
        "melee": 0,
        "ranged": 0,
        "adrenaline": 0
    }, 0, 0, 0, 0, 0, 0);

    let muscleMemory = new Skill("Muscle Memory", [], 0, 5, "combat");
    tree.skills.set("Muscle Memory", muscleMemory);
    let strengthTraining = new Skill("Strength Training", [], 0, 5,);
    tree.skills.set("Strength Training", strengthTraining);
    let arrowDeflection = new Skill("Arrow Deflection", [], 0, 3, "combat");
    tree.skills.set("Arrow Deflection", arrowDeflection);
    let lightningReflexes = new Skill("Lightning Reflexes", [], 0, 3, "combat");
    tree.skills.set("Lightning Reflexes", lightningReflexes);
    let resolve = new Skill("Resolve", [], 0, 5, "combat");
    tree.skills.set("Resolve", resolve);

    let preciseBlows = new Skill("Precise Blows", [], 1, 5, "combat");
    tree.skills.set("Precise Blows", preciseBlows);
    let crushingBlows = new Skill("Crushing Blows", [], 1, 5, "combat");
    tree.skills.set("Crushing Blows", crushingBlows);
    let fleetFooted = new Skill("Fleet Footed", [], 1, 5, "combat");
    tree.skills.set("Fleet Footed", fleetFooted);
    let coldBlood = new Skill("Cold Blood", [], 1, 5, "combat");
    tree.skills.set("Cold Blood", coldBlood);
    let undying = new Skill("Undying", [], 1, 5, "combat");
    tree.skills.set("Undying", undying);

    let whirl = new Skill("Whirl", [], 2, 5, "combat");
    tree.skills.set("Whirl", whirl);
    let rend = new Skill("Crushing Blows", [], 2, 5, "combat");
    tree.skills.set("Rend", rend);
    let counterAttack = new Skill("Counter Attack", [], 2, 3, "combat");
    tree.skills.set("Counter Attack", counterAttack);
    let anatomicalKnowledge = new Skill("Anatomical Knowledge", [], 2, 5, "combat");
    tree.skills.set("Anatomical Knowledge", anatomicalKnowledge);
    let razorFocus = new Skill("Razor Focus", [], 2, 5, "combat");
    tree.skills.set("Razor Focus", razorFocus);

    let cripplingStrikes = new Skill("Crippling Strikes", [], 3, 5, "combat");
    tree.skills.set("Crippling Strikes", cripplingStrikes);
    let sunderArmor = new Skill("Sunder Armor", [], 3, 5, "combat");
    tree.skills.set("Sunder Armor", sunderArmor);
    let deadlyPrecision = new Skill("Deadly Precision", [], 3, 2, "combat");
    tree.skills.set("Deadly Precision", deadlyPrecision);
    let cripplingShot = new Skill("Crippling Shot", [], 3, 5, "combat");
    tree.skills.set("Crippling Shot", cripplingShot);
    let floodOfAnger = new Skill("Flood of Anger", [], 3, 5, "combat");
    tree.skills.set("Flood of Anger", floodOfAnger);

    let farReachingAard = new Skill("Far Reaching Aard", [], 0, 3, "signs");
    tree.skills.set("Far Reaching Aard", farReachingAard);
    let meltArmor = new Skill("Strength Training", [], 0, 5, "signs");
    tree.skills.set("Melt Armor", meltArmor);
    let sustainedGlyphs = new Skill("Sustained Glyphs", [], 0, 2, "signs");
    tree.skills.set("Sustained Glyphs", sustainedGlyphs);
    let explodingShield = new Skill("Exploding Shield", [], 0, 3, "signs");
    tree.skills.set("Exploding Shield", explodingShield);
    let delusion = new Skill("Delusion", [], 0, 3, "signs");
    tree.skills.set("Delusion", delusion);

    let aardSweep = new Skill("Aard Sweep", [], 1, 3, "signs");
    tree.skills.set("Aard Sweep", aardSweep);
    let firestream = new Skill("Firestream", [], 1, 3, "signs");
    tree.skills.set("Firestream", firestream);
    let magicTrap = new Skill("Magic Trap", [], 1, 3, "signs");
    tree.skills.set("Magic Trap", magicTrap);
    let activeShield = new Skill("Active Shield", [], 1, 3, "signs");
    tree.skills.set("Active Shield", activeShield);
    let puppet = new Skill("Puppet", [], 1, 3, "signs");
    tree.skills.set("Puppet", puppet);

    let aardIntensity = new Skill("Aard Intensity", [], 2, 5, "signs");
    tree.skills.set("Aard Intensity", aardIntensity);
    let igniIntensity = new Skill("Igni Intensity", [], 2, 5, "signs");
    tree.skills.set("Igni Intensity", igniIntensity);
    let yrdenIntensity = new Skill("Yrden Intensity", [], 2, 5, "signs");
    tree.skills.set("Yrden Intensity", yrdenIntensity);
    let quenIntensity = new Skill("Quen Intensity", [], 2, 5, "signs");
    tree.skills.set("Quen Intensity", quenIntensity);
    let axiiIntensity = new Skill("Razor Focus", [], 2, 5, "signs");
    tree.skills.set("Axii Intensity", axiiIntensity);

    let shockWave = new Skill("Shock Wave", [], 3, 5, "signs");
    tree.skills.set("Shock Wave", shockWave);
    let pyromanica = new Skill("Pyromanica", [], 3, 5, "signs");
    tree.skills.set("Pyromanica", pyromanica);
    let superchargedGlyphs = new Skill("Supercharged Glyphs", [], 3, 5, "signs");
    tree.skills.set("Supercharged Glyphs", superchargedGlyphs);
    let quenDischarge = new Skill("Quen Discharge", [], 3, 5, "signs");
    tree.skills.set("Quen Discharge", quenDischarge);
    let domination = new Skill("Domination", [], 3, 3, "signs");
    tree.skills.set("Domination", domination);

    let heightenedTolerance = new Skill("Heightened Tolerance", [], 0, 5, "alchemy");
    tree.skills.set("Heightened Tolerance", heightenedTolerance);
    let poisonedBlades = new Skill("Poisoned Blades", [], 0, 5, "alchemy");
    tree.skills.set("Poisoned Blades", poisonedBlades);
    let steadyAim = new Skill("Steady Aim", [], 0, 3, "alchemy");
    tree.skills.set("Steady Aim", steadyAim);
    let acquiredTolerance = new Skill("Acquired Tolerance", [], 0, 3, "alchemy");
    tree.skills.set("Acquired Tolerance", acquiredTolerance);
    let frenzy = new Skill("Frenzy", [], 0, 3, "alchemy");
    tree.skills.set("Frenzy", frenzy);

    let refreshment = new Skill("Refreshment", [], 1, 5, "alchemy");
    tree.skills.set("Refreshment", refreshment);
    let protectiveCoating = new Skill("Protective Coating", [], 1, 5, "alchemy");
    tree.skills.set("Protective Coating", protectiveCoating);
    let pyrotechnics = new Skill("Pyrotechnics", [], 1, 5, "alchemy");
    tree.skills.set("Pyrotechnics", pyrotechnics);
    let tissueTransmutation = new Skill("Tissue Transmutation", [], 1, 5, "alchemy");
    tree.skills.set("Tissue Transmutation", tissueTransmutation);
    let endurePain = new Skill("Endure Pain", [], 1, 5, "alchemy");
    tree.skills.set("Endure Pain", endurePain);

    let delayedRecovery = new Skill("Delayed Recovery", [], 2, 3, "alchemy");
    tree.skills.set("Delayed Recovery", delayedRecovery);
    let fixative = new Skill("Fixative", [], 2, 3, "alchemy");
    tree.skills.set("Fixative", fixative);
    let efficiency = new Skill("Efficiency", [], 2, 5, "alchemy");
    tree.skills.set("Efficiency", efficiency);
    let synergy = new Skill("Synergy", [], 2, 5, "alchemy");
    tree.skills.set("Synergy", synergy);
    let fastMetabolism = new Skill("Fast Metabolism", [], 2, 5, "alchemy");
    tree.skills.set("Fast Metabolism", fastMetabolism);

    let sideEffects = new Skill("Side Effects", [], 3, 5, "alchemy");
    tree.skills.set("Side Effects", sideEffects);
    let hunterInstinct = new Skill("Hunter Instinct", [], 3, 5, "alchemy");
    tree.skills.set("Hunter Instinct", hunterInstinct);
    let clusterBombs = new Skill("Cluster Bombs", [], 3, 5, "alchemy");
    tree.skills.set("Cluster Bombs", clusterBombs);
    let adaption = new Skill("Adaption", [], 3, 5, "alchemy");
    tree.skills.set("Adaption", adaption);
    let killingSpree = new Skill("Killing Spree", [], 3, 5, "alchemy");
    tree.skills.set("Killing Spree", killingSpree);

    let sunAndStars = new Skill("Sun and Stars", [], 0, 1, "general");
    tree.skills.set("Sun and Stars", sunAndStars);
    let survivalInstinct = new Skill("Surival Instinct", [], 0, 1, "general");
    tree.skills.set("Survival Instinct", survivalInstinct);
    let catSchoolTechniques = new Skill("Cat School Techniques", [], 0, 1, "general");
    tree.skills.set("Cat School Techniques", catSchoolTechniques);
    let griffinSchoolTechniques = new Skill("Griffin School Techniques", [], 0, 1, "general");
    tree.skills.set("Griffin School Techniques", griffinSchoolTechniques);
    let bearSchoolTechniques = new Skill("Bear School Techniques", [], 0, 1, "general");
    tree.skills.set("Bear School Techniques", bearSchoolTechniques);

    let steadyShot = new Skill("Steady Shot", [], 0, 1, "general");
    tree.skills.set("Steady Shot", steadyShot);
    let rageManagement = new Skill("Rage Management", [], 0, 1, "general");
    tree.skills.set("Rage Management", rageManagement);
    let focusGen = new Skill("Focus", [], 0, 1, "general");
    tree.skills.set("Focus", focusGen);
    let adrenalineBurst = new Skill("Adrenaline Burst", [], 0, 1, "general");
    tree.skills.set("Adrenaline Burst", adrenalineBurst);
    let metabolismControl = new Skill("Metabolism Control", [], 0, 1, "general");
    tree.skills.set("Metabolism Control", metabolismControl);

    return tree;
}

const tree = createTree();
const simulator = new Simulator();
const mcts = new MCTS(100, 2, simulator);
mcts.rollout(tree);
console.log(tree);

//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/
