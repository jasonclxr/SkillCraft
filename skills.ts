export interface SkillTree {
    skills: Array<Skill>
};

export interface Skill {
    name: String,
    tags: Array<Tag>,
    points: Number,
    row: Number,
    maxPoints: Number
};

export interface Tag {
    name: String
};


/*
Combat Skills:
1st Row: Muscle Memory /5, Strength Training /5, Arrow Deflection /3, Lightning Reflexes /3, Resolve /5
2nd Row: Precise Blows /5, Crushing Blows /5, Fleet Footed /5, Cold Blood /5, Undying /5
3rd Row: Whirl /5, Rend /5, Counter Attack /3, Anatomical Knowledge /5, Razor Focus /5
4th Row: Crippling Strikes /5, Sunder Armor /5, Deadly Precision /2, Crippling Shot, Flood of Anger /5
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