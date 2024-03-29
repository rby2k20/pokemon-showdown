'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
	"frz": {
		id: "frz",
		name: "FRZ",
		spritenum: 305,
		onUpdate(pokemon) {
			this.hint("FRZ item activated.");
			pokemon.trySetStatus('frz', pokemon);
			pokemon.setItem('');
		},
		num: 999,
		gen: 1,
		desc: "(Gen 1) On switch-in, set FRZ. For use in Non-Cleric Clause.",
	},
	"psn": {
		id: "psn",
		name: "PSN",
		spritenum: 515,
		onUpdate(pokemon) {
			this.hint("PSN item activated.");
			pokemon.trySetStatus('psn', pokemon);
			pokemon.setItem('');
		},
		num: 998,
		gen: 1,
		desc: "(Gen 1) On switch-in, set PSN. For use in Non-Cleric Clause.",
	},
	"brn": {
		id: "brn",
		name: "BRN",
		spritenum: 145,
		onUpdate(pokemon) {
			this.hint("BRN item activated.");
			pokemon.trySetStatus('brn', pokemon);
			pokemon.setItem('');
		},
		num: 997,
		gen: 1,
		desc: "(Gen 1) On switch-in, set BRN. For use in Non-Cleric Clause.",
	},
	"par": {
		id: "par",
		name: "PAR",
		spritenum: 273,
		onUpdate(pokemon) {
			this.hint("PAR item activated.");
			pokemon.trySetStatus('par', pokemon);
			pokemon.setItem('');
		},
		num: 996,
		gen: 1,
		desc: "(Gen 1) On switch-in, set PAR. For use in Non-Cleric Clause.",
	},
	"slp": {
		id: "slp",
		name: "SLP",
		spritenum: 273,
		onUpdate(pokemon) {
			this.hint("SLP item activated.");
			pokemon.trySetStatus('slp', pokemon);
			pokemon.setItem('');
		},
		num: 996,
		gen: 1,
		desc: "(Gen 1) On switch-in, set SLP. For use in Non-Cleric Clause.",
	},
};

exports.BattleItems = BattleItems;
