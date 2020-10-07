'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
	"frz": {
		id: "frz",
		name: "FRZ",
		spritenum: 305,
		onUpdate(pokemon) {
			onResidualOrder: 26,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
			pokemon.trySetStatus('frz', pokemon);
		},
		},
		num: 0,
		gen: 1,
		isNonstandard: "Past",
		desc: "(Gen 1) On switch-in, set FRZ. For use in Non-Cleric Clause.",
	},
	"psn": {
		id: "psn",
		name: "PSN",
		spritenum: 515,
		onUpdate(pokemon) {
			onResidualOrder: 26,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
			pokemon.trySetStatus('psn', pokemon);
		},
		},
		num: 0,
		gen: 1,
		isNonstandard: "Past",
		desc: "(Gen 1) On switch-in, set PSN. For use in Non-Cleric Clause.",
	},
	"brn": {
		id: "brn",
		name: "BRN",
		spritenum: 145,
		onUpdate(pokemon) {
			onResidualOrder: 26,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
			pokemon.trySetStatus('brn', pokemon);
		},
		},
		num: 0,
		gen: 1,
		isNonstandard: "Past",
		desc: "(Gen 1) On switch-in, set BRN. For use in Non-Cleric Clause.",
	},
	"prz": {
		id: "prz",
		name: "PRZ",
		spritenum: 273,
		onUpdate(pokemon) {
			onResidualOrder: 26,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
			pokemon.trySetStatus('prz', pokemon);
		},
		},
		num: 0,
		gen: 1,
		isNonstandard: "Past",
		desc: "(Gen 1) On switch-in, set PRZ. For use in Non-Cleric Clause.",
	},
};
