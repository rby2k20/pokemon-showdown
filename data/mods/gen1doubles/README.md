Gen 1 Doubles
====================

Introduction
------------
This is a modification of the gen1 Mod for PS, designed to facilitate Double Battles. To remain faithful to how Double Battles have progressed mechanics-wise, it uses Gen 3's battle system: Surf hits only opponents, Poison Gas sucks, you switch immediately after fainting, and so on. No other changes to Gen 1 are made, you still have your Hyper Beam recharges and general jank. 

You need to replace line 2338 in sim/battles.ts with the following line of code for the mod to work properly;
		if (this.gen <= 1 && this.gameType === 'singles') {

You also need to backport ADV's spread move processing into /data/mods/gen1doubles/scripts.js/.