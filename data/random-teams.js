'use strict';

/** @typedef {import('../sim/prng').PRNG} PRNG */

/** @type {typeof import('../sim/dex').Dex} */
const Dex = require(/** @type {any} */ ('../.sim-dist/dex')).Dex;
/** @type {typeof import('../sim/prng').PRNG} */
const PRNG = require(/** @type {any} */ ('../.sim-dist/prng')).PRNG;

/**
 * @typedef {Object} TeamData
 * @property {{[k: string]: number}} typeCount
 * @property {{[k: string]: number}} typeComboCount
 * @property {{[k: string]: number}} baseFormes
 * @property {number} megaCount
 * @property {number} [zCount]
 * @property {{[k: string]: number}} has
 * @property {boolean} forceResult
 * @property {{[k: string]: number}} weaknesses
 * @property {{[k: string]: number}} resistances
 * @property {string} [weather]
 * @property {number} [eeveeLimCount]
 */

class RandomTeams {
	/**
	 * @param {Format | string} format
	 * @param {?PRNG | [number, number, number, number]} [prng]
	 */
	constructor(format, prng) {
		format = Dex.getFormat(format);
		this.dex = Dex.forFormat(format);
		this.gen = this.dex.gen;
		// this.randomFactorySets = randomFactorySets;
		// this.randomBSSFactorySets = randomBSSFactorySets;

		this.factoryTier = '';
		this.format = format;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	/**
	 * @param {?PRNG | [number, number, number, number]} [prng]
	 */
	setSeed(prng) {
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	/**
	 * @param {PlayerOptions | null} [options]
	 * @return {PokemonSet[]}
	 */
	getTeam(options) {
		const generatorName = typeof this.format.team === 'string' && this.format.team.startsWith('random') ? this.format.team + 'Team' : '';
		// @ts-ignore
		return this[generatorName || 'randomTeam'](options);
	}

	/**
	 * @param {number} numerator - the top part of the probability fraction
	 * @param {number} denominator - the bottom part of the probability fraction
	 * @return {boolean} - randomly true or false
	 */
	randomChance(numerator, denominator) {
		return this.prng.randomChance(numerator, denominator);
	}

	/**
	 * @param {ReadonlyArray<T>} items - the items to choose from
	 * @return {T} - a random item from items
	 * @template T
	 */
	sample(items) {
		return this.prng.sample(items);
	}

	/**
	 * @param {number} [m]
	 * @param {number} [n]
	 * @return {number}
	 */
	random(m, n) {
		return this.prng.next(m, n);
	}

	/**
	 * Remove an element from an unsorted array significantly faster
	 * than .splice
	 *
	 * @param {any[]} list
	 * @param {number} index
	 */
	fastPop(list, index) {
		// If an array doesn't need to be in order, replacing the
		// element at the given index with the removed element
		// is much, much faster than using list.splice(index, 1).
		let length = list.length;
		let element = list[index];
		list[index] = list[length - 1];
		list.pop();
		return element;
	}

	/**
	 * Remove a random element from an unsorted array and return it.
	 * Uses the battle's RNG if in a battle.
	 *
	 * @param {any[]} list
	 */
	sampleNoReplace(list) {
		let length = list.length;
		let index = this.random(length);
		return this.fastPop(list, index);
	}

	/**
	 * @param {Template} template
	 */
	checkBattleForme(template) {
		// If the Pokémon has a Mega or Primal alt forme, that's its preferred battle forme.
		// No randomization, no choice. We are just checking its existence.
		// Returns a Pokémon template for further details.
		if (!template.otherFormes) return null;
		let firstForme = this.dex.getTemplate(template.otherFormes[0]);
		if (firstForme.isMega || firstForme.isPrimal) return firstForme;
		return null;
	}

	// checkAbilities(selectedAbilities, defaultAbilities) {
	// 	if (!selectedAbilities.length) return true;
	// 	let selectedAbility = selectedAbilities.pop();
	// 	let isValid = false;
	// 	for (let i = 0; i < defaultAbilities.length; i++) {
	// 		let defaultAbility = defaultAbilities[i];
	// 		if (!defaultAbility) break;
	// 		if (defaultAbility.includes(selectedAbility)) {
	// 			defaultAbilities.splice(i, 1);
	// 			isValid = this.checkAbilities(selectedAbilities, defaultAbilities);
	// 			if (isValid) break;
	// 			defaultAbilities.splice(i, 0, defaultAbility);
	// 		}
	// 	}
	// 	if (!isValid) selectedAbilities.push(selectedAbility);
	// 	return isValid;
	// }
	// hasMegaEvo(template) {
	// 	if (!template.otherFormes) return false;
	// 	let firstForme = this.dex.getTemplate(template.otherFormes[0]);
	// 	return !!firstForme.isMega;
	// }
	/**
	 * @return {RandomTeamsTypes.RandomSet[]}
	 */
	randomCCTeam() {
		let team = [];

		let natures = Object.keys(this.dex.data.Natures);
		let items = Object.keys(this.dex.data.Items);

		let random6 = this.random6Pokemon();

		for (let i = 0; i < 6; i++) {
			let species = random6[i];
			let template = Dex.mod('gen' + this.gen).getTemplate(species);
			if (template.isNonstandard) template = Dex.mod('gen' + this.gen).getTemplate(template.baseSpecies);

			// Random legal item
			let item = '';
			if (this.gen >= 2) {
				do {
					item = this.sample(items);
				} while (this.dex.getItem(item).gen > this.gen || this.dex.data.Items[item].isNonstandard);
			}

			// Make sure forme is legal
			if (template.battleOnly || template.requiredItems && !template.requiredItems.some(req => toID(req) === item)) {
				template = Dex.mod('gen' + this.gen).getTemplate(this.dex.getOutOfBattleSpecies(template));
				species = template.name;
			}

			// Make sure that a base forme does not hold any forme-modifier items.
			let itemData = this.dex.getItem(item);
			if (itemData.forcedForme && species === this.dex.getTemplate(itemData.forcedForme).baseSpecies) {
				do {
					item = this.sample(items);
					itemData = this.dex.getItem(item);
				} while (itemData.gen > this.gen || itemData.isNonstandard || itemData.forcedForme && species === this.dex.getTemplate(itemData.forcedForme).baseSpecies);
			}

			// Random legal ability
			let abilities = Object.values(template.abilities).filter(a => this.dex.getAbility(a).gen <= this.gen);
			/**@type {string} */
			let ability = this.gen <= 2 ? 'None' : this.sample(abilities);

			// Four random unique moves from the movepool
			let moves;
			let pool = ['struggle'];
			if (species === 'Smeargle') {
				pool = Object.keys(this.dex.data.Movedex).filter(moveid => !(this.dex.data.Movedex[moveid].isNonstandard || this.dex.data.Movedex[moveid].isZ || this.dex.data.Movedex[moveid].id === 'hiddenpower' && moveid !== 'hiddenpower'));
			} else {
				let learnset = this.dex.data.Learnsets[template.id] && this.dex.data.Learnsets[template.id].learnset ? this.dex.data.Learnsets[template.id].learnset : this.dex.data.Learnsets[this.dex.getTemplate(template.baseSpecies).id].learnset;
				// @ts-ignore
				if (learnset) pool = Object.keys(learnset).filter(moveid => learnset[moveid].find(learned => learned.startsWith(this.gen)));
				if (template.inheritsFrom) {
					learnset = this.dex.data.Learnsets[template.inheritsFrom].learnset;
					// @ts-ignore
					const basePool = Object.keys(learnset).filter(moveid => learnset[moveid].find(learned => learned.startsWith(this.gen)));
					pool = [...new Set(pool.concat(basePool))];
				}
			}
			if (pool.length <= 4) {
				moves = pool;
			} else {
				moves = [this.sampleNoReplace(pool), this.sampleNoReplace(pool), this.sampleNoReplace(pool), this.sampleNoReplace(pool)];
			}

			// Random EVs
			let evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			let s = ["hp", "atk", "def", "spa", "spd", "spe"];
			let evpool = 510;
			do {
				let x = this.sample(s);
				// @ts-ignore
				let y = this.random(Math.min(256 - evs[x], evpool + 1));
				// @ts-ignore
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			let ivs = {hp: this.random(32), atk: this.random(32), def: this.random(32), spa: this.random(32), spd: this.random(32), spe: this.random(32)};

			// Random nature
			let nature = this.sample(natures);

			// Level balance--calculate directly from stats rather than using some silly lookup table
			let mbstmin = 1307; // Sunkern has the lowest modified base stat total, and that total is 807

			let stats = template.baseStats;
			// If Wishiwashi, use the school-forme's much higher stats
			if (template.baseSpecies === 'Wishiwashi') stats = Dex.getTemplate('wishiwashischool').baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

			while (level < 100) {
				mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
				mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100); // Since damage is roughly proportional to level
				mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

				if (mbst >= mbstmin) break;
				level++;
			}

			// Random happiness
			let happiness = this.random(256);

			// Random shininess
			let shiny = this.randomChance(1, 1024);

			team.push({
				name: template.baseSpecies,
				species: template.species,
				gender: template.gender,
				item: item,
				ability: ability,
				moves: moves,
				evs: evs,
				ivs: ivs,
				nature: nature,
				level: level,
				happiness: happiness,
				shiny: shiny,
			});
		}

		return team;
	}

	random6Pokemon() {
		// Pick six random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		let last = [0, 151, 251, 386, 493, 649, 721, 807, 890][this.gen];

		/**@type {number[]} */
		let pool = [];
		for (let id in this.dex.data.FormatsData) {
			if (!this.dex.data.Pokedex[id] || this.dex.data.FormatsData[id].isNonstandard && this.dex.data.FormatsData[id].isNonstandard === 'Past') continue;
			let num = this.dex.data.Pokedex[id].num;
			if (num <= 0 || pool.includes(num)) continue;
			if (num > last) break;
			pool.push(num);
		}

		/**@type {{[k: string]: number}} */
		let hasDexNumber = {};
		for (let i = 0; i < 6; i++) {
			let num = this.sampleNoReplace(pool);
			hasDexNumber[num] = i;
		}

		/**@type {string[][]} */
		let formes = [[], [], [], [], [], []];
		for (let id in this.dex.data.Pokedex) {
			if (!(this.dex.data.Pokedex[id].num in hasDexNumber)) continue;
			let template = this.dex.getTemplate(id);
			if (template.gen <= this.gen && template.isNonstandard !== 'Past' && template.isNonstandard !== 'LGPE') {
				formes[hasDexNumber[template.num]].push(template.species);
			}
		}

		let sixPokemon = [];
		for (let i = 0; i < 6; i++) {
			if (!formes[i].length) {
				throw new Error("Invalid pokemon gen " + this.gen + ": " + JSON.stringify(formes) + " numbers " + JSON.stringify(hasDexNumber));
			}
			sixPokemon.push(this.sample(formes[i]));
		}
		return sixPokemon;
	}

	randomHCTeam() {
		let team = [];

		let itemPool = Object.keys(this.dex.data.Items);
		let abilityPool = Object.keys(this.dex.data.Abilities);
		let movePool = Object.keys(this.dex.data.Movedex);
		let naturePool = Object.keys(this.dex.data.Natures);

		let random6 = this.random6Pokemon();

		for (let i = 0; i < 6; i++) {
			// Choose forme
			let template = this.dex.getTemplate(random6[i]);

			// Random unique item
			let item = '';
			if (this.gen >= 2) {
				do {
					item = this.sampleNoReplace(itemPool);
				} while (this.dex.getItem(item).gen > this.gen || this.dex.data.Items[item].isNonstandard);
			}

			// Random unique ability
			let ability = 'None';
			if (this.gen >= 3) {
				do {
					ability = this.sampleNoReplace(abilityPool);
				} while (this.dex.getAbility(ability).gen > this.gen || this.dex.data.Abilities[ability].isNonstandard);
			}

			// Random unique moves
			let m = [];
			do {
				let moveid = this.sampleNoReplace(movePool);
				if (this.dex.getMove(moveid).gen <= this.gen && !this.dex.data.Movedex[moveid].isNonstandard && (moveid === 'hiddenpower' || moveid.substr(0, 11) !== 'hiddenpower')) {
					m.push(moveid);
				}
			} while (m.length < 4);

			// Random EVs
			let evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			let s = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
			if (this.gen === 6) {
				let evpool = 510;
				do {
					let x = this.sample(s);
					// @ts-ignore
					let y = this.random(Math.min(256 - evs[x], evpool + 1));
					// @ts-ignore
					evs[x] += y;
					evpool -= y;
				} while (evpool > 0);
			} else {
				for (const x of s) {
					// @ts-ignore
					evs[x] = this.random(256);
				}
			}

			// Random IVs
			let ivs = {hp: this.random(32), atk: this.random(32), def: this.random(32), spa: this.random(32), spd: this.random(32), spe: this.random(32)};

			// Random nature
			let nature = this.sample(naturePool);

			// Level balance
			let mbstmin = 1307;
			let stats = template.baseStats;
			let mbst = (stats['hp'] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats['atk'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['def'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spa'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spd'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spe'] * 2 + 31 + 21 + 100) + 5;
			let level = Math.floor(100 * mbstmin / mbst);
			while (level < 100) {
				mbst = Math.floor((stats['hp'] * 2 + 31 + 21 + 100) * level / 100 + 10);
				mbst += Math.floor(((stats['atk'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats['def'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor(((stats['spa'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats['spd'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor((stats['spe'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				if (mbst >= mbstmin) break;
				level++;
			}

			// Random happiness
			let happiness = this.random(256);

			// Random shininess
			let shiny = this.randomChance(1, 1024);

			team.push({
				name: template.baseSpecies,
				species: template.species,
				gender: template.gender,
				item: item,
				ability: ability,
				moves: m,
				evs: evs,
				ivs: ivs,
				nature: nature,
				level: level,
				happiness: happiness,
				shiny: shiny,
			});
		}

		return team;
	}

	/**
	 * @param {?string[]} moves
	 * @param {{[k: string]: boolean}} [hasType]
	 * @param {{[k: string]: boolean}} [hasAbility]
	 * @param {string[]} [movePool]
	 */
	queryMoves(moves, hasType = {}, hasAbility = {}, movePool = []) {
		// This is primarily a helper function for random setbuilder functions.
		let counter = {
			Physical: 0, Special: 0, Status: 0, damage: 0, recovery: 0, stab: 0, inaccurate: 0, priority: 0, recoil: 0, drain: 0, sound: 0,
			adaptability: 0, contrary: 0, ironfist: 0, serenegrace: 0, sheerforce: 0, skilllink: 0, strongjaw: 0, technician: 0,
			physicalsetup: 0, specialsetup: 0, mixedsetup: 0, speedsetup: 0, physicalpool: 0, specialpool: 0,
			/**@type {Move[]} */
			damagingMoves: [],
			/**@type {{[k: string]: number}} */
			damagingMoveIndex: {},
			setupType: '',
			// typescript
			Bug: 0, Dark: 0, Dragon: 0, Electric: 0, Fairy: 0, Fighting: 0, Fire: 0, Flying: 0, Ghost: 0, Grass: 0, Ground: 0,
			Ice: 0, Normal: 0, Poison: 0, Psychic: 0, Rock: 0, Steel: 0, Water: 0,
		};

		for (let type in Dex.data.TypeChart) {
			// @ts-ignore
			counter[type] = 0;
		}

		if (!moves || !moves.length) return counter;

		// Moves that restore HP:
		let RecoveryMove = [
			'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
		];
		// Moves which drop stats:
		let ContraryMove = [
			'closecombat', 'leafstorm', 'overheat', 'superpower', 'vcreate',
		];
		// Moves that boost Attack:
		let PhysicalSetup = [
			'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'poweruppunch', 'swordsdance',
		];
		// Moves which boost Special Attack:
		let SpecialSetup = [
			'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow',
		];
		// Moves which boost Attack AND Special Attack:
		let MixedSetup = [
			'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
		];
		// Moves which boost Speed:
		let SpeedSetup = [
			'agility', 'autotomize', 'flamecharge', 'rockpolish', 'shiftgear',
		];
		// Moves that shouldn't be the only STAB moves:
		let NoStab = [
			'accelerock', 'aquajet', 'bounce', 'explosion', 'fakeout', 'firstimpression', 'flamecharge', 'iceshard', 'machpunch', 'pluck', 'pursuit', 'quickattack', 'selfdestruct', 'suckerpunch', 'watershuriken',
			'clearsmog', 'eruption', 'vacuumwave', 'waterspout',
		];

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const [k, moveId] of moves.entries()) {
			let move = this.dex.getMove(moveId);
			let moveid = move.id;
			let movetype = move.type;
			if (['judgment', 'multiattack', 'revelationdance'].includes(moveid)) movetype = Object.keys(hasType)[0];
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter['damage']++;
				counter.damagingMoves.push(move);
				counter.damagingMoveIndex[moveid] = k;
			} else {
				// Are Physical/Special/Status moves:
				counter[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && moveid !== 'rapidspin')) counter['technician']++;
			// Moves that hit up to 5 times:
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter['skilllink']++;
			if (move.recoil || move.hasCustomRecoil) counter['recoil']++;
			if (move.drain) counter['drain']++;
			// Moves which have a base power, but aren't super-weak like Rapid Spin:
			if (move.basePower > 30 || move.multihit || move.basePowerCallback || moveid === 'infestation' || moveid === 'naturepower') {
				// @ts-ignore
				counter[movetype]++;
				if (hasType[movetype] || movetype === 'Normal' && (hasAbility['Aerilate'] || hasAbility['Galvanize'] || hasAbility['Pixilate'] || hasAbility['Refrigerate'])) {
					counter['adaptability']++;
					// STAB:
					// Certain moves aren't acceptable as a Pokemon's only STAB attack
					if (!NoStab.includes(moveid) && (moveid !== 'hiddenpower' || Object.keys(hasType).length === 1)) {
						counter['stab']++;
						// Ties between Physical and Special setup should broken in favor of STABs
						counter[move.category] += 0.1;
					}
				} else if (move.priority === 0 && (hasAbility['Libero'] || hasAbility['Protean']) && !NoStab.includes(moveid)) {
					counter['stab']++;
				} else if (movetype === 'Steel' && hasAbility['Steelworker']) {
					counter['stab']++;
				}
				if (move.flags['bite']) counter['strongjaw']++;
				if (move.flags['punch']) counter['ironfist']++;
				if (move.flags['sound']) counter['sound']++;
				counter.damagingMoves.push(move);
				counter.damagingMoveIndex[moveid] = k;
			}
			// Moves with secondary effects:
			if (move.secondary) {
				counter['sheerforce']++;
				if (move.secondary.chance && move.secondary.chance >= 20 && move.secondary.chance < 100) {
					counter['serenegrace']++;
				}
			}
			// Moves with low accuracy:
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter['inaccurate']++;
			// Moves with non-zero priority:
			if (move.category !== 'Status' && move.priority !== 0) counter['priority']++;

			// Moves that change stats:
			if (RecoveryMove.includes(moveid)) counter['recovery']++;
			if (ContraryMove.includes(moveid)) counter['contrary']++;
			if (PhysicalSetup.includes(moveid)) {
				counter['physicalsetup']++;
				counter.setupType = 'Physical';
			} else if (SpecialSetup.includes(moveid)) {
				counter['specialsetup']++;
				counter.setupType = 'Special';
			}
			if (MixedSetup.includes(moveid)) counter['mixedsetup']++;
			if (SpeedSetup.includes(moveid)) counter['speedsetup']++;
		}

		// Keep track of the available moves
		for (const moveid of movePool) {
			let move = this.dex.getMove(moveid);
			if (move.damageCallback) continue;
			if (move.category === 'Physical') counter['physicalpool']++;
			if (move.category === 'Special') counter['specialpool']++;
		}

		// Choose a setup type:
		if (counter['mixedsetup']) {
			counter.setupType = 'Mixed';
		} else if (counter.setupType) {
			let pool = {
				Physical: counter.Physical + counter['physicalpool'],
				Special: counter.Special + counter['specialpool'],
			};
			if (counter['physicalsetup'] && counter['specialsetup']) {
				if (pool.Physical === pool.Special) {
					if (counter.Physical > counter.Special) counter.setupType = 'Physical';
					if (counter.Special > counter.Physical) counter.setupType = 'Special';
				} else {
					counter.setupType = pool.Physical > pool.Special ? 'Physical' : 'Special';
				}
			// @ts-ignore
			} else if (!pool[counter.setupType] || pool[counter.setupType] < 2 && (!moves.includes('rest') || !moves.includes('sleeptalk'))) {
				counter.setupType = '';
			}
		}
		counter['Physical'] = Math.floor(counter['Physical']);
		counter['Special'] = Math.floor(counter['Special']);

		return counter;
	}

	/**
	 * @param {string | Template} template
	 * @param {RandomTeamsTypes.TeamDetails} [teamDetails]
	 * @param {boolean} [isLead]
	 * @param {boolean} [isDoubles]
	 * @return {RandomTeamsTypes.RandomSet}
	 */
	randomSet(template, teamDetails = {}, isLead = false, isDoubles = false) {
		template = this.dex.getTemplate(template);
		let baseTemplate = template;
		let species = template.species;

		if (!template.exists || (!template.randomBattleMoves && (!isDoubles || !template.randomDoubleBattleMoves) && !this.dex.data.Learnsets[template.id])) {
			template = this.dex.getTemplate('pikachu');

			const err = new Error('Template incompatible with random battles: ' + species);
			Monitor.crashlog(err, 'The randbat set generator');
		}

		if (template.battleOnly && !template.isGigantamax) {
			// Only change the species. The template has custom moves, and may have different typing and requirements.
			species = /** @type {string} */ (template.battleOnly);
		}

		const randMoves = !isDoubles ? template.randomBattleMoves : (template.randomDoubleBattleMoves || template.randomBattleMoves);
		// @ts-ignore
		let movePool = (randMoves || Object.keys(this.dex.data.Learnsets[template.id].learnset)).slice();
		let rejectedPool = [];
		/**@type {string[]} */
		let moves = [];
		let ability = '';
		let item = '';
		let evs = {
			hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85,
		};
		let ivs = {
			hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31,
		};
		/**@type {{[k: string]: true}} */
		let hasType = {};
		hasType[template.types[0]] = true;
		if (template.types[1]) {
			hasType[template.types[1]] = true;
		}
		/**@type {{[k: string]: true}} */
		let hasAbility = {};
		hasAbility[template.abilities[0]] = true;
		if (template.abilities[1]) {
			hasAbility[template.abilities[1]] = true;
		}
		if (template.abilities['H']) {
			hasAbility[template.abilities['H']] = true;
		}

		/**@type {{[k: string]: boolean}} */
		let hasMove = {};
		let counter;

		do {
			// Keep track of all moves we have:
			hasMove = {};
			for (const moveid of moves) {
				hasMove[moveid] = true;
			}

			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			let pool = (movePool.length ? movePool : rejectedPool);
			while (moves.length < 4 && pool.length) {
				let moveid = this.sampleNoReplace(pool);
				hasMove[moveid] = true;
				moves.push(moveid);
			}

			counter = this.queryMoves(moves, hasType, hasAbility, movePool);

			// Iterate through the moves again, this time to cull them:
			for (const [k, moveId] of moves.entries()) {
				let move = this.dex.getMove(moveId);
				let moveid = move.id;
				let rejected = false;
				let isSetup = false;

				switch (moveid) {
				// Not very useful without their supporting moves
				case 'earthquake':
					if (hasMove['substitute'] && movePool.includes('toxic')) rejected = true;
					if (movePool.includes('bodypress') && movePool.includes('shellsmash')) rejected = true;
					break;
				case 'focuspunch': case 'reversal':
					if (!hasMove['substitute'] || counter.damagingMoves.length < 2) rejected = true;
					break;
				case 'payback': case 'psychocut':
					if (!counter.Status || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'protect':
					if (movePool.includes('leechseed') || movePool.includes('toxic') && !hasMove['wish']) rejected = true;
					if (counter.Status < 2 && !isDoubles) rejected = true;
					break;
				case 'reflect':
					if (!hasMove['calmmind'] && !hasMove['lightscreen']) rejected = true;
					if (movePool.length > 1) {
						let screen = movePool.indexOf('lightscreen');
						if (screen >= 0) this.fastPop(movePool, screen);
					}
					break;
				case 'rest':
					if (movePool.includes('sleeptalk')) rejected = true;
					if (!hasMove['sleeptalk'] && (movePool.includes('bulkup') || movePool.includes('calmmind') || movePool.includes('coil') || movePool.includes('curse'))) rejected = true;
					break;
				case 'sleeptalk':
					if (!hasMove['rest']) rejected = true;
					if (movePool.length > 1 && !hasAbility['Contrary']) {
						let rest = movePool.indexOf('rest');
						if (rest >= 0) this.fastPop(movePool, rest);
					}
					break;
				case 'storedpower':
					if (!counter.setupType) rejected = true;
					break;
				case 'switcheroo': case 'trick':
					if (counter.Physical + counter.Special < 3 || hasMove['rapidspin']) rejected = true;
					break;
				case 'zenheadbutt':
					if (movePool.includes('bellydrum') || hasMove['bellydrum'] && hasMove['substitute']) rejected = true;
					if (!hasType['Psychic'] && (movePool.includes('closecombat') || movePool.includes('highjumpkick'))) rejected = true;
					break;

				// Set up once and only if we have the moves for it
				case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
					if (counter.setupType !== 'Physical' || counter['physicalsetup'] > 1) rejected = true;
					if (counter.Physical + counter['physicalpool'] < 2 && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					if (moveid === 'bellydrum' && !counter['priority'] && !hasAbility['Ice Face']) rejected = true;
					isSetup = true;
					break;
				case 'calmmind': case 'nastyplot':
					if (counter.setupType !== 'Special' || counter['specialsetup'] > 1) rejected = true;
					if (counter.Special + counter['specialpool'] < 2 && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					if (moveid === 'calmmind' && hasMove['trickroom']) rejected = true;
					isSetup = true;
					break;
				case 'quiverdance':
					isSetup = true;
					break;
				case 'clangoroussoul': case 'shellsmash': case 'workup':
					if (counter.setupType !== 'Mixed' || counter['mixedsetup'] > 1) rejected = true;
					if (counter.damagingMoves.length + counter['physicalpool'] + counter['specialpool'] < 2) rejected = true;
					isSetup = true;
					break;
				case 'agility': case 'autotomize': case 'rockpolish': case 'shiftgear':
					if (counter.damagingMoves.length < 2 || hasMove['stickyweb'] || hasMove['rest']) rejected = true;
					if (moveid === 'autotomize' && movePool.includes('calmmind')) rejected = true;
					if (!counter.setupType) isSetup = true;
					break;
				case 'flamecharge':
					if (counter.damagingMoves.length < 3 && !counter.setupType) rejected = true;
					if (movePool.includes('swordsdance')) rejected = true;
					break;

				// Bad after setup
				case 'bounce': case 'firstimpression': case 'glare': case 'waterspout':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['rest']) rejected = true;
					break;
				case 'bulletpunch': case 'rockblast': case 'trickroom':
					if (!!counter['speedsetup'] || counter.damagingMoves.length < 2) rejected = true;
					break;
				case 'circlethrow': case 'dragontail':
					if (!!counter['speedsetup'] || hasMove['encore'] || !(hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					if (hasMove['psyshock'] && !!counter.Status) rejected = true;
					break;
				case 'dracometeor': case 'stormthrow':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'fakeout':
					if (counter.setupType || hasMove['protect'] || hasMove['rapidspin'] || hasMove['substitute'] || hasMove['uturn']) rejected = true;
					break;
				case 'healingwish': case 'memento':
					if (counter.setupType || !!counter['recovery'] || hasMove['substitute'] || hasMove['uturn']) rejected = true;
					break;
				case 'icywind': case 'leechseed': case 'roar': case 'teleport': case 'whirlwind':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['dragontail']) rejected = true;
					break;
				case 'partingshot':
					if (!!counter['speedsetup'] || hasMove['bulkup'] || hasMove['uturn']) rejected = true;
					break;
				case 'rapidspin':
					if (hasMove['curse'] || hasMove['nastyplot'] || hasMove['shellsmash'] || teamDetails.rapidSpin) rejected = true;
					if (counter.setupType && counter['Fighting'] >= 2) rejected = true;
					break;
				case 'spikes':
					if (counter.setupType || teamDetails.spikes && teamDetails.spikes > 1) rejected = true;
					break;
				case 'stealthrock':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['rest'] || hasMove['substitute'] || teamDetails.stealthRock) rejected = true;
					break;
				case 'superpower':
					if (hasMove['bellydrum'] || hasMove['substitute'] && !hasAbility['Contrary']) rejected = true;
					if (counter.Physical >= 4 && movePool.includes('uturn')) rejected = true;
					if (hasAbility['Contrary']) isSetup = true;
					break;
				case 'thunderwave': case 'voltswitch':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['raindance']) rejected = true;
					break;
				case 'toxic':
					if (counter.setupType || hasMove['sludgewave'] || hasMove['thunderwave'] || hasMove['trickroom'] || hasMove['willowisp']) rejected = true;
					break;
				case 'toxicspikes':
					if (counter.setupType || teamDetails.toxicSpikes) rejected = true;
					break;
				case 'uturn':
					if (counter.setupType || hasType['Bug'] && counter.stab < 2 && counter.damagingMoves.length > 2) rejected = true;
					break;

				// Ineffective having both
				// Attacks:
				case 'explosion':
					if (hasMove['curse'] || !!counter['speedsetup'] || !!counter['recovery']) rejected = true;
					if (hasMove['drainpunch'] || hasMove['painsplit'] || hasMove['rockblast']) rejected = true;
					break;
				case 'facade':
					if ((hasMove['bulkup'] && hasType['Fighting']) || !hasAbility['Guts'] && !!counter.Status) rejected = true;
					break;
				case 'hypervoice':
					if (hasMove['blizzard']) rejected = true;
					break;
				case 'quickattack':
					if (!!counter['speedsetup'] || hasType['Rock'] && !!counter.Status) rejected = true;
					if (counter.Physical > 3 && movePool.includes('uturn')) rejected = true;
					break;
				case 'firefang':
					if (hasMove['fireblast'] && !counter.setupType) rejected = true;
					break;
				case 'firepunch': case 'flamethrower':
					if (hasMove['curse'] || hasMove['heatwave'] || hasMove['overheat'] || hasMove['wish']) rejected = true;
					break;
				case 'hydropump':
					if (hasMove['scald'] && ((counter.Special < 4 && !hasMove['uturn']) || (template.types.length > 1 && counter.stab < 3))) rejected = true;
					break;
				case 'thunderbolt':
					if (hasMove['powerwhip']) rejected = true;
					break;
				case 'gigadrain':
					if (hasMove['leafstorm'] || hasType['Poison'] && !counter['Poison']) rejected = true;
					break;
				case 'powerwhip':
					if (hasMove['leechlife'] || !hasType['Grass'] && counter.Physical > 3 && movePool.includes('uturn')) rejected = true;
					break;
				case 'woodhammer':
					if (hasMove['hornleech'] && counter.Physical < 4) rejected = true;
					if (hasMove['drumbeating'] || counter.Physical < 4 && movePool.includes('drumbeating')) rejected = true;
					break;
				case 'icebeam':
					if (hasMove['freezedry']) rejected = true;
					break;
				case 'bodypress':
					if (hasMove['mirrorcoat'] || hasMove['shellsmash'] || hasMove['earthquake'] && movePool.includes('shellsmash')) rejected = true;
					break;
				case 'dynamicpunch':
					if (hasMove['closecombat'] || hasMove['facade']) rejected = true;
					break;
				case 'focusblast':
					if ((hasMove['superpower'] && counter.setupType !== 'Special') || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'poisonjab':
					if (!hasType['Poison'] && counter.Status >= 2) rejected = true;
					break;
				case 'photongeyser':
					if (hasMove['morningsun']) rejected = true;
					break;
				case 'psychic':
					if (hasMove['psyshock'] && counter.setupType) rejected = true;
					break;
				case 'psyshock':
					if ((hasMove['psychic'] || hasAbility['Pixilate']) && counter.Special < 4 && !counter.setupType) rejected = true;
					if (hasAbility['Multiscale'] && !counter.setupType) rejected = true;
					break;
				case 'bugbuzz':
					if (hasMove['uturn'] && !counter.setupType) rejected = true;
					break;
				case 'stoneedge':
					if (hasMove['rockblast'] || hasMove['rockslide'] || !!counter.Status && movePool.includes('rockslide')) rejected = true;
					if ((hasAbility['No Guard'] && !hasMove['dynamicpunch']) || hasAbility['Iron Fist'] && movePool.includes('machpunch')) rejected = true;
					break;
				case 'airslash':
					if (hasAbility['Simple'] && !!counter['recovery']) rejected = true;
					break;
				case 'hurricane':
					if (hasMove['airslash'] || counter.setupType && movePool.includes('airslash')) rejected = true;
					break;
				case 'shadowball':
					if (hasAbility['Pixilate'] && (counter.setupType || counter.Status > 1)) rejected = true;
					if (hasType['Electric'] && hasMove['protect']) rejected = true;
					break;
				case 'shadowclaw':
					if (hasMove['shadowsneak'] && counter.Physical < 4) rejected = true;
					break;
				case 'shadowpunch':
					if (hasMove['shadowsneak'] || hasMove['earthquake'] && !hasType['Ground']) rejected = true;
					break;
				case 'shadowsneak':
					if (!!counter['recovery'] || hasMove['substitute'] && !hasMove['earthquake']) rejected = true;
					break;
				case 'dragonpulse': case 'outrage':
					if (hasMove['dracometeor'] && counter.Special < 4) rejected = true;
					break;
				case 'darkpulse':
					if ((hasMove['foulplay'] || hasMove['knockoff'] || hasMove['suckerpunch'] || hasMove['defog']) && counter.setupType !== 'Special') rejected = true;
					if (!hasType['Dark'] && !!counter.Status) rejected = true;
					break;
				case 'knockoff':
					if (hasMove['foulplay'] || !!counter['speedsetup']) rejected = true;
					break;
				case 'suckerpunch':
					if (counter.damagingMoves.length < 2 || counter['Dark'] > 1 && !hasType['Dark']) rejected = true;
					break;
				case 'meteormash':
					if (movePool.includes('extremespeed')) rejected = true;
					break;
				case 'dazzlinggleam':
					if (hasMove['airslash'] && !hasMove['trick']) rejected = true;
					break;
				case 'moonblast':
					if (isDoubles && hasMove['dazzlinggleam']) rejected = true;
					break;

				// Status:
				case 'bodyslam': case 'clearsmog':
					if (hasMove['toxic'] || hasMove['trick']) rejected = true;
					break;
				case 'haze':
					if (hasMove['stealthrock'] || movePool.includes('stealthrock') && !teamDetails.stealthRock) rejected = true;
					break;
				case 'yawn':
					if (hasMove['thunderwave'] || hasMove['toxic']) rejected = true;
					break;
				case 'defog':
					if (hasMove['spikes'] || hasMove['stealthrock'] || teamDetails.defog) rejected = true;
					if (counter.setupType || hasMove['extremespeed'] || hasMove['energyball'] && !hasType['Grass']) rejected = true;
					break;
				case 'stickyweb':
					if (teamDetails.stickyWeb) rejected = true;
					break;
				case 'painsplit': case 'recover': case 'roost': case 'synthesis':
					if (hasMove['rest'] || hasMove['selfdestruct'] || hasMove['wish']) rejected = true;
					if (move.id === 'roost' && (hasMove['stoneedge'] || hasMove['throatchop'])) rejected = true;
					break;
				case 'substitute':
					if (hasMove['uturn'] || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (movePool.includes('painsplit') || movePool.includes('roost') || movePool.includes('calmmind') && !counter['recovery']) rejected = true;
					break;
				case 'wideguard':
					if (hasMove['protect']) rejected = true;
					break;
				}

				// This move doesn't satisfy our setup requirements:
				if ((move.category === 'Physical' && counter.setupType === 'Special') || (move.category === 'Special' && counter.setupType === 'Physical')) {
					// Reject STABs last in case the setup type changes later on
					// @ts-ignore
					let stabs = counter[template.types[0]] + (counter[template.types[1]] || 0);
					if (!hasType[move.type] || stabs > 1 || counter[move.category] < 2) rejected = true;
				}

				// Pokemon should have moves that benefit their types, stats, or ability
				// @ts-ignore
				if (!rejected && (counter['physicalsetup'] + counter['specialsetup'] < 2 && (!counter.setupType || counter.setupType === 'Mixed' || (move.category !== counter.setupType && move.category !== 'Status') || counter[counter.setupType] + counter.Status > 3)) &&
					((!counter.stab && counter['physicalpool'] + counter['specialpool'] > 0) ||
					(hasType['Bug'] && movePool.includes('megahorn')) ||
					(hasType['Dark'] && !counter['Dark']) ||
					(hasType['Dragon'] && !counter['Dragon'] && !(hasMove['rest'] && hasMove['sleeptalk'])) ||
					(hasType['Electric'] && (!counter['Electric'] || (hasMove['voltswitch'] && counter.stab < 2 && moveid !== 'toxic'))) ||
					(hasType['Fairy'] && !counter['Fairy'] && !hasType['Flying'] && !hasAbility['Pixilate']) ||
					(hasType['Fighting'] && !counter['Fighting']) ||
					(hasType['Fire'] && !counter['Fire']) ||
					(hasType['Flying'] && !counter['Flying'] && (movePool.includes('airslash') || movePool.includes('bravebird') || movePool.includes('hurricane'))) ||
					(hasType['Ghost'] && !counter['Ghost'] && !hasType['Dark'] && !hasAbility['Steelworker']) ||
					(hasType['Grass'] && !counter['Grass'] && (hasAbility['Grassy Surge'] || !hasType['Fairy'] && !hasType['Poison'] && !hasType['Steel'])) ||
					(hasType['Ground'] && !counter['Ground']) ||
					(hasType['Ice'] && (!counter['Ice'] || (hasAbility['Snow Warning'] && movePool.includes('blizzard') && !hasMove['hypervoice']))) ||
					((hasType['Normal'] && movePool.includes('facade')) || (hasAbility['Pixilate'] && !counter['Normal'])) ||
					(hasType['Psychic'] && !counter['Psychic'] && !hasType['Ghost'] && !hasType['Steel'] && (hasAbility['Psychic Surge'] || counter.setupType || movePool.includes('psychicfangs'))) ||
					(hasType['Rock'] && !counter['Rock'] && template.baseStats.atk >= 80) ||
					((hasType['Steel'] || hasAbility['Steelworker']) && !counter['Steel'] && template.baseStats.atk >= 95) ||
					(hasType['Water'] && !counter['Water']) ||
					(hasAbility['Cheek Pouch'] && movePool.includes('recycle') && moveid !== 'substitute') ||
					((hasAbility['Moody'] || hasMove['wish']) && movePool.includes('protect')) ||
					(!counter['recovery'] && !counter.setupType && !hasMove['trickroom'] && (movePool.includes('recover') || movePool.includes('roost') || movePool.includes('slackoff') || movePool.includes('softboiled')) && !!counter.Status) ||
					(movePool.includes('quiverdance') || movePool.includes('stickyweb') && !counter.setupType && !teamDetails.stickyWeb))) {
					// Reject Status or non-STAB
					if (!isSetup && !move.weather && !move.sideCondition && !move.stallingMove && !move.damage && (move.category !== 'Status' || !move.flags.heal) && moveid !== 'sleeptalk') {
						if (move.category === 'Status' || !hasType[move.type] || move.selfSwitch || move.basePower && move.basePower < 40 && !move.multihit) rejected = true;
					}
				}

				// Sleep Talk shouldn't be selected without Rest
				if (moveid === 'rest' && rejected) {
					let sleeptalk = movePool.indexOf('sleeptalk');
					if (sleeptalk >= 0) {
						if (movePool.length < 2) {
							rejected = false;
						} else {
							this.fastPop(movePool, sleeptalk);
						}
					}
				}

				// Remove rejected moves from the move list
				if (rejected && movePool.length) {
					if (move.category !== 'Status' && !move.damage && !move.flags.charge) rejectedPool.push(moves[k]);
					moves.splice(k, 1);
					break;
				}
				if (rejected && rejectedPool.length) {
					moves.splice(k, 1);
					break;
				}
			}
		} while (moves.length < 4 && (movePool.length || rejectedPool.length));

		// Moveset modifications
		if (hasMove['dazzlinggleam'] && hasMove['aurasphere']) {
			moves[moves.indexOf('aurasphere')] = 'fireblast';
		}
		if (hasMove['nastyplot'] && hasMove['psyshock'] && hasMove['roost']) {
			moves[moves.indexOf('nastyplot')] = 'calmmind';
			moves[moves.indexOf('psyshock')] = 'storedpower';
		}

		// @ts-ignore
		let abilities = Object.values(baseTemplate.abilities);
		abilities.sort((a, b) => this.dex.getAbility(b).rating - this.dex.getAbility(a).rating);
		let ability0 = this.dex.getAbility(abilities[0]);
		let ability1 = this.dex.getAbility(abilities[1]);
		let ability2 = this.dex.getAbility(abilities[2]);
		if (abilities[1]) {
			if (abilities[2] && ability1.rating <= ability2.rating && this.randomChance(1, 2)) {
				[ability1, ability2] = [ability2, ability1];
			}
			if (ability0.rating <= ability1.rating && this.randomChance(1, 2)) {
				[ability0, ability1] = [ability1, ability0];
			} else if (ability0.rating - 0.6 <= ability1.rating && this.randomChance(2, 3)) {
				[ability0, ability1] = [ability1, ability0];
			}
			ability = ability0.name;

			let rejectAbility;
			do {
				rejectAbility = false;
				if (['Flare Boost', 'Hydration', 'Ice Body', 'Inner Focus', 'Insomnia', 'Liquid Voice', 'Misty Surge', 'Quick Feet', 'Rain Dish', 'Snow Cloak', 'Weak Armor'].includes(ability)) {
					rejectAbility = true;
				} else if (['Adaptability', 'Contrary', 'Iron Fist', 'Serene Grace', 'Skill Link', 'Strong Jaw'].includes(ability)) {
					// @ts-ignore
					rejectAbility = !counter[toID(ability)];
				} else if (ability === 'Bulletproof' || ability === 'Overcoat') {
					rejectAbility = (counter.setupType && hasAbility['Soundproof']);
				} else if (ability === 'Chlorophyll') {
					rejectAbility = (template.baseStats.spe > 100 || !counter['Fire'] && !hasMove['sunnyday'] && !teamDetails['sun']);
				} else if (ability === 'Competitive') {
					rejectAbility = (counter['Special'] < 2 || hasMove['rest'] && hasMove['sleeptalk']);
				} else if (ability === 'Compound Eyes' || ability === 'No Guard') {
					rejectAbility = !counter['inaccurate'];
				} else if (ability === 'Cursed Body' || ability === 'Speed Boost') {
					rejectAbility = hasAbility['Infiltrator'];
				} else if (ability === 'Defiant' || ability === 'Moxie') {
					rejectAbility = (!counter['Physical'] || hasMove['dragontail']);
				} else if (ability === 'Flash Fire') {
					rejectAbility = (this.dex.getEffectiveness('Fire', template) < -1);
				} else if (ability === 'Gluttony') {
					rejectAbility = !hasMove['bellydrum'];
				} else if (ability === 'Harvest') {
					rejectAbility = hasAbility['Frisk'];
				} else if (ability === 'Hustle') {
					rejectAbility = counter.Physical < 2;
				} else if (ability === 'Intimidate') {
					rejectAbility = hasMove['bounce'];
				} else if (ability === 'Lightning Rod') {
					rejectAbility = template.types.includes('Ground');
				} else if (ability === 'Limber') {
					rejectAbility = template.types.includes('Electric');
				} else if (ability === 'Magic Guard') {
					rejectAbility = (hasAbility['Tinted Lens'] && !counter.Status);
				} else if (ability === 'Mold Breaker') {
					rejectAbility = (hasAbility['Adaptability'] || hasAbility['Scrappy'] || hasAbility['Unburden'] && counter.setupType);
				} else if (ability === 'Moody') {
					rejectAbility = (template.species === 'Octillery');
				} else if (ability === 'Neutralizing Gas') {
					rejectAbility = !hasMove['toxicspikes'];
				} else if (ability === 'Overgrow') {
					rejectAbility = !counter['Grass'];
				} else if (ability === 'Power Construct') {
					rejectAbility = true;
				} else if (ability === 'Prankster' || ability === 'Steely Spirit') {
					rejectAbility = !counter['Status'];
				} else if (ability === 'Pressure' || ability === 'Synchronize') {
					rejectAbility = (counter.setupType || counter.Status < 2);
				} else if (ability === 'Refrigerate') {
					rejectAbility = !counter['Normal'];
				} else if (ability === 'Regenerator') {
					rejectAbility = hasAbility['Magic Guard'];
				} else if (ability === 'Reckless' || ability === 'Rock Head') {
					rejectAbility = !counter['recoil'];
				} else if (ability === 'Sand Force' || ability === 'Sand Rush' || ability === 'Sand Veil') {
					rejectAbility = !teamDetails['sand'];
				} else if (ability === 'Shadow Tag') {
					rejectAbility = (template.species === 'Gothitelle');
				} else if (ability === 'Sheer Force') {
					rejectAbility = (!counter['sheerforce'] || hasAbility['Guts']);
				} else if (ability === 'Sniper') {
					rejectAbility = counter['Water'] > 1;
				} else if (ability === 'Snow Warning') {
					rejectAbility = (hasAbility['Refrigerate'] && !!counter['Normal']);
				} else if (ability === 'Sturdy') {
					rejectAbility = !!counter['recoil'];
				} else if (ability === 'Swarm') {
					rejectAbility = (!counter['Bug'] || !!counter['recovery']);
				} else if (ability === 'Sweet Veil') {
					rejectAbility = hasType['Grass'];
				} else if (ability === 'Swift Swim') {
					rejectAbility = (!hasMove['raindance'] && (hasAbility['Intimidate'] || hasAbility['Slush Rush'] || hasAbility['Water Absorb']));
				} else if (ability === 'Technician') {
					rejectAbility = (!counter['technician'] || hasMove['tailslap']);
				} else if (ability === 'Tinted Lens') {
					rejectAbility = (hasMove['defog'] || hasMove['hurricane'] || counter.Status > 2 && !counter.setupType);
				} else if (ability === 'Unaware') {
					rejectAbility = (counter.setupType || hasMove['stealthrock']);
				} else if (ability === 'Unburden') {
					rejectAbility = (hasAbility['Prankster'] || !counter.setupType && !hasMove['acrobatics']);
				} else if (ability === 'Volt Absorb') {
					rejectAbility = (this.dex.getEffectiveness('Electric', template) < -1);
				} else if (ability === 'Water Absorb') {
					rejectAbility = (hasMove['raindance'] || hasAbility['Strong Jaw'] || hasAbility['Volt Absorb']);
				}

				if (rejectAbility) {
					if (ability === ability0.name && ability1.rating >= 1) {
						ability = ability1.name;
					} else if (ability === ability1.name && abilities[2] && ability2.rating >= 1) {
						ability = ability2.name;
					} else {
						// Default to the highest rated ability if all are rejected
						ability = abilities[0];
						rejectAbility = false;
					}
				}
			} while (rejectAbility);

			if (template.species === 'Copperajah-Gmax') {
				ability = 'Heavy Metal';
			} else if (hasAbility['Guts'] && (hasMove['facade'] || (hasMove['rest'] && hasMove['sleeptalk']))) {
				ability = 'Guts';
			} else if (isDoubles) {
				if (hasAbility['Gluttony'] && hasMove['recycle']) ability = 'Gluttony';
				if (hasAbility['Intimidate']) ability = 'Intimidate';
				if (hasAbility['Ripen']) ability = 'Ripen';
				if (hasAbility['Stalwart']) ability = 'Stalwart';
			}
		} else {
			ability = ability0.name;
		}

		item = !isDoubles ? 'Leftovers' : 'Sitrus Berry';
		if (template.requiredItems) {
			item = this.sample(template.requiredItems);

		// First, the extra high-priority items
		} else if (template.species === 'Eternatus' && counter.Status < 2) {
			item = 'Metronome';
		} else if (template.species === 'Farfetch\'d') {
			item = 'Leek';
		} else if (template.species === 'Jolteon') {
			item = hasMove['protect'] ? 'Magnet' : 'Choice Specs';
		} else if (template.baseSpecies === 'Pikachu') {
			species = 'Pikachu' + this.sample(['', '-Original', '-Hoenn', '-Sinnoh', '-Unova', '-Kalos', '-Alola', '-Partner']);
			item = 'Light Ball';
		} else if (template.species === 'Shedinja') {
			item = (!teamDetails.defog && !teamDetails.rapidSpin && !isDoubles) ? 'Heavy-Duty Boots' : 'Focus Sash';
		} else if (template.species === 'Shuckle' && hasMove['stickyweb']) {
			item = 'Mental Herb';
		} else if (template.species === 'Unfezant') {
			item = 'Scope Lens';
		} else if (template.species === 'Wobbuffet' || (ability === 'Emergency Exit' && !!counter['Status']) || ability === 'Ripen' && isDoubles) {
			item = 'Sitrus Berry';
		} else if (ability === 'Cheek Pouch') {
			item = hasMove['recycle'] ? 'Petaya Berry' : 'Sitrus Berry';
		} else if (ability === 'Gluttony') {
			item = this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki']) + ' Berry';
		} else if (ability === 'Gorilla Tactics' || ability === 'Imposter' || ability === 'Magnet Pull' && hasMove['bodypress']) {
			item = 'Choice Scarf';
		} else if (hasMove['switcheroo'] || hasMove['trick']) {
			if (template.baseStats.spe >= 60 && template.baseStats.spe <= 108 && !counter['priority']) {
				item = 'Choice Scarf';
			} else {
				item = (counter.Physical > counter.Special) ? 'Choice Band' : 'Choice Specs';
			}
		} else if (template.evos.length) {
			item = 'Eviolite';
		} else if (hasMove['bellydrum']) {
			item = (!!counter['priority'] || !hasMove['substitute']) ? 'Sitrus Berry' : 'Salac Berry';
		} else if (hasMove['shellsmash']) {
			item = (ability === 'Sturdy' && !isLead && !isDoubles) ? 'Heavy-Duty Boots' : 'White Herb';
		} else if (ability === 'Guts' && hasMove['facade']) {
			item = hasType['Fire'] ? 'Toxic Orb' : 'Flame Orb';
		} else if ((ability === 'Magic Guard' && counter.damagingMoves.length > 1) || (ability === 'Sheer Force' && !!counter['sheerforce'])) {
			item = 'Life Orb';
		} else if (ability === 'Unburden') {
			item = hasMove['closecombat'] ? 'White Herb' : 'Sitrus Berry';
		} else if (hasMove['acrobatics']) {
			item = '';
		} else if (hasMove['auroraveil'] || hasMove['lightscreen'] && hasMove['reflect']) {
			item = 'Light Clay';
		} else if (hasMove['rest'] && !hasMove['sleeptalk'] && ability !== 'Shed Skin' && ability !== 'Shadow Tag') {
			item = 'Chesto Berry';
		} else if (hasMove['substitute'] && hasMove['reversal']) {
			item = 'Liechi Berry';

		// Medium priority
		} else if (counter.Physical >= 4 && ability !== 'Guts' && (!hasMove['bodyslam'] || hasType['Normal']) && !hasMove['fakeout'] && !hasMove['flamecharge'] && !hasMove['rapidspin'] && !isDoubles) {
			item = (template.baseStats.atk >= 100 || ability === 'Huge Power') && template.baseStats.spe >= 60 && template.baseStats.spe <= 108 && !counter['priority'] && this.randomChance(2, 3) ? 'Choice Scarf' : 'Choice Band';
		} else if (counter.Special >= 4 && !hasMove['clearsmog'] && !isDoubles) {
			item = template.baseStats.spa >= 100 && template.baseStats.spe >= 60 && template.baseStats.spe <= 108 && ability !== 'Tinted Lens' && this.randomChance(2, 3) ? 'Choice Scarf' : 'Choice Specs';
		} else if (((counter.Physical >= 3 && hasMove['defog']) || (counter.Special >= 3 && hasMove['healingwish'])) && !counter['priority'] && !hasMove['uturn'] && !isDoubles) {
			item = 'Choice Scarf';
		} else if (counter.Physical >= 3 && (hasMove['copycat'] || hasMove['partingshot']) && !hasMove['fakeout'] && !hasMove['rapidspin'] && !isDoubles) {
			item = 'Choice Band';
		} else if (counter.Special >= 3 && (hasMove['partingshot'] || hasMove['uturn']) && !isDoubles) {
			item = 'Choice Specs';
		} else if (hasMove['raindance'] || hasMove['sunnyday'] || ability === 'Stance Change' && counter.Physical + counter.Special > 2) {
			item = 'Life Orb';
		} else if (hasMove['outrage'] && counter.setupType) {
			item = 'Lum Berry';
		} else if (isDoubles && counter.damagingMoves.length >= 4 && template.baseStats.spe >= 60 && !hasMove['fakeout'] && !hasMove['suckerpunch'] && ability !== 'Sturdy') {
			item = 'Life Orb';
		} else if (isDoubles && this.dex.getEffectiveness('Ice', template) >= 2) {
			item = 'Yache Berry';
		} else if (isDoubles && this.dex.getEffectiveness('Rock', template) >= 2) {
			item = 'Charti Berry';
		} else if (isDoubles && this.dex.getEffectiveness('Fire', template) >= 2) {
			item = 'Occa Berry';
		} else if (isDoubles && this.dex.getImmunity('Fighting', template) && this.dex.getEffectiveness('Fighting', template) >= 2) {
			item = 'Chople Berry';
		} else if (this.dex.getEffectiveness('Rock', template) >= 2 || (this.dex.getEffectiveness('Rock', template) >= 1 && (hasMove['courtchange'] || hasMove['defog'] || hasMove['rapidspin'])) && !isDoubles) {
			item = 'Heavy-Duty Boots';
		} else if ((hasMove['clearsmog'] || hasMove['coil'] || hasMove['curse'] || hasMove['protect'] || hasMove['sleeptalk']) && !isDoubles) {
			item = 'Leftovers';

		// Better than Leftovers
		} else if ((template.species === 'Necrozma-Dusk-Mane' && counter.setupType) || counter.damagingMoves.length >= 3 && !!counter['speedsetup'] && template.baseStats.hp + template.baseStats.def + template.baseStats.spd >= 300) {
			item = 'Weakness Policy';
		} else if (counter.damagingMoves.length >= 4 && template.baseStats.hp + template.baseStats.def + template.baseStats.spd >= 235) {
			item = 'Assault Vest';
		} else if (isLead && !['Disguise', 'Sturdy'].includes(ability) && !hasMove['substitute'] && !counter['recoil'] && !counter['recovery'] && template.baseStats.hp + template.baseStats.def + template.baseStats.spd < 255 && !isDoubles) {
			item = 'Focus Sash';
		} else if (ability === 'Water Bubble' && !isDoubles) {
			item = 'Mystic Water';
		} else if (hasMove['clangoroussoul'] || hasMove['boomburst'] && !!counter['speedsetup']) {
			item = 'Throat Spray';
		} else if (this.dex.getEffectiveness('Rock', template) >= 1 && (ability === 'Intimidate' || !!counter['recovery']) && !hasMove['bulkup'] && !hasMove['calmmind'] && !isDoubles) {
			item = 'Heavy-Duty Boots';
		} else if (this.dex.getEffectiveness('Ground', template) >= 2 && ability !== 'Levitate' && !hasAbility['Iron Barbs']) {
			item = 'Air Balloon';
		} else if (counter.damagingMoves.length >= 4 && !counter['Dark'] && !counter['Dragon'] && !counter['Normal']) {
			item = 'Expert Belt';
		} else if (counter.damagingMoves.length >= 3 && ability !== 'Sturdy' && !hasMove['dragontail'] && !hasMove['foulplay'] && !hasMove['rapidspin'] && !hasMove['substitute'] && !hasMove['uturn']) {
			if (!!counter['speedsetup'] || hasMove['trickroom'] || !!counter['drain'] || hasMove['psystrike'] || template.baseStats.spe > 40 && template.baseStats.hp + template.baseStats.def + template.baseStats.spd < 275) item = 'Life Orb';
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && hasType['Poison']) {
			item = 'Black Sludge';
		}

		let level;

		if (!isDoubles) {
			/** @type {{[tier: string]: number}} */
			const levelScale = {
				uber: 72, ou: 80, uu: 82, ru: 84, nu: 86, pu: 88,
			};
			/** @type {{[species: string]: number}} */
			const customScale = {
				Glalie: 72, 'Darmanitan-Galar-Zen': 80, Wobbuffet: 80, Zygarde: 80,
				Delibird: 100, Shedinja: 100,
			};
			let tier = toID((template.isGigantamax ? this.dex.getTemplate(template.baseSpecies) : template).tier).replace('bl', '');
			// For future DLC Pokemon
			if (tier === 'illegal') {
				tier = toID(Dex.mod('gen7').getTemplate(template.species).tier);
				switch (tier) {
				case 'uubl': case 'uu':
					tier = 'ou';
					break;
				case 'rubl': case 'ru':
					tier = 'uu';
					break;
				case 'nubl': case 'nu': case 'publ': case 'pu':
					tier = 'ru';
					break;
				}
			}
			level = levelScale[tier] || (template.nfe ? 90 : 80);
			if (customScale[template.species]) level = customScale[template.species];
		} else {
			// We choose level based on BST. Min level is 70, max level is 99. 600+ BST is 70, less than 300 is 99. Calculate with those values.
			// Every 10.34 BST adds a level from 70 up to 99. Results are floored.
			let baseStats = template.baseStats;

			let bst = baseStats.hp + baseStats.atk + baseStats.def + baseStats.spa + baseStats.spd + baseStats.spe;
			// Adjust levels of mons based on abilities (Pure Power, Sheer Force, etc.) and also Eviolite
			// For the stat boosted, treat the Pokemon's base stat as if it were multiplied by the boost. (Actual effective base stats are higher.)
			let templateAbility = (baseTemplate === template ? ability : template.abilities[0]);
			if (templateAbility === 'Huge Power' || templateAbility === 'Pure Power') {
				bst += baseStats.atk;
			}
			if (item === 'Eviolite') {
				bst += 0.5 * (baseStats.def + baseStats.spd);
			} else if (item === 'Light Ball') {
				bst += baseStats.atk + baseStats.spa;
			}
			level = 70 + Math.floor(((600 - this.dex.clampIntRange(bst, 300, 600)) / 10.34));
		}

		// Prepare optimal HP
		let srWeakness = this.dex.getEffectiveness('Rock', template);
		while (evs.hp > 1) {
			let hp = Math.floor(Math.floor(2 * template.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (hasMove['substitute'] && hasMove['reversal']) {
				// Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else if (hasMove['substitute'] && (item === 'Sitrus Berry' || (hasMove['bellydrum'] && item === 'Salac Berry'))) {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (hasMove['bellydrum'] && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		if (!counter['Physical'] && !hasMove['copycat'] && !hasMove['transform']) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		if (hasMove['gyroball'] || hasMove['trickroom']) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		return {
			name: template.baseSpecies,
			species: species,
			gender: template.gender,
			moves: moves,
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level: level,
			shiny: this.randomChance(1, 1024),
		};
	}

	/**
	 * @param {string} type
	 * @param {RandomTeamsTypes.RandomSet[]} pokemon
	 * @param {boolean=} isMonotype
	 */
	getPokemonPool(type, pokemon = [], isMonotype = false) {
		const exclude = pokemon.map(p => toID(p.species));
		const pokemonPool = [];
		for (let id in this.dex.data.FormatsData) {
			let template = this.dex.getTemplate(id);
			if (template.gen > this.gen || exclude.includes(template.id)) continue;
			if (template.isMega || template.isPrimal) continue;
			if (!template.randomBattleMoves) continue;
			if (isMonotype) {
				if (template.types.indexOf(type) < 0) continue;
				if (template.battleOnly) {
					template = this.dex.getTemplate(/** @type {string} */ (template.battleOnly));
					if (template.types.indexOf(type) < 0) continue;
				}
			}
			pokemonPool.push(id);
		}
		return pokemonPool;
	}

	randomTeam() {
		const seed = this.prng.seed;
		const ruleTable = this.dex.getRuleTable(this.format);
		let pokemon = [];

		// For Monotype
		const isMonotype = ruleTable.has('sametypeclause');
		const typePool = Object.keys(this.dex.data.TypeChart);
		const type = this.sample(typePool);

		// PotD stuff
		let potd;
		if (global.Config && Config.potd && ruleTable.has('potd')) {
			potd = this.dex.getTemplate(Config.potd);
		}

		/**@type {{[k: string]: number}} */
		let baseFormes = {};
		/**@type {{[k: string]: number}} */
		let tierCount = {};
		/**@type {{[k: string]: number}} */
		let typeCount = {};
		/**@type {{[k: string]: number}} */
		let typeComboCount = {};
		/**@type {RandomTeamsTypes.TeamDetails} */
		let teamDetails = {};

		// We make at most two passes through the potential Pokemon pool when creating a team - if the first pass doesn't
		// result in a team of six Pokemon we perform a second iteration relaxing as many restrictions as possible.
		for (const restrict of [true, false]) {
			if (pokemon.length >= 6) break;
			const pokemonPool = this.getPokemonPool(type, pokemon, isMonotype);
			while (pokemonPool.length && pokemon.length < 6) {
				let template = this.dex.getTemplate(this.sampleNoReplace(pokemonPool));
				if (!template.exists) continue;

				// Limit to one of each species (Species Clause)
				if (baseFormes[template.baseSpecies]) continue;

				let tier = template.tier;
				let types = template.types;
				let typeCombo = types.slice().sort().join();

				// Adjust rate for species with multiple formes
				switch (template.baseSpecies) {
				case 'Arceus': case 'Silvally':
					if (this.randomChance(17, 18)) continue;
					break;
				case 'Rotom':
					if (this.randomChance(5, 6)) continue;
					break;
				case 'Deoxys': case 'Gourgeist': case 'Oricorio':
					if (this.randomChance(3, 4)) continue;
					break;
				case 'Castform': case 'Kyurem': case 'Lycanroc': case 'Necrozma': case 'Wormadam':
					if (this.randomChance(2, 3)) continue;
					break;
				case 'Basculin': case 'Cherrim': case 'Floette': case 'Giratina': case 'Hoopa': case 'Landorus': case 'Meloetta': case 'Meowstic': case 'Shaymin': case 'Thundurus': case 'Tornadus':
					if (this.randomChance(1, 2)) continue;
					break;
				case 'Dugtrio': case 'Exeggutor': case 'Golem': case 'Greninja': case 'Marowak': case 'Muk': case 'Ninetales': case 'Persian': case 'Raichu': case 'Sandslash': case 'Zygarde':
					if (this.gen >= 7 && this.randomChance(1, 2)) continue;
					break;
				case 'Darmanitan':
					if (this.gen >= 8 && this.randomChance(2, 3)) continue;
					break;
				case 'Corsola': case 'Indeedee': case 'Mr. Mime': case 'Rapidash': case 'Stunfisk': case 'Toxtricity': case 'Weezing': case 'Zacian': case 'Zamazenta':
				case 'Appletun': case 'Butterfree': case 'Copperajah': case 'Grimmsnarl':
					if (this.gen >= 8 && this.randomChance(1, 2)) continue;
					break;
				}

				if (restrict) {
					// Limit one Pokemon per tier, two for Monotype
					if ((tierCount[tier] >= (isMonotype ? 2 : 1)) && this.randomChance(4, 5)) {
						continue;
					}

					if (!isMonotype) {
						// Limit two of any type
						let skip = false;
						for (const type of types) {
							if (typeCount[type] > 1) {
								skip = true;
								break;
							}
						}
						if (skip) continue;
					}

					// Limit 1 of any type combination, 2 in Monotype
					if (typeComboCount[typeCombo] >= (isMonotype ? 2 : 1)) continue;
				}

				// The Pokemon of the Day
				if (potd && potd.exists && pokemon.length < 1) template = potd;

				let set = this.randomSet(template, teamDetails, pokemon.length === 5, this.format.gameType !== 'singles');

				let item = this.dex.getItem(set.item);

				// Limit 1 Z-Move per team
				if (item.zMove && teamDetails['zMove']) continue;

				// Zoroark copies the last Pokemon
				if (set.ability === 'Illusion') {
					if (pokemon.length < 1) continue;
					set.level = pokemon[pokemon.length - 1].level;
				}

				// Okay, the set passes, add it to our team
				pokemon.unshift(set);

				// Don't bother tracking details for the 6th Pokemon
				if (pokemon.length === 6) break;

				// Now that our Pokemon has passed all checks, we can increment our counters
				baseFormes[template.baseSpecies] = 1;

				// Increment tier counter
				if (tierCount[tier]) {
					tierCount[tier]++;
				} else {
					tierCount[tier] = 1;
				}

				// Increment type counters
				for (const type of types) {
					if (type in typeCount) {
						typeCount[type]++;
					} else {
						typeCount[type] = 1;
					}
				}
				if (typeCombo in typeComboCount) {
					typeComboCount[typeCombo]++;
				} else {
					typeComboCount[typeCombo] = 1;
				}

				// Team has Mega/weather/hazards
				if (item.megaStone) teamDetails['megaStone'] = 1;
				if (item.zMove) teamDetails['zMove'] = 1;
				if (set.ability === 'Snow Warning' || set.moves.includes('hail')) teamDetails['hail'] = 1;
				if (set.moves.includes('raindance') || set.ability === 'Drizzle' && !item.onPrimal) teamDetails['rain'] = 1;
				if (set.ability === 'Sand Stream') teamDetails['sand'] = 1;
				if (set.moves.includes('sunnyday') || set.ability === 'Drought' && !item.onPrimal) teamDetails['sun'] = 1;
				if (set.moves.includes('spikes')) teamDetails['spikes'] = (teamDetails['spikes'] || 0) + 1;
				if (set.moves.includes('stealthrock')) teamDetails['stealthRock'] = 1;
				if (set.moves.includes('stickyweb')) teamDetails['stickyWeb'] = 1;
				if (set.moves.includes('toxicspikes')) teamDetails['toxicSpikes'] = 1;
				if (set.moves.includes('defog')) teamDetails['defog'] = 1;
				if (set.moves.includes('rapidspin')) teamDetails['rapidSpin'] = 1;
			}
		}
		if (pokemon.length < 6) throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);

		return pokemon;
	}
}

module.exports = RandomTeams;
