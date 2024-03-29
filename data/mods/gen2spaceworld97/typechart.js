'use strict';

/**@type {{[k: string]: ModdedTypeData}} */
let BattleTypeChart = {
		"Fire": {
		inherit: true,
		damageTaken: {
			"Bug": 2,
			"Dark": 0,
			"Dragon": 0,
			"Electric": 0,
			"Fighting": 0,
			"Fire": 2,
			"Flying": 0,
			"Ghost": 0,
			"Grass": 2,
			"Ground": 1,
			"Ice": 2,
			"Normal": 0,
			"Poison": 0,
			"Psychic": 0,
			"Rock": 1,
			"Steel": 2,
			"Water": 1,
		},
	},
	"Ice": {
		inherit: true,
		damageTaken: {
			"Bug": 0,
			"Dark": 0,
			"Dragon": 0,
			"Electric": 0,
			"Fighting": 1,
			"Fire": 1,
			"Flying": 0,
			"Ghost": 0,
			"Grass": 0,
			"Ground": 0,
			"Ice": 2,
			"Normal": 0,
			"Poison": 0,
			"Psychic": 0,
			"Rock": 1,
			"Steel": 1,
			"Water": 0,
		},
	},
	Steel: {
		inherit: true,
		damageTaken: {
			"Bug": 0,
			"Dark": 0,
			"Dragon": 0,
			"Electric": 1,
			"Fighting": 2,
			"Fire": 0,
			"Flying": 0,
			"Ghost": 0,
			"Grass": 0,
			"Ground": 0,
			"Ice": 0,
			"Normal": 0,
			"Poison": 2,
			"Psychic": 2,
			"Rock": 2,
			"Steel": 3,
			"Water": 1,
		},
	},
	"Dark": {
		damageTaken: {
			"Normal": 1,
			"Dark": 1,
			"Bug": 1,
			"Psychic": 2,
			"Ghost": 2,
			"Fighting": 0,
			"Flying": 0,
			"Poison": 0,
			"Ground": 0, 
			"Rock": 0, 
			"Steel": 0, 
			"Fire": 0, 
			"Water": 0, 
			"Grass": 0, 
			"Electric": 0, 
			"Ice": 0, 
			"Dragon": 0, 
		},
	},
	"Electric": {
		inherit: true,
		damageTaken: {
			"Water": 2,
		},
	},
	"Bug": {
		inherit: true,
		damageTaken: {
			"Poison": 1,
		},
	},
	Ghost: {
		inherit: true,
		damageTaken: {
			"Ghost": 0,
		},
	},
	Rock: {
		inherit: true,
		damageTaken: {
			sandstorm: 0,
		},
	},
	Ground: {
		inherit: true,
		damageTaken: {
			sandstorm: 0,
		},
	},
};
exports.BattleTypeChart = BattleTypeChart;
