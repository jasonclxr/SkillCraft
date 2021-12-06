const copier = require('lodash');
class Skill {
    constructor(name, attribute, row, maxPoints, branch) {
        this.name = name;
        this.attribute = attribute;
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

class Simulator {
    constructor(desired_skills = {}) {
        this.healing_sim = desired_skills.healing ?? 0;
        this.close_range_sim = desired_skills.close_range ?? 0;
        this.ranged_sim = desired_skills.ranged ?? 0;
        this.adrenaline_sim = desired_skills.adrenaline ?? 0;
        this.defense_sim = desired_skills.defense ?? 0;
        this.unique_sim = desired_skills.unique ?? 90;
    }
    nextState(skill_tree, skill_name) {
        let new_tree = SkillTree.from(skill_tree);
        new_tree.addPoint(skill_name);
        return new_tree;
    }

    legalActions(skill_tree) {
        let legal_actions = [];
        if (skill_tree.points_remaining === 0) {
            return legal_actions;
        }
        for (let [key] of skill_tree.skills.entries()) {
            if (skill_tree.isLegal(key)) {
                legal_actions.push(key);
            }
        }
        return legal_actions;
    }

    isEnded(skill_tree) {
        return skill_tree.points_remaining < 1;
    }

    getScore(skill_tree) {
        let total = skill_tree.healing_count + skill_tree.close_range_count + skill_tree.ranged_count + skill_tree.adrenaline_count + skill_tree.defense_count + skill_tree.unique_count;
        let healing = 100 * skill_tree.healing_count / total;
        let close_range = 100 * skill_tree.close_range_count / total;
        let ranged = 100 * skill_tree.ranged_count / total;
        let adrenaline = 100 * skill_tree.adrenaline_count / total;
        let defense = 100 * skill_tree.defense_count / total;
        let unique = 100 * skill_tree.unique_count / total;
        healing = Math.pow((healing - this.healing_sim), 2);
        close_range = Math.pow((close_range - this.close_range_sim), 2);
        ranged = Math.pow((ranged - this.ranged_sim), 2);
        adrenaline = Math.pow((adrenaline - this.adrenaline_sim), 2);
        defense = Math.pow((defense - this.defense_sim), 2);
        unique = Math.pow((unique - this.unique_sim), 2);
        return Math.pow((healing + close_range + ranged + adrenaline + defense + unique), 0.5);
    }
}

class SkillTree {
    constructor(skills, points_remaining, combat_count, combat_row, signs_count, signs_row, alchemy_count, alchemy_row, healing_count, close_range_count, ranged_count, adrenaline_count, defense_count, unique_count) {
        this.skills = skills;
        this.points_remaining = points_remaining;
        this.combat_count = combat_count;
        this.combat_row = combat_row;
        this.signs_count = signs_count;
        this.signs_row = signs_row;
        this.alchemy_count = alchemy_count;
        this.alchemy_row = alchemy_row;
        this.healing_count = healing_count;
        this.close_range_count = close_range_count;
        this.ranged_count = ranged_count;
        this.adrenaline_count = adrenaline_count;
        this.defense_count = defense_count;
        this.unique_count = unique_count;
    }

    static from(skill_tree) {
        return new SkillTree(copier.cloneDeep(skill_tree.skills), skill_tree.points_remaining, skill_tree.combat_count, skill_tree.combat_row, skill_tree.signs_count, skill_tree.signs_row, skill_tree.alchemy_count, skill_tree.alchemy_row, skill_tree.healing_count, skill_tree.close_range_count, skill_tree.ranged_count, skill_tree.adrenaline_count, skill_tree.defense_count, skill_tree.unique_count);
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
            this.addAttribute(skill_name);
        }
    }

    addAttribute(skill_name) {
        let attr_code = this.skills.get(skill_name).attribute;
        switch (attr_code) {
            case Attributes.HEALING:
                this.healing_count++;
                break;
            case Attributes.CLOSE_RANGE:
                this.close_range_count++;
                break;
            case Attributes.RANGED:
                this.ranged_count++;
                break;
            case Attributes.ADRENALINE:
                this.adrenaline_count++;
                break;
            case Attributes.DEFENSE:
                this.defense_count++;
                break;
            case Attributes.UNIQUE:
                this.unique_count++;
                break;
            default:
                console.error("Attribute does not exist");
                break;
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

class MCTS {
    constructor(num_nodes, explore_factor, simulator) {
        this.num_nodes = num_nodes;
        this.explore_factor = explore_factor;
        this.simulator = simulator;
    }
    // Traverse graph using UCT function until leaf node is reached
    traverse_nodes(node) {
        let current_node = node;
        let max_uct_node = current_node;
        while (current_node.untried_skills.length > 0 && current_node.child_nodes.size > 0) {
            let max_uct = -Infinity;
            for (let child_node of current_node.child_nodes.values()) {
                let uct = -Infinity;
                if (node.parent === null) {
                    uct = 1 - child_node.score / child_node.visits;
                } else {
                    uct = (1 - (child_node.score / child_node.visits)) + this.explore_factor * 2 * Math.sqrt(Math.log(child_node.parent.visits) / child_node.visits);
                }
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
            //add logic for incrementing attributes count
            new_node = new MCTSNode(node, new_action, this.simulator.legalActions(skill_tree));
            if (skill_tree.skills.get(node.untried_skills[move_index]).is_legal() === false) {
                node.untried_skills.splice(move_index, 1);
            }
            node.child_nodes.set(new_action, new_node);
        }
        return new_node;
    }

    // Selects random skills until points are depleted
    rollout(skill_tree) {
        while (this.simulator.isEnded(skill_tree) !== true) {
            var legal_actions = this.simulator.legalActions(skill_tree);
            var move_index = Math.floor(Math.random() * legal_actions.length);
            skill_tree = this.simulator.nextState(skill_tree, legal_actions[move_index]);
        }
        return this.simulator.getScore(skill_tree);
    }

    // Propagate result back through the graph
    // Calculate differences between given fractions and fractions found
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
        let sampled_tree = skill_tree;
        let node = root_node;
        for (let step = 0; step < 500; step++) {
            sampled_tree = skill_tree;
            node = root_node;
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
            if (this.simulator.isEnded(sampled_tree) !== true) {
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

const Attributes = Object.freeze({
    HEALING: Symbol("Healing"),
    CLOSE_RANGE: Symbol("Melee"),
    RANGED: Symbol("Ranged"),
    ADRENALINE: Symbol("Adrenaline"),
    DEFENSE: Symbol("Defense"),
    UNIQUE: Symbol("Unique")
});

function createTree(num_points = 50) {

    var tree = new SkillTree(new Map(), num_points, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)

    let muscleMemory = new Skill("Muscle Memory", Attributes.CLOSE_RANGE, 0, 5, "combat");
    tree.skills.set("Muscle Memory", muscleMemory);
    let strengthTraining = new Skill("Strength Training", Attributes.CLOSE_RANGE, 0, 5, "combat");
    tree.skills.set("Strength Training", strengthTraining);
    let arrowDeflection = new Skill("Arrow Deflection", Attributes.DEFENSE, 0, 3, "combat");
    tree.skills.set("Arrow Deflection", arrowDeflection);
    let lightningReflexes = new Skill("Lightning Reflexes", Attributes.RANGED, 0, 3, "combat");
    tree.skills.set("Lightning Reflexes", lightningReflexes);
    let resolve = new Skill("Resolve", Attributes.ADRENALINE, 0, 5, "combat");
    tree.skills.set("Resolve", resolve);

    let preciseBlows = new Skill("Precise Blows", Attributes.CLOSE_RANGE, 1, 5, "combat");
    tree.skills.set("Precise Blows", preciseBlows);
    let crushingBlows = new Skill("Crushing Blows", Attributes.CLOSE_RANGE, 1, 5, "combat");
    tree.skills.set("Crushing Blows", crushingBlows);
    let fleetFooted = new Skill("Fleet Footed", Attributes.DEFENSE, 1, 5, "combat");
    tree.skills.set("Fleet Footed", fleetFooted);
    let coldBlood = new Skill("Cold Blood", Attributes.ADRENALINE, 1, 5, "combat");
    tree.skills.set("Cold Blood", coldBlood);
    let undying = new Skill("Undying", Attributes.HEALING, 1, 5, "combat");
    tree.skills.set("Undying", undying);

    let whirl = new Skill("Whirl", Attributes.CLOSE_RANGE, 2, 5, "combat");
    tree.skills.set("Whirl", whirl);
    let rend = new Skill("Crushing Blows", Attributes.CLOSE_RANGE, 2, 5, "combat");
    tree.skills.set("Rend", rend);
    let counterAttack = new Skill("Counter Attack", Attributes.DEFENSE, 2, 3, "combat");
    tree.skills.set("Counter Attack", counterAttack);
    let anatomicalKnowledge = new Skill("Anatomical Knowledge", Attributes.RANGED, 2, 5, "combat");
    tree.skills.set("Anatomical Knowledge", anatomicalKnowledge);
    let razorFocus = new Skill("Razor Focus", Attributes.ADRENALINE, 2, 5, "combat");
    tree.skills.set("Razor Focus", razorFocus);

    let cripplingStrikes = new Skill("Crippling Strikes", Attributes.CLOSE_RANGE, 3, 5, "combat");
    tree.skills.set("Crippling Strikes", cripplingStrikes);
    let sunderArmor = new Skill("Sunder Armor", Attributes.UNIQUE, 3, 5, "combat");
    tree.skills.set("Sunder Armor", sunderArmor);
    let deadlyPrecision = new Skill("Deadly Precision", Attributes.ADRENALINE, 3, 2, "combat");
    tree.skills.set("Deadly Precision", deadlyPrecision);
    let cripplingShot = new Skill("Crippling Shot", Attributes.RANGED, 3, 5, "combat");
    tree.skills.set("Crippling Shot", cripplingShot);
    let floodOfAnger = new Skill("Flood of Anger", Attributes.ADRENALINE, 3, 5, "combat");
    tree.skills.set("Flood of Anger", floodOfAnger);

    let farReachingAard = new Skill("Far Reaching Aard", Attributes.DEFENSE, 0, 3, "signs");
    tree.skills.set("Far Reaching Aard", farReachingAard);
    let meltArmor = new Skill("Strength Training", Attributes.CLOSE_RANGE, 0, 5, "signs");
    tree.skills.set("Melt Armor", meltArmor);
    let sustainedGlyphs = new Skill("Sustained Glyphs", Attributes.UNIQUE, 0, 2, "signs");
    tree.skills.set("Sustained Glyphs", sustainedGlyphs);
    let explodingShield = new Skill("Exploding Shield", Attributes.DEFENSE, 0, 3, "signs");
    tree.skills.set("Exploding Shield", explodingShield);
    let delusion = new Skill("Delusion", Attributes.UNIQUE, 0, 3, "signs");
    tree.skills.set("Delusion", delusion);

    let aardSweep = new Skill("Aard Sweep", Attributes.DEFENSE, 1, 3, "signs");
    tree.skills.set("Aard Sweep", aardSweep);
    let firestream = new Skill("Firestream", Attributes.CLOSE_RANGE, 1, 3, "signs");
    tree.skills.set("Firestream", firestream);
    let magicTrap = new Skill("Magic Trap", Attributes.UNIQUE, 1, 3, "signs");
    tree.skills.set("Magic Trap", magicTrap);
    let activeShield = new Skill("Active Shield", Attributes.DEFENSE, 1, 3, "signs");
    tree.skills.set("Active Shield", activeShield);
    let puppet = new Skill("Puppet", Attributes.UNIQUE, 1, 3, "signs");
    tree.skills.set("Puppet", puppet);

    let aardIntensity = new Skill("Aard Intensity", Attributes.DEFENSE, 2, 5, "signs");
    tree.skills.set("Aard Intensity", aardIntensity);
    let igniIntensity = new Skill("Igni Intensity", Attributes.CLOSE_RANGE, 2, 5, "signs");
    tree.skills.set("Igni Intensity", igniIntensity);
    let yrdenIntensity = new Skill("Yrden Intensity", Attributes.UNIQUE, 2, 5, "signs");
    tree.skills.set("Yrden Intensity", yrdenIntensity);
    let quenIntensity = new Skill("Quen Intensity", Attributes.DEFENSE, 2, 5, "signs");
    tree.skills.set("Quen Intensity", quenIntensity);
    let axiiIntensity = new Skill("Razor Focus", Attributes.UNIQUE, 2, 5, "signs");
    tree.skills.set("Axii Intensity", axiiIntensity);

    let shockWave = new Skill("Shock Wave", Attributes.DEFENSE, 3, 5, "signs");
    tree.skills.set("Shock Wave", shockWave);
    let pyromaniac = new Skill("Pyromaniac", Attributes.CLOSE_RANGE, 3, 5, "signs");
    tree.skills.set("Pyromaniac", pyromaniac);
    let superchargedGlyphs = new Skill("Supercharged Glyphs", Attributes.UNIQUE, 3, 5, "signs");
    tree.skills.set("Supercharged Glyphs", superchargedGlyphs);
    let quenDischarge = new Skill("Quen Discharge", Attributes.DEFENSE, 3, 5, "signs");
    tree.skills.set("Quen Discharge", quenDischarge);
    let domination = new Skill("Domination", Attributes.UNIQUE, 3, 3, "signs");
    tree.skills.set("Domination", domination);

    let heightenedTolerance = new Skill("Heightened Tolerance", Attributes.HEALING, 0, 5, "alchemy");
    tree.skills.set("Heightened Tolerance", heightenedTolerance);
    let poisonedBlades = new Skill("Poisoned Blades", Attributes.CLOSE_RANGE, 0, 5, "alchemy");
    tree.skills.set("Poisoned Blades", poisonedBlades);
    let steadyAim = new Skill("Steady Aim", Attributes.RANGED, 0, 3, "alchemy");
    tree.skills.set("Steady Aim", steadyAim);
    let acquiredTolerance = new Skill("Acquired Tolerance", Attributes.UNIQUE, 0, 3, "alchemy");
    tree.skills.set("Acquired Tolerance", acquiredTolerance);
    let frenzy = new Skill("Frenzy", Attributes.DEFENSE, 0, 3, "alchemy");
    tree.skills.set("Frenzy", frenzy);

    let refreshment = new Skill("Refreshment", Attributes.HEALING, 1, 5, "alchemy");
    tree.skills.set("Refreshment", refreshment);
    let protectiveCoating = new Skill("Protective Coating", Attributes.DEFENSE, 1, 5, "alchemy");
    tree.skills.set("Protective Coating", protectiveCoating);
    let pyrotechnics = new Skill("Pyrotechnics", Attributes.RANGED, 1, 5, "alchemy");
    tree.skills.set("Pyrotechnics", pyrotechnics);
    let tissueTransmutation = new Skill("Tissue Transmutation", Attributes.HEALING, 1, 5, "alchemy");
    tree.skills.set("Tissue Transmutation", tissueTransmutation);
    let endurePain = new Skill("Endure Pain", Attributes.HEALING, 1, 5, "alchemy");
    tree.skills.set("Endure Pain", endurePain);

    let delayedRecovery = new Skill("Delayed Recovery", Attributes.UNIQUE, 2, 3, "alchemy");
    tree.skills.set("Delayed Recovery", delayedRecovery);
    let fixative = new Skill("Fixative", Attributes.CLOSE_RANGE, 2, 3, "alchemy");
    tree.skills.set("Fixative", fixative);
    let efficiency = new Skill("Efficiency", Attributes.RANGED, 2, 5, "alchemy");
    tree.skills.set("Efficiency", efficiency);
    let synergy = new Skill("Synergy", Attributes.UNIQUE, 2, 5, "alchemy");
    tree.skills.set("Synergy", synergy);
    let fastMetabolism = new Skill("Fast Metabolism", Attributes.UNIQUE, 2, 5, "alchemy");
    tree.skills.set("Fast Metabolism", fastMetabolism);

    let sideEffects = new Skill("Side Effects", Attributes.HEALING, 3, 5, "alchemy");
    tree.skills.set("Side Effects", sideEffects);
    let hunterInstinct = new Skill("Hunter Instinct", Attributes.ADRENALINE, 3, 5, "alchemy");
    tree.skills.set("Hunter Instinct", hunterInstinct);
    let clusterBombs = new Skill("Cluster Bombs", Attributes.RANGED, 3, 5, "alchemy");
    tree.skills.set("Cluster Bombs", clusterBombs);
    let adaption = new Skill("Adaption", Attributes.UNIQUE, 3, 5, "alchemy");
    tree.skills.set("Adaption", adaption);
    let killingSpree = new Skill("Killing Spree", Attributes.CLOSE_RANGE, 3, 5, "alchemy");
    tree.skills.set("Killing Spree", killingSpree);

    let sunAndStars = new Skill("Sun and Stars", Attributes.HEALING, 0, 1, "general");
    tree.skills.set("Sun and Stars", sunAndStars);
    let survivalInstinct = new Skill("Survival Instinct", Attributes.HEALING, 0, 1, "general");
    tree.skills.set("Survival Instinct", survivalInstinct);
    let catSchoolTechniques = new Skill("Cat School Techniques", Attributes.CLOSE_RANGE, 0, 1, "general");
    tree.skills.set("Cat School Techniques", catSchoolTechniques);
    let griffinSchoolTechniques = new Skill("Griffin School Techniques", Attributes.DEFENSE, 0, 1, "general");
    tree.skills.set("Griffin School Techniques", griffinSchoolTechniques);
    let bearSchoolTechniques = new Skill("Bear School Techniques", Attributes.DEFENSE, 0, 1, "general");
    tree.skills.set("Bear School Techniques", bearSchoolTechniques);

    let steadyShot = new Skill("Steady Shot", Attributes.RANGED, 0, 1, "general");
    tree.skills.set("Steady Shot", steadyShot);
    let rageManagement = new Skill("Rage Management", Attributes.ADRENALINE, 0, 1, "general");
    tree.skills.set("Rage Management", rageManagement);
    let focusGen = new Skill("Focus", Attributes.ADRENALINE, 0, 1, "general");
    tree.skills.set("Focus", focusGen);
    let adrenalineBurst = new Skill("Adrenaline Burst", Attributes.ADRENALINE, 0, 1, "general");
    tree.skills.set("Adrenaline Burst", adrenalineBurst);
    let metabolismControl = new Skill("Metabolism Control", Attributes.UNIQUE, 0, 1, "general");
    tree.skills.set("Metabolism Control", metabolismControl);

    return tree;
}

function generateSkills(desired_skills, num_points, mcts_tree = null) {
    mcts_tree = mcts_tree ?? createTree(num_points);
    mcts_tree.points_remaining = num_points;
    const simulator = new Simulator(desired_skills);
    const mcts = new MCTS(10, 2, simulator);
    for (let i = 0; i < num_points; i++) {
        let skill = mcts.think(mcts_tree);
        mcts_tree = simulator.nextState(mcts_tree, skill);
    }
    return mcts_tree;
}

exports.generateSkills = generateSkills;
exports.createTree = createTree;

//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/