'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js
/**@type {(FormatsData | {section: string, column?: number})[]} */
let Formats = [


	// RBY 2K20 Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "RBY 2K20 Metagames"
	},
	{
		name: "[Gen 1] 1U",
		desc: `RBY with movepool additions from the Time Capsule.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/rby-tradebacks-ou">Information</a>`,
		],

		mod: 'gen1',
		ruleset: ['Obtainable', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
		{
		name: "[Gen 1] 1U (Blitz)",
		desc: `RBY with movepool additions from the Time Capsule.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/rby-tradebacks-ou">Information</a>`,
		],

		mod: 'gen1',
		ruleset: ['Obtainable', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod', 'Blitz'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	
	// Smogon Formats
	///////////////////////////////////////////////////////////////////
	{
		section: "Smogon Formats"
	},
	{
		name: "[Gen 1] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286283/">RBY Ubers</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3650478/#post-8133786">RBY Sample Teams</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
		{
		name: "[Gen 1] OU (Blitz)",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3650478/#post-8133786">RBY Sample Teams</a>`,
		],

		mod: 'gen1',
		ruleset: ['[Gen 1] OU', 'Blitz'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU General Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Ranking</a>`,
		],

		mod: 'gen1',
		ruleset: ['[Gen 1] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 1] NU (Beta)",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU General Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Ranking</a>`,
		],

		mod: 'gen1',
		ruleset: ['[Gen 1] OU'],
		banlist: ['OU', 'UUBL', 'Articuno', 'Dodrio', 'Dragonite', 'Dugtrio', 'Electabuzz', 'Golem', 'Golduck', 'Gyarados', 'Haunter', 'Hypno', 'Kadabra', 'Kangaskhan', 'Omastar', 'Persian', 'Poliwrath', 'Raichu', 'Tangela', 'Tentacruel', 'Vaporeon'],
	},
	{
		name: "[Gen 1] Stadium OU",

		mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Exact HP Mod', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	
	// Nintendo Cup
	///////////////////////////////////////////////////////////////////
	{
		section: "Nintendo Cup",
		column: 2,
	},
	{
		name: "[Gen 1] Nintendo Cup 97",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3650478/#post-8133786">RBY Sample Teams</a>`,
		],

		mod: 'gen1jpn',
		cupLevelLimit: [50, 55, 155],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'RGB 1997', 'Species Clause', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber'],
	},
    {
        name: "[Gen 1] Nintendo Cup 98",
        desc: `Nintendo Cup that only allowed specific in-game Pokemon, played on Stadium.`,
        mod: 'stadium', //to-do: make a stadiumjp format. Once that's done, move this to Stadium Metagames, as it is technically a format anyway. 
        ruleset: ['Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
        banlist: ['Uber', 'OU', 'UUBL', 'UU', 'NUBL', 'NU', 'NFE', 'LC', 'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp', 'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
        unbanlist: ['Beedrill','Fearow','Pikachu','Nidoqueen','Nidoking','Dugtrio','Primeape','Arcanine','Alakazam','Machamp','Golem','Magneton','Cloyster','Gengar','Onix','Hypno','Electrode','Exeggutor','Chansey','Kangaskhan','Starmie','Scyther','Jynx','Pinsir','Tauros','Gyarados','Lapras','Ditto','Vaporeon','Jolteon','Flareon','Aerodactyl','Snorlax'],
        maxLevel: 30,
        teamLength: {
            validate: [3, 6],
            battle: 3,
        },
    },
	{
        name: "[Gen 1] Nintendo Cup 99",
        desc: `Nintendo Cup that banned winning NC97 Pokemon, played on Stadium.`,
        mod: 'stadium', //to-do: make a stadiumjp format
        ruleset: ['Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod'],
        banlist: ['Venusaur','Dugtrio','Alakazam','Golem','Magneton','Gengar','Hypno','Electrode','Exeggutor','Chansey','Kangaskhan','Starmie','Jynx','Tauros','Gyarados','Lapras','Ditto','Vaporeon','Jolteon','Snorlax','Articuno','Zapdos','Dragonite','Mewtwo','Mew','Flareon + Focus Energy + Ember','Nidoking + Fury Attack + Thrash'],
        maxLevel: 50,
        teamLength: {
            validate: [3, 6],
            battle: 3,
        },
    },

	// Stadium Metagames
	///////////////////////////////////////////////////////////////////
	{
		section: "Stadium Metagames",
		column: 2,
	},
    {
        name: "[Gen 1] Poke Cup",
        desc: `Stadium Poke Cup, a port of the Nintendo Cup 1997 format to the N64. This introduced the format to an international audience.`,
        mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
		cupLevelLimit: [50, 55, 155],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
	},
	{
        name: "[Gen 1] Pika Cup",
        desc: `Stadium Pika Cup, played in the Stadium World Tour in the year 2000.`,
        mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
		cupLevelLimit: [15, 20, 50],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
	},
	{
        name: "[Gen 1] Petit Cup",
        desc: `Stadium Petit Cup, played in various tournaments in the 2000s.`,
        mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
		cupLevelLimit: [25, 30, 80],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
	},
	{
	name: "[Gen 1] Prime Cup",
	desc: `Pokemon Stadium's Prime Cup format. Played in the Stadium World Tour in the year 2000.`,
	mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Nickname Clause', 'Exact HP Mod', 'Cancel Mod'],
		banlist: ['Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',],
	teamLength: {
		validate: [3, 6],
		battle: 3,
	},
	{
	name: "[Gen 1] Stadium AG",
	desc: `The Pokemon Stadium Anything Goes format, taken directly from the ruleset in-game.`,
	mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Nickname Clause', 'Endless Battle Clause', 'Exact HP Mod', 'Cancel Mod'],
		banlist: ['Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',],
	},
	
	// Yellow Colosseum2 Metagames, commented out until the proper sleep can be added in a mod. 
	///////////////////////////////////////////////////////////////////
	/*{
		section: "Yellow Colosseum2 Metagames",
		column: 2,
	},
	{
        name: "[Gen 1] Poke Cup",
        desc: `Yellow Poke Cup, a port of the Nintendo Cup 1997 format to the N64. This introduced the format to an international audience.`,
        mod: 'gen1',
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
		cupLevelLimit: [50, 55, 155],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
	},
	{
        name: "[Gen 1] Pika Cup",
        desc: `Yellow Pika Cup, played in the Stadium World Tour in the year 2000.`,
        mod: 'gen1',
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
		cupLevelLimit: [15, 20, 50],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
	},
	{
        name: "[Gen 1] Yellow Petit Cup",
        desc: `Yellow Petit Cup, played in various tournaments in the 2000s.`,
        mod: 'gen1',
		ruleset: ['Obtainable', 'Team Preview', 'Cup Level Limit', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Exact HP Mod', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
		cupLevelLimit: [25, 30, 80],
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
	/*},
 
	// Modded Formats
	///////////////////////////////////////////////////////////////////
	{
		section: "Modded Formats",
		column: 3,
	},
	/*{
		name: "[Gen 3] ADV 50",
		threads: [
			`&bullet; <a href="https://www.pokemonperfect.com/forums/index.php?threads/rules-discussion-thread.4222/">ADV 50 Metagame Discussion</a>`,
			`&bullet; <a href="https://www.pokemonperfect.com/forums/index.php?threads/viability-rankings.4975/">ADV 50 Viability Rankings</a>`,
		],

		mod: 'gen3',
		ruleset: ['Standard'],
		banlist: ['Uber', 'OU', 'UUBL', 'UU', 'NUBL', 'NU', 'NFE', 'LC', "Mean Look"],
		unbanlist: ['Aggron', 'Altaria', 'Ampharos', 'Armaldo', 'Azumarill', 'Banette', 'Cacturne', 'Camerupt', 'Castform', 'Chimecho', 'Clefable', 'Crawdaunt', 'Crobat', 'Electrode', 'Fearow', 'Flareon', 'Forretress', 'Glalie', 'Golduck', 'Golem', 'Granbull', 'Hitmonlee', 'Huntail', 'Jumpluff', 'Kabutops', 'Kadabra', 'Lanturn', 'Manectric', 'Mantine', 'Meganium', 'Mightyena', 'Misdreavus', 'Muk', 'Nidoqueen', 'Rapidash', 'Sableye', 'Sandslash', 'Scizor', 'Scyther', 'Sharpedo', 'Shiftry', 'Slowking', 'Stantler', 'Steelix', 'Torkoal', 'Typhlosion', 'Venomoth', 'Vileplume', 'Wailord', 'Whiscash'],
	},*/
	{
		name: "[Gen 1] Violet Version",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3650478/#post-8133786">RBY Sample Teams</a>`,
		],

		mod: 'violet',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Uber', 'OU', 'UUBL', 'UU', 'NUBL', 'NU', 'NFE', 'LC'],
		unbanlist: ['Aerodactyl', 'Alakazam', 'Arbok', 'Articuno', 'Beedrill', 'Blastoise', 'Butterfree', 'Chansey', 'Charizard', 'Cloyster', 'Dragonite', 'Dugtrio', 'Electabuzz', 'Electrode', 'Exeggutor', 'Flareon', 'Gengar', 'Golbat', 'Golduck', 'Golem', 'Gyarados', 'Hypno', 'Jynx', 'Kabutops', 'Machamp', 'Magmar', 'Magneton', 'Mew', 'Moltres', 'Muk', 'Nidoqueen', 'Ninetales', 'Parasect', 'Pidgeot', 'Pinsir', 'Poliwrath', 'Porygon', 'Slowbro', 'Snorlax', 'Starmie', 'Tangela', 'Tauros', 'Vileplume', 'Zapdos'],
	},
	{
      name: "[Gen 1] Rose Red / Iris Blue",
        desc: `A balance mod for Gen 1 that adds select future-generation Pokemon.`,
        threads: [
            `<a href="https://www.smogon.com/forums/threads/gen-1-rose-red-iris-blue.3652237/">Rose Red / Iris Blue</a>`,
        ],
        mod: 'roseredirisblue',
        ruleset: ['Standard', 'Team Preview'],
    },
	{
      name: "[Gen 1] Rose Red / Iris Blue Expanded",
        desc: `A balance mod for Gen 1 that adds select future-generation Pokemon.`,
        threads: [
            `<a href="https://www.smogon.com/forums/threads/gen-1-rose-red-iris-blue.3652237/">Rose Red / Iris Blue</a>`,
        ],
        mod: 'roseredirisblue',
        ruleset: ['Standard', 'Team Preview'],
		unbanlist: ['Ampharos', 'Forretress', 'Seviper', 'Zangoose', 'Gogoat', 'Breloom', 'Sceptile'],
    },
	
		// Randomized Formats
	///////////////////////////////////////////////////////////////////
	{
		section: "Randomized Formats",
		column: 3,
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod'],
	},
	
	// Miscellaneous Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Misc. Metagames",
		column: 3,
	},
	{
		name: "[Gen 1] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dp/articles/little_cup_guide">DPP LC Guide</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7336500/">DPP LC Viability Ranking</a>`,
		],

		mod: 'gen1',
		maxLevel: 5,
		ruleset: ['Standard', 'Little Cup'],
	},
	{
		name: "[Gen 1] NFE",
		mod: 'gen1',
		ruleset: ['Standard', 'Not Fully Evolved'],
	},
	{
		name: "[Gen 1] Middle Cup",
		mod: 'gen1',
		ruleset: ['Standard', 'Not Fully Evolved', 'Little Cup'],
	},
	{
		name: "[Gen 1] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031456/">GSC 1v1</a>`,
		],

		mod: 'gen1',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['[Gen 1] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview'],
		banlist: ['Explosion', 'Self-Destruct', 'Clamp', 'Bind', 'Wrap', 'Fire Spin'],
	},
	{
		name: "[Gen 1] Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,

		mod: 'gen1',
		ruleset: ['Same Type Clause', 'Standard'],
		banlist: ['Uber',],
	},
	{
		name: "[Gen 1] Inverse",
		desc: `The effectiveness of each attack is inverted.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666858/">Inverse</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard', 'Inverse Mod'],
		banlist: ['Uber',],
	},
	{
		name: "[Gen 1] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656429/">STABmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658578/">STABmons Resources</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard', 'STABmons Move Legality'],
		banlist: ['Mewtwo', 'Mew'],
		restricted: ['Spore'],
	},
	{
		name: "[Gen 1] Camomons",
		desc: `Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: ['Mewtwo', 'Mew'],
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return Object.assign({}, species, {types: types});
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
];

exports.Formats = Formats;
