class SkillTree {
    skills: Array<Skill>;

    constructor(skills: Array<Skill>) {
        this.skills = skills;
    }
};

class Skill {
    name: String;
    tags: Array<String>;
    points: Number;
    row: Number;
    maxPoints: Number;

    constructor(name: String, tags: Array<String>, points: number, row: Number, maxPoints: Number) {
        this.name = name;
        this.tags = tags;
        this.points = points;
        this.row = row;
        this.maxPoints = maxPoints;
    }

    is_legal() {
        return this.points <= this.maxPoints;
    }
    
};

let tree = new SkillTree([]);

let muscleMemory = new Skill("Muscle Memory", [], 0, 0, 5);
tree.skills.push(muscleMemory);
let strengthTraining = new Skill("Strength Training", [], 0, 0, 5);
tree.skills.push(strengthTraining);
let arrowDeflection = new Skill("Arrow Deflection", [], 0, 0, 3);
tree.skills.push(arrowDeflection);
let lightningReflexes = new Skill("Lightning Reflexes", [], 0, 0, 3);
tree.skills.push(lightningReflexes);
let resolve = new Skill("Resolve", [], 0, 0, 5);
tree.skills.push(resolve);

let preciseBlows = new Skill("Precise Blows", [], 0, 1, 5);
tree.skills.push(preciseBlows);
let crushingBlows = new Skill("Crushing Blows", [], 0, 1, 5);
tree.skills.push(crushingBlows);
let fleetFooted = new Skill("Fleet Footed", [], 0, 1, 5);
tree.skills.push(fleetFooted);
let coldBlood = new Skill("Cold Blood", [], 0, 1, 5);
tree.skills.push(coldBlood);
let undying = new Skill("Undying", [], 0, 1, 5);
tree.skills.push(undying);

let whirl = new Skill("Whirl", [], 0, 2, 5);
tree.skills.push(whirl);
let rend = new Skill("Crushing Blows", [], 0, 2, 5);
tree.skills.push(rend);
let counterAttack = new Skill("Counter Attack", [], 0, 2, 3);
tree.skills.push(counterAttack);
let anatomicalKnowledge = new Skill("Anatomical Knowledge", [], 0, 2, 5);
tree.skills.push(anatomicalKnowledge);
let razorFocus = new Skill("Razor Focus", [], 0, 2, 5);
tree.skills.push(razorFocus);

let cripplingStrikes = new Skill("Crippling Strikes", [], 0, 3, 5);
tree.skills.push(cripplingStrikes);
let sunderArmor = new Skill("Sunder Armor", [], 0, 3, 5);
tree.skills.push(sunderArmor);
let deadlyPrecision = new Skill("Deadly Precision", [], 0, 3, 2);
tree.skills.push(deadlyPrecision);
let cripplingShot = new Skill("Crippling Shot", [], 0, 3, 5);
tree.skills.push(cripplingShot);
let floodOfAnger = new Skill("Flood of Anger", [], 0, 3, 5);
tree.skills.push(floodOfAnger);

let farReachingAard = new Skill("Far Reaching Aard", [], 0, 0, 3);
tree.skills.push(farReachingAard);
let meltArmor = new Skill("Strength Training", [], 0, 0, 5);
tree.skills.push(meltArmor);
let sustainedGlyphs = new Skill("Sustained Glyphs", [], 0, 0, 2);
tree.skills.push(sustainedGlyphs);
let explodingShield = new Skill("Exploding Shield", [], 0, 0, 3);
tree.skills.push(explodingShield);
let delusion = new Skill("Delusion", [], 0, 0, 3);
tree.skills.push(delusion);

let aardSweep = new Skill("Aard Sweep", [], 0, 1, 3);
tree.skills.push(aardSweep);
let firestream = new Skill("Firestream", [], 0, 1, 3);
tree.skills.push(firestream);
let magicTrap = new Skill("Magic Trap", [], 0, 1, 3);
tree.skills.push(magicTrap);
let activeShield = new Skill("Active Shield", [], 0, 1, 3);
tree.skills.push(activeShield);
let puppet = new Skill("Puppet", [], 0, 1, 3);
tree.skills.push(puppet);

let aardIntensity = new Skill("Aard Intensity", [], 0, 2, 5)
let igniIntensity = new Skill("Igni Intensity", [], 0, 2, 5)
let yrdenIntensity = new Skill("Yrden Intensity", [], 0, 2, 5)
let quenIntensity = new Skill("Quen Intensity", [], 0, 2, 5)
let axiiIntensity = new Skill("Razor Focus", [], 0, 2, 5)

let shockWave = new Skill("Shock Wave", [], 0, 3, 5)
let pyromanica = new Skill("Pyromanica", [], 0, 3, 5)
let superchargedGlyphs = new Skill("Supercharged Glyphs", [], 0, 3, 5)
let quenDischarge = new Skill("Quen Discharge", [], 0, 3, 5)
let domination = new Skill("Domination", [], 0, 3, 3)

let heightenedTolerance = new Skill("Heightened Tolerance", [], 0, 0, 5)
let poisonedBlades = new Skill("Poisoned Blades", [], 0, 0, 5)
let steadyAim = new Skill("Steady Aim", [], 0, 0, 3)
let acquiredTolerance = new Skill("Acquired Tolerance", [], 0, 0, 3)
let frenzy = new Skill("Frenzy", [], 0, 0, 3)

let refreshment = new Skill("Refreshment", [], 0, 1, 5)
let protectiveCoating = new Skill("Protective Coating", [], 0, 1, 5)
let pyrotechnics = new Skill("Pyrotechnics", [], 0, 1, 5)
let tissueTransmutation = new Skill("Tissue Transmutation", [], 0, 1, 5)
let endurePain = new Skill("Endure Pain", [], 0, 1, 5)

let sunAndStars = new Skill("Sun and Stars", [], 0, 2, 3)
let survivalInstinct = new Skill("Surival Instinct", [], 0, 2, 3)
let catSchoolTechniques = new Skill("Cat School Techniques", [], 0, 2, 5)
let griffinSchoolTechniques = new Skill("Griffin School Techniques", [], 0, 2, 5)
let bearSchoolTechniques = new Skill("Bear School Techniques", [], 0, 2, 5)

let steadyShot = new Skill("Steady Shot", [], 0, 0, 1)
let rageManagement = new Skill("Rage Management", [], 0, 0, 1)
let focusGen = new Skill("Focus", [], 0, 0, 1)
let adrenalineBurst = new Skill("Adrenaline Burst", [], 0, 0, 1)
let metabolismControl = new Skill("Metabolism Control", [], 0, 0, 1)

//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/