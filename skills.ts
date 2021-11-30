export interface SkillTree {
    skills: Array<Skill>
};

class Skill {
    name: String;
    tags: Array<String>;
    points: Number;
    row: Number;
    maxPoints: Number;

    constructor(name: String, tags: Array<Tag>, points: number, row: Number, maxPoints: Number) {
        this.name = name;
        this.tags = tags;
        this.points = points;
        this.row = row;
        this.maxPoints = maxPoints;
    }
};

let muscleMemory = new Skill("Muscle Memory", [], 0, 0, 5)
let strengthTraining = new Skill("Strength Training", [], 0, 0, 5)
let arrowDeflection = new Skill("Arrow Deflection", [], 0, 0, 3)
let lightningReflexes = new Skill("Lightning Reflexes", [], 0, 0, 3)
let resolve = new Skill("Resolve", [], 0, 0, 5)

let preciseBlows = new Skill("Precise Blows", [], 0, 1, 5)
let crushingBlows = new Skill("Crushing Blows", [], 0, 1, 5)
let fleetFooted = new Skill("Fleet Footed", [], 0, 1, 5)
let coldBlood = new Skill("Cold Blood", [], 0, 1, 5)
let undying = new Skill("Undying", [], 0, 1, 5)

let whirl = new Skill("Whirl", [], 0, 2, 5)
let rend = new Skill("Crushing Blows", [], 0, 2, 5)
let counterAttack = new Skill("Counter Attack", [], 0, 2, 3)
let anatomicalKnowledge = new Skill("Anatomical Knowledge", [], 0, 2, 5)
let razorFocus = new Skill("Razor Focus", [], 0, 2, 5)

let cripplingStrikes = new Skill("Crippling Strikes", [], 0, 3, 5)
let sunderArmor = new Skill("Sunder Armor", [], 0, 3, 5)
let deadlyPrecision = new Skill("Deadly Precision", [], 0, 3, 2)
let cripplingShot = new Skill("Crippling Shot", [], 0, 3, 5)
let floodOfAnger = new Skill("Flood of Anger", [], 0, 3, 5)

let farReachingAard = new Skill("Far Reaching Aard", [], 0, 0, 3)
let meltArmor = new Skill("Strength Training", [], 0, 0, 5)
let sustainedGlyphs = new Skill("Sustained Glyphs", [], 0, 0, 2)
let explodingShield = new Skill("Exploding Shield", [], 0, 0, 3)
let delusion = new Skill("Delusion", [], 0, 0, 3)

let aardSweep = new Skill("Aard Sweep", [], 0, 1, 3)
let firestream = new Skill("Firestream", [], 0, 1, 3)
let magicTrap = new Skill("Magic Trap", [], 0, 1, 3)
let activeShield = new Skill("Active Shield", [], 0, 1, 3)
let puppet = new Skill("Puppet", [], 0, 1, 3)

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

let delayedRecovery = new Skill("Delayed Recovery", [], 0, 2, 3)
let fixative = new Skill("Fixative", [], 0, 2, 3)
let efficiency = new Skill("Efficiency", [], 0, 2, 5)
let synergy = new Skill("Synergy", [], 0, 2, 5)
let fastMetabolism = new Skill("Fast Metabolism", [], 0, 2, 5)

let sideEffects = new Skill("Side Effects", [], 0, 3, 5)
let hunterInstinct = new Skill("Hunter Instinct", [], 0, 3, 5)
let clusterBombs = new Skill("Cluster Bombs", [], 0, 3, 5)
let adaption = new Skill("Adaption", [], 0, 3, 5)
let killingSpree = new Skill("Killing Spree", [], 0, 3, 3)

/*
Combat Skills:
1st Row: Muscle Memory /5, Strength Training /5, Arrow Deflection /3, Lightning Reflexes /3, Resolve /5
2nd Row: Precise Blows /5, Crushing Blows /5, Fleet Footed /5, Cold Blood /5, Undying /5
3rd Row: Whirl /5, Rend /5, Counter Attack /3, Anatomical Knowledge /5, Razor Focus /5
4th Row: Crippling Strikes /5, Sunder Armor /5, Deadly Precision /2, Crippling Shot /5, Flood of Anger /5
*/

/*
Sign Skills
1st Row: Far-Reaching Aard /3, Melt Armor /5, Sustained Glyphs /2, Exploding Shield /3, Delusion /3, 
2nd Row: Aard Sweep /3, Firestream /3, Magic Trap /3, Active Shield /3, Puppet /3, 
3rd Row: Aard Intensity /5, Igni Intesnsity /5, Yrden Intensity /5, Quen Intensity /5, Axii Intensity /5, 
4th Row: Shock Wave /5, Pyromanica /5, Supercharged Glyphs /5, Quen Discharge /5, Domination /3
*/

/*
Alchemy Skills:
1st Row: Heightened Tolerance /5, Poisoned Blades /5, Steady Aim /3, Acquired Tolerance /3, Frenzy /3
2nd Row: Refreshment /5, Protective Coating /5, Pyrotechnics /5, Tissue Transmutation /5, Endure Pain /5
3rd Row: Delayed Recovery /3, Fixative /3, Efficiency /5, Synergy /5, Fast Metabolism /5
4th Row: Side Effects /5, Hunter Instinct /5, Cluster Bombs /5, Adaption /5, Killing Spree /5
*/

//http://www.rpg-gaming.com/tw3.html
//https://www.gosunoob.com/witcher-3/skill-calculator/