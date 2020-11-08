import RandomGen3Teams from '../gen3/random-teams';
import {PRNG, PRNGSeed} from '../../../sim/prng';

export class RandomGen2Teams extends RandomGen3Teams {
	slot: number;
	constructor(format: string | Format, prng: PRNG | PRNGSeed | null) {
		super(format, prng);
		this.slot = 0;
	}

	randomTeam() {
		let pokemonLeft = 6;
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		const pokemonPool: string[] = [];
		for (const id in this.dex.data.FormatsData) {
			const species = this.dex.getSpecies(id);
			if (!species.isNonstandard && this.dex.data.FormatsData[id].randomSets) {
				pokemonPool.push(id);
			}
		}

		// Setup storage.
		const tierCount: {[k: string]: number} = {};
		const typeCount: {[k: string]: number} = {};
		const weaknessCount: {[k: string]: number} = {
			Normal: 0, Fighting: 0, Flying: 0, Poison: 0, Ground: 0, Rock: 0, Bug: 0, Ghost: 0, Steel: 0,
			Fire: 0, Water: 0, Grass: 0, Electric: 0, Psychic: 0, Ice: 0, Dragon: 0, Dark: 0,
		};
		const resistanceCount: {[k: string]: number} = {
			Normal: 0, Fighting: 0, Flying: 0, Poison: 0, Ground: 0, Rock: 0, Bug: 0, Ghost: 0, Steel: 0,
			Fire: 0, Water: 0, Grass: 0, Electric: 0, Psychic: 0, Ice: 0, Dragon: 0, Dark: 0,
		};
		let restrictMoves: {[k: string]: number} = {
			reflect: 1, lightscreen: 1, rapidspin: 1, spikes: 1, bellydrum: 1, haze: 1,
			healbell: 1, thief: 1, phazing: 1, sleeptalk: 2, sleeping: 2,
		};

		while (pokemonPool.length && pokemonLeft > 0) {
			const species = this.dex.getSpecies(this.sampleNoReplace(pokemonPool));
			if (!species.exists) continue;
			let skip = false;

			// Ensure 1 Uber at most
			// Ensure 2 mons of same tier at most (this includes OU,UUBL,UU,NU; other tiers not supported yet)
			const tier = species.tier;
			switch (tier) {
			case 'Uber':
				if (tierCount['Uber']) skip = true;
				break;
			default:
				if (tierCount[tier] > 1) skip = true;
			}

			// Ensure the same type not more than twice
			// 33% discard single-type mon if that type already exists
			// 66% discard double-type mon if both types already exist
			const types = species.types;
			if (types.length === 1) {
				if (typeCount[types[0]] > 1) skip = true;
				if (typeCount[types[0]] && this.randomChance(1, 3)) skip = true;
			} else if (types.length === 2) {
				if (typeCount[types[0]] > 1 || typeCount[types[1]] > 1) skip = true;
				if (typeCount[types[0]] && typeCount[types[1]] && this.randomChance(2, 3)) skip = true;
			}

			// Ensure the weakness-resistance balance is 2 points or lower for all types,
			// but ensure no more than 3 pokemon weak to the same regardless.
			const weaknesses = [];
			for (const type in weaknessCount) {
				const weak = this.dex.getImmunity(type, species) && this.dex.getEffectiveness(type, species) > 0;
				if (!weak) continue;
				if (weaknessCount[type] > 2 || weaknessCount[type] - resistanceCount[type] > 1) {
					skip = true;
				}
				weaknesses.push(type);
			}
			const resistances = [];
			for (const type in resistanceCount) {
				const resist = !this.dex.getImmunity(type, species) || this.dex.getEffectiveness(type, species) < 0;
				if (resist) resistances.push(type);
			}

			// In worst case scenario, make sure teams have 6 mons. This shouldn't be necessary
			if (skip && pokemonPool.length + 1 > pokemonLeft) continue;

			// The set passes the randomTeam limitations.
			const set = this.randomSet(species, restrictMoves);
			this.slot = pokemon.length;
			if (set.other && set.other.discard && pokemonPool.length + 1 > pokemonLeft) continue;

			// The set also passes the randomSet limitations.
			pokemon.push(set);

			// Now let's update the counters. First, the Pokémon left.
			pokemonLeft--;

			// Moves counter.
			if (set.other) restrictMoves = set.other.restrictMoves;
			for (const moveid of set.moves) {
				if (restrictMoves[moveid]) restrictMoves[moveid]--;
				if (restrictMoves['phazing'] && ['roar', 'whirlwind'].includes(moveid)) {
					restrictMoves['phazing']--;
				}
				if (restrictMoves['sleeping'] && ['hypnosis', 'lovelykiss', 'sing', 'sleeppowder', 'spore'].includes(moveid)) {
					restrictMoves['sleeping']--;
				}
			}

			// Tier counter.
			if (tierCount[tier]) {
				tierCount[tier]++;
			} else {
				tierCount[tier] = 1;
			}

			// Type counter.
			for (const type of types) {
				if (typeCount[type]) {
					typeCount[type]++;
				} else {
					typeCount[type] = 1;
				}
			}

			// Weakness and resistance counter.
			for (const weakness of weaknesses) {
				weaknessCount[weakness]++;
			}
			for (const resistance of resistances) {
				resistanceCount[resistance]++;
			}
		}

		return pokemon;
	}

	randomSet(species: string | Species, restrictMoves: {[k: string]: number}): RandomTeamsTypes.RandomSet {
		species = this.dex.getSpecies(species);
		if (!species.exists) species = this.dex.getSpecies('unown');
		if (!species.randomSets || !species.randomSets.length) species = this.dex.getSpecies('unown');

		let randomSetNumber = 0;
		let set: RandomTeamsTypes.Gen2RandomSet = species.randomSets![0];
		let moves: string[] = [];
		let hasMove: {[k: string]: number} = {};
		let item = '';
		const ivs = {hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30};

		let discard = false;
		let rerollsLeft = 3;
		const isPhazingMove = (move: string) => {
			return (move === "roar" || move === "whirlwind");
		};
		const isSleepMove = (move: string) => {
			return (move === "sleeppowder" || move === "lovelykiss" || move === "sing" || move === "hypnosis" || move === "spore");
		};

		// Choose one of the available sets (up to four) at random
		// Prevent certain moves from showing up more than once or twice:
		// sleeptalk, reflect, lightscreen, rapidspin, spikes, bellydrum, heal bell, (p)hazing moves, sleep moves
		do {
			moves = [];
			hasMove = {};

			if (species.randomSets!.length > 1) {
				randomSetNumber = 15;
				for (const s of species.randomSets!) {
					if (randomSetNumber < s.chance) {
						set = s;
					}
				}
			}

			// Even if we want to discard this set, return a proper moveset in case there's no room to discard more Pokemon
			// Add the base moves (between 0 and 4) of the chosen set
			if (set.baseMove1 && moves.length < 4) moves.push(set.baseMove1);
			if (set.baseMove2 && moves.length < 4) moves.push(set.baseMove2);
			if (set.baseMove3 && moves.length < 4) moves.push(set.baseMove3);
			if (set.baseMove4 && moves.length < 4) moves.push(set.baseMove4);

			// Add the filler moves (between 0 and 4) of the chosen set
			if (set.fillerMoves1 && moves.length < 4) this.randomMove(moves, hasMove, set.fillerMoves1);
			if (set.fillerMoves2 && moves.length < 4) this.randomMove(moves, hasMove, set.fillerMoves2);
			if (set.fillerMoves3 && moves.length < 4) this.randomMove(moves, hasMove, set.fillerMoves3);
			if (set.fillerMoves4 && moves.length < 4) this.randomMove(moves, hasMove, set.fillerMoves4);

			// Make sure it's not an undesired moveset according to restrictMoves and the rest of the team
			rerollsLeft--;
			discard = false;
			for (const moveid of moves) {
				if (restrictMoves[moveid] === 0) {
					discard = true;
					break;
				}
				if (isPhazingMove(moveid) && restrictMoves['phazing'] === 0) {
					discard = true;
					break;
				}
				if (isSleepMove(moveid) && restrictMoves['sleeping'] === 0) {
					discard = true;
					break;
				}
			}
		} while (rerollsLeft > 0 && discard);

		// many restrictMoves are also rare and/or useful all around, so encourage adding them once to the team
		// Start accounting for this after the first half of the team has been added
		let discourage = false;
		if (!discard && this.slot > 3) {
			discourage = true;
			for (const moveid of moves) {
				if (
					(moveid === "sleeptalk" && restrictMoves['sleeptalk'] > 1) ||
					(moveid !== "bellydrum" && moveid !== "haze" && moveid !== "thief" && restrictMoves[moveid] > 0) ||
					(isPhazingMove(moveid) && restrictMoves['phazing'] > 0) ||
					(isSleepMove(moveid) && restrictMoves['sleeping'] > 1)
				) {
					discourage = false;
					break;
				}
			}
		}
		if (discourage && this.randomChance(1, 2)) discard = true;

		// Add the held item
		// TODO: for some reason, items like Thick Club are not working in randbats
		if (set.item) item = this.sample(set.item);

		// Adjust ivs for hiddenpower
		for (const setMoveid of moves) {
			if (!setMoveid.startsWith('hiddenpower')) continue;
			const hpType = setMoveid.substr(11, setMoveid.length);
			switch (hpType) {
			case 'dragon': ivs.def = 28; break;
			case 'ice': ivs.def = 26; break;
			case 'psychic': ivs.def = 24; break;
			case 'electric': ivs.atk = 28; break;
			case 'grass': ivs.atk = 28; ivs.def = 28; break;
			case 'water': ivs.atk = 28; ivs.def = 26; break;
			case 'fire': ivs.atk = 28; ivs.def = 24; break;
			case 'steel': ivs.atk = 26; break;
			case 'ghost': ivs.atk = 26; ivs.def = 28; break;
			case 'bug': ivs.atk = 26; ivs.def = 26; break;
			case 'rock': ivs.atk = 26; ivs.def = 24; break;
			case 'ground': ivs.atk = 24; break;
			case 'poison': ivs.atk = 24; ivs.def = 28; break;
			case 'flying': ivs.atk = 24; ivs.def = 26; break;
			case 'fighting': ivs.atk = 24; ivs.def = 24; break;
			}
			if (ivs.atk === 28 || ivs.atk === 24) ivs.hp = 14;
			if (ivs.def === 28 || ivs.def === 24) ivs.hp -= 8;
		}

		const levelScale: {[k: string]: number} = {
			LC: 90, // unused
			NFE: 84, // unused
			NU: 80,
			NUBL: 76,
			UU: 74,
			UUBL: 70,
			OU: 68,
			Uber: 64,
		};
		const customScale: {[k: string]: number} = {
			Caterpie: 99, Kakuna: 99, Magikarp: 99, Metapod: 99, Weedle: 99, // unused
			Unown: 98, Wobbuffet: 82, Ditto: 82,
			Snorlax: 66, Nidoqueen: 70,
		};
		let level = levelScale[species.tier] || 90;
		if (customScale[species.name]) level = customScale[species.name];

		return {
			name: species.name,
			species: species.name,
			moves: moves,
			ability: 'None',
			evs: {hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255},
			ivs: ivs,
			item: item,
			level: level,
			shiny: false,
			gender: species.gender ? species.gender : 'M',
			other: {
				discard: discard,
				restrictMoves: restrictMoves,
			},
		};
	}

	randomMove(moves: string[], hasMove: {[k: string]: number}, fillerMoves: string[]) {
		let index = 0;
		let done = false;

		do {
			index = this.random(fillerMoves.length);
			if (!hasMove[fillerMoves[index]] && !(hasMove[fillerMoves[index].substr(0, 11)])) {
				// push the move if not yet known
				moves.push(fillerMoves[index]);
				done = true;

				if (fillerMoves[index].substr(0, 11) === 'hiddenpower') {
					// only one hiddenpower is allowed
					hasMove['hiddenpower'] = 1;
				} else {
					hasMove[fillerMoves[index]] = 1;
				}
			}
		} while (!done);
	}
}

export default RandomGen2Teams;
