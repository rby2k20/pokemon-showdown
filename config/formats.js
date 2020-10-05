'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js
/**@type {(FormatsData | {section: string, column?: number})[]} */
let Formats = [


	// RBY 2K20 Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "RBY 2K20 Tiers"
	},
	{
		name: "[Gen 1] 1U",
		desc: `RBY with movepool additions from the Time Capsule.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/rby-tradebacks-ou">Information</a>`,
		],

		mod: 'gen1',
		ruleset: ['Obtainable', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber',],
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
		section: "Smogon Tiers"
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
		name: "[Gen 1] NU (Alpha)",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/rby-nu-pre-alph-viability-ranking.3668913/">RBY NU Alpha Viability Rankings</a>`,
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
		desc: `The official format for Red and Green from 1997.`,

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
	name: "[Gen 1] Stadium Anything Goes",
	desc: `The Pokemon Stadium Anything Goes format, taken directly from the ruleset in-game.`,
	mod: 'stadium',
		ruleset: ['Obtainable', 'Team Preview', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Nickname Clause', 'Endless Battle Clause', 'Exact HP Mod', 'Cancel Mod',
			  'Allow Tradeback'],
		banlist: ['Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',],
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
	},

	// Yellow Colosseum2 Metagames, in beta
	///////////////////////////////////////////////////////////////////
	{
		section: "Yellow Colosseum 2 Metagames",
		column: 2,
	},
	{
        name: "[Gen 1] Yellow Poke Cup",
        desc: `Yellow Poke Cup, a port of the Nintendo Cup 1997.`,
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
        name: "[Gen 1] Yellow Pika Cup",
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
	},

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
		desc: `A balance mod for Gen 1.`,
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
        desc: `A balance mod for Gen 1.`,
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
	{
		name: "[Gen 1] Doubles OU",
		desc: `A modified Gen 1 sim made with the intention of making Doubles possible. It uses Gen 3 Doubles Mechanics; Surf targets two opponents, you switch out immediately upon fainting, and spread move damage is halved.`,

		mod: 'gen1doubles',
		gameType: 'doubles',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Wrap', 'Fire Spin', 'Clamp', 'Bind'],
	},

	// Hacked Formats
	///////////////////////////////////////////////////////////////////
	{
		section: "Hacked Formats",
		column: 3,
	},
	{
		name: "[Gen 1] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656851/">Pure Hackmons</a>`,
		],

		mod: 'gen1',
		debug: true,
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 255,
		ruleset: ['-Nonexistent', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
		unbanlist: ['MissingNo.'],
	},
	{
		name: "[Gen 1] Balanced Hackmons",
		desc: `A more balanced form of Hackmons.`,

		mod: 'gen1',
		debug: true,
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 255,
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod', 'Freeze Clause Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: ['Mewtwo', 'Wrap', 'Fire Spin', 'Clamp', 'Bind'],
		unbanlist: ['MissingNo.'],
	},

	// Randomized Formats
	///////////////////////////////////////////////////////////////////
	{
		section: "Randomized Formats",
		column: 3,
	},
	{
		name: "[Gen 1] Random Battle",
		desc: `Randomized teams of Pok&eacute;mon, balanced to give each player an equal shot at winning.`,

		mod: 'gen1',
		team: 'random',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] Random Battle (Auto Level Adjusted)",
		desc: `A variation of Gen 1 Random Battle developed by Estu that takes wins and losses to adjust the levels automatically.`,
		threads:  [
			`&bullet; <a href="https://www.smogon.com/forums/threads/random-battles.3526564/post-7643404">Introductory Thread</a>`,
			`&bullet; <a href="https://pastebin.com/J4Vft6wk">Overview</a>`,
		],

		mod: 'gen1',
		team: 'randomAutoLevelAdjusted',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] Challenge Cup",
		desc: `Randomized teams of Pok&eacute;mon, limited only by what's available in-game.`,

		mod: 'gen1',
		team: 'randomCC',
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod'],
	},
	//FINISHME: There is a finished JSON File for Gen 1 Battle Factory in the gen1 Mod folder, by yours truly.
	//The issue is, we lack a randomizer for it, so we can't actually use it. - Plague von Karma
	/*{
		name: "[Gen 1] Battle Factory",
		desc: `Randomized teams of Pok&eacute;mon for a generated Smogon tier with sets that are competitively viable.`,

		mod: 'gen1',
		team: 'randomFactory',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},*/
	{
		name: '[Gen 1] Metronome Battle',
		desc: `A metagame where you can only use Metronome!`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3632075/">Metronome Battle</a>`,
			`&bullet; <a href="https://www.pokemonperfect.com/forums/index.php?threads/metronome.3372//">RBY Metronome Probability</a>`,
		],

		mod: 'gen1',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Pound', 'Karate Chop', 'Double Slap', 'Comet Punch', 'Mega Punch', 'Pay Day', 'Fire Punch', 'Ice Punch', 'Thunder Punch', 'Scratch', 'Vise Grip',
			'Guillotine', 'Razor Wind', 'Swords Dance', 'Cut', 'Gust', 'Wing Attack', 'Whirlwind', 'Fly', 'Bind', 'Slam', 'Vine Whip', 'Stomp', 'Double Kick',
			'Mega Kick', 'JumpKick', 'Rolling Kick', 'Sand Attack', 'Headbutt', 'Horn Attack', 'Fury Attack', 'Horn Drill', 'Tackle', 'Body Slam', 'Wrap',
			'Take Down', 'Thrash', 'Double-Edge', 'Tail Whip', 'Poison Sting', 'Twineedle', 'Pin Missile', 'Leer', 'Bite', 'Growl', 'Roar', 'Sing', 'Supersonic',
			'Sonicboom', 'Disable', 'Acid', 'Ember', 'Flamethrower', 'Mist', 'Water Gun', 'Hydro Pump', 'Surf', 'Ice Beam', 'Blizzard', 'Psybeam', 'Bubblebeam',
			'Aurora Beam', 'Hyper Beam', 'Peck', 'Drill Peck', 'Submission', 'Low Kick', 'Counter', 'Seismic Toss', 'Strength', 'Absorb', 'Mega Drain',
			'Leech Seed', 'Growth', 'Razor Leaf', 'Solar Beam', 'Poisonpowder', 'Stun Spore', 'Sleep Powder', 'Petal Dance', 'String Shot', 'Dragon Rage',
			'Fire Spin', 'Thundershock', 'Thunderbolt', 'Thunder Wave', 'Thunder', 'Rock Throw', 'Earthquake', 'Fissure', 'Dig', 'Toxic', 'Confusion', 'Psychic',
			'Hypnosis', 'Meditate', 'Agility', 'Quick Attack', 'Rage', 'Teleport', 'Night Shade', 'Mimic', 'Screech', 'Double Team', 'Recover', 'Harden', 'Minimize',
			'Smokescreen', 'Confuse Ray', 'Withdraw', 'Defense Curl', 'Barrier', 'Light Screen', 'Haze', 'Reflect', 'Focus Energy', 'Bide', 'Mirror Move', 'Selfdestruct',
			'Egg Bomb', 'Lick', 'Smog', 'Sludge', 'Bone Club', 'Fire Blast', 'Waterfall', 'Clamp', 'Swift', 'Skull Bash', 'Spike Cannon', 'Constrict', 'Amnesia', 'Kinesis',
			'Softboiled', 'Hi Jump Kick', 'Glare', 'Dream Eater', 'Poison Gas', 'Barrage', 'Leech Life', 'Lovely Kiss', 'Sky Attack', 'Transform', 'Bubble', 'Dizzy Punch',
			'Spore', 'Flash', 'Psywave', 'Splash', 'Acid Armor', 'Crabhammer', 'Explosion', 'Fury Swipes', 'Bonemerang', 'Rest', 'Rock Slide', 'Hyper Fang', 'Sharpen', 'Conversion',
			'Tri Attack', 'Super Fang', 'Slash', 'Substitute'],
		onValidateSet(set) {
			if (set.moves.length !== 1 || this.dex.getMove(set.moves[0]).id !== 'metronome') {
				return [`${set.name || set.species} has illegal moves.`, `(Pok\u00e9mon can only have one Metronome in their moveset)`];
			}
		},
	},

	// Miscellaneous Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Misc. Metagames",
		column: 4,
	},
	{
		name: "[Gen 1] Anything Goes",
		desc: `A metagame where anything is allowed!.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3587441/">Anything Goes Metagame Discussion</a>`,
		],

		mod: 'gen1',
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Allow Tradeback'],
		banlist: ['Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
	},
	{
		name: "[Gen 1] NFE",
		desc: `A metagame that only allows NFE and LC Pokemon.`,
		mod: 'gen1',
		ruleset: ['Standard', 'Not Fully Evolved'],
	},
	{
		name: "[Gen 1] Middle Cup",
		desc: `A metagame that only allows the 16 NFEs available in RBY.`,
		threads: [
			`&bullet; <a href="https://docs.google.com/document/d/1ZJk6uxtDPgCrSO_2GcwmmAFmTUZGsPsW5Jncf6h9rDE/edit?usp=sharing">Meloyy's Middle Cup Guide</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-side-formats-pika-cup-petit-cup-little-cup-level-100-and-middle-cup.3651579/post-8162599">Gen 1 Side Formats Thread</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard', 'Not Fully Evolved'],
		banlist: ['LC']
	},
	{
		name: "[Gen 1] LC",
		desc: `The Gen 1 LC Format. It allows Tradebacks to preserve the L5 formula.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/old-generations-little-cup-discussion-currently-has-threatlist-for-rby-only.3450397/">RBY LC Guide</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/rby-little-cup-tradebacks.3533572/">RBY LC Guide w/Tradebacks by Jellicent</a>`,
		],

		mod: 'gen1',
		maxLevel: 5,
		ruleset: ['Standard', 'Little Cup', 'Allow Tradeback'],
		banlist: ['Dragon Rage', 'Sonic Boom', 'Wrap', 'NFE', 'Clefairy'],
	},
	{
		name: "[Gen 1] LC L100",
		desc: `An alternative to conventional Gen 1 Little Cup that aims to create a Tradeback-free format.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-side-formats-pika-cup-petit-cup-little-cup-level-100-and-middle-cup.3651579/page-2#post-8484942">LC L100 Resources</a>`,
		],

		mod: 'gen1',
		maxLevel: 100,
		ruleset: ['Standard', 'Not Fully Evolved'],
		banlist: ['NFE'],
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
		banlist: ['Explosion', 'Self-Destruct', 'Clamp', 'Bind', 'Wrap', 'Fire Spin', 'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
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
		banlist: ['Uber', 'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
	},
	{
		name: "[Gen 1] Mediocremons",
		desc: `A metagame where only Pokemon with no base stat above 100 are allowed.`,

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Alakazam', 'Cloyster', 'Exeggutor', 'Gengar', 'Golem', 'Jolteon', 'Lapras', 'Rhydon', 'Slowbro',
			  'Snorlax', 'Starmie', 'Tauros', 'Zapdos', 'Aerodactyl', 'Arcanine', 'Articuno', 'Blastoise', 'Charizard',
			  'Dodrio', 'Dragonite', 'Dugtrio', 'Electabuzz', 'Electrode', 'Fearow', 'Flareon', 'Graveler', 'Gyarados',
			  'Hitmonchan', 'Hitmonlee', 'Hypno', 'Kabutops', 'Kadabra', 'Kangaskhan', 'Kingler', 'Machamp', 'Magneton',
			  'Marowak', 'Moltres', 'Mr. Mime', 'Muk', 'Ninetales', 'Omastar', 'Onix', 'Persian', 'Pinsir', 'Primeape',
			  'Raichu', 'Rapidash', 'Sandslash', 'Scyther', 'Tangela', 'Tentacruel', 'Vaporeon', 'Venusaur', 'Victreebel',
			  'Vileplume', 'Weezing', 'Wigglytuff', 'Haunter', 'Machoke', 'Abra', 'Gastly', 'Geodude', 'Jigglypuff', 'Krabby',
			  'Omanyte', 'Shellder', 'Tentacool', 'Voltorb', 'Chansey'],
	},
	//FIXME: This doesn't work for some reason. I have a thing in rulesets.js for it, but the code breaks when used. It may be the .ts I copied it from? - Plague
	/*{
		name: "[Gen 1] Flipped",
		desc: `Every Pok&eacute;mon's stats are reversed. HP becomes Spe, Atk becomes Spc, Def stays the same.`,

		mod: 'gen1',
		ruleset: ['Standard', 'Flipped Mod'],
		banlist: ['Uber',],
	},*/
	{
		name: "[Gen 1] Scalemons",
		desc: `All stats but HP are scaled to make a Pokemon's BST as close to 600 as possible.`,

		mod: 'gen1',
		ruleset: ['Standard', 'Scalemons Mod'],
		banlist: ['Uber', 'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'],
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
		banlist: ['Mewtwo', 'Mew',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
			 ],
		restricted: ['Spore'],
	},
	{
		name: "[Gen 1] Camomons",
		desc: `Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
		],

		mod: 'gen1',
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: ['Mewtwo', 'Mew',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
			 ],
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
	{
		name: "[Gen 1] Stadium Custom Game",

		mod: 'stadium',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	// Pokemon Perfect Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Pokemon Perfect Tiers",
		column: 5,
	},
	{
		name: "[Gen 1] PP 1U",

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Psywave', 'Uber'],
	},
	{
		name: "[Gen 1] PP 2U",

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Psywave', 'Alakazam', 'Chansey', 'Cloyster', 'Exeggutor', 'Gengar', 'Golem', 'Jolteon',
			  'Jynx', 'Lapras', 'Rhydon', 'Slowbro', 'Snorlax', 'Starmie', 'Tauros', 'Zapdos'],
	},
	{
		name: "[Gen 1] PP 3U",

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Psywave', 'Uber','Alakazam', 'Chansey', 'Cloyster', 'Exeggutor', 'Gengar', 'Golem', 'Jolteon',
			  'Jynx', 'Lapras', 'Rhydon', 'Slowbro', 'Snorlax', 'Starmie', 'Tauros', 'Zapdos', 'Articuno',
			  'Dodrio', 'Dragonite', 'Gyarados', 'Haunter', 'Hypno', 'Kadabra', 'Kangaskhan', 'Moltres', 'Persian',
			  'Poliwrath', 'Raichu', 'Raticate', 'Tentacruel', 'Victreebel'],
	},
	{
		name: "[Gen 1] PP 4U",

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Psywave', 'Uber', 'Alakazam', 'Chansey', 'Cloyster', 'Exeggutor', 'Gengar', 'Golem', 'Jolteon',
			  'Jynx', 'Lapras', 'Rhydon', 'Slowbro', 'Snorlax', 'Starmie', 'Tauros', 'Zapdos', 'Articuno', 'Dodrio',
			  'Dragonite', 'Gyarados', 'Haunter', 'Hypno', 'Kadabra', 'Kangaskhan', 'Moltres', 'Persian', 'Poliwrath',
			  'Raichu', 'Raticate', 'Tentacruel', 'Victreebel', 'Aerodactyl', 'Charizard', 'Clefable', 'Dewgong', 'Dugtrio',
			  'Electabuzz', 'Exeggcute', 'Fearow', 'Golduck', 'Kingler', 'Mr. Mime', 'Pinsir', 'Poliwhirl', 'Sandslash', 'Vaporeon',
			  'Venusaur', 'Wigglytuff'],
	},
	{
		name: "[Gen 1] PP 5U",

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Psywave', 'Uber', 'Alakazam', 'Chansey', 'Cloyster', 'Exeggutor', 'Gengar', 'Golem', 'Jolteon',
			  'Jynx', 'Lapras', 'Rhydon', 'Slowbro', 'Snorlax', 'Starmie', 'Tauros', 'Zapdos', 'Articuno', 'Dodrio', 'Dragonite',
			  'Gyarados', 'Haunter', 'Hypno', 'Kadabra', 'Kangaskhan', 'Moltres', 'Persian', 'Poliwrath', 'Raichu', 'Raticate', 'Tentacruel',
			  'Victreebel', 'Aerodactyl', 'Charizard', 'Clefable', 'Dewgong', 'Dugtrio', 'Electabuzz', 'Exeggcute', 'Fearow',
			  'Golduck', 'Kingler', 'Mr. Mime', 'Pinsir', 'Poliwhirl', 'Sandslash', 'Vaporeon', 'Venusaur', 'Wigglytuff',
			  'Abra', 'Arcanine', 'Blastoise', 'Nidoking', 'Nidoqueen', 'Omastar', 'Porygon', 'Rapidash', 'Scyther',
			  'Slowpoke', 'Staryu', 'Tangela', 'Venomoth'],
	},
	{
		name: "[Gen 1] PP 6U",

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Psywave', 'Uber', 'Alakazam', 'Chansey', 'Cloyster', 'Exeggutor', 'Gengar', 'Golem', 'Jolteon', 'Jynx', 'Lapras',
			  'Rhydon', 'Slowbro', 'Snorlax', 'Starmie', 'Tauros', 'Zapdos', 'Articuno', 'Dodrio', 'Dragonite', 'Gyarados',
			  'Haunter', 'Hypno', 'Kadabra', 'Kangaskhan', 'Moltres', 'Persian', 'Poliwrath', 'Raichu', 'Raticate', 'Tentacruel',
			  'Victreebel', 'Aerodactyl', 'Charizard', 'Clefable', 'Dewgong', 'Dugtrio', 'Electabuzz', 'Exeggcute', 'Fearow',
			  'Golduck', 'Kingler', 'Mr. Mime', 'Pinsir', 'Poliwhirl', 'Sandslash', 'Vaporeon', 'Venusaur', 'Wigglytuff',
			  'Abra', 'Arcanine', 'Blastoise', 'Nidoking', 'Nidoqueen', 'Omastar', 'Porygon', 'Rapidash', 'Scyther',
			  'Slowpoke', 'Staryu', 'Tangela', 'Venomoth', 'Arbok', 'Dragonair', 'Drowzee', 'Electrode', 'Gastly',
			  'Graveler', 'Lickitung', 'Magmar', 'Ninetales', 'Parasect', 'Poliwag', 'Primeape', 'Seadra', 'Seaking',
			  'Vileplume', 'Wartortle'],
	},
];

exports.Formats = Formats;
