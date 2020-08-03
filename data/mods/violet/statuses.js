/**
 * Statuses worked way different.
 * Sleep lasted longer, had no reset on switch and took a whole turn to wake up.
 * Frozen only thaws when hit by fire or Haze.
 *
 * Secondary effects to status (-speed, -atk) worked differently, so they are
 * separated as volatile statuses that are applied on switch in, removed
 * under certain conditions and re-applied under other conditions.
 */

'use strict';

/**@type {{[k: string]: ModdedPureEffectData}} */
let BattleStatuses = {
	partialtrappinglock: {
		name: 'partialtrappinglock',
		id: 'partialtrappinglock',
		num: 0,
		durationCallback() {
			let duration = this.sample([2, 3]);
			return duration;
		},
		onResidual(target) {
			if (target.lastMove && target.lastMove.id === 'struggle' || target.status === 'slp') {
				delete target.volatiles['partialtrappinglock'];
			}
		},
		onStart(target, source, effect) {
			this.effectData.move = effect.id;
		},
		onDisableMove(pokemon) {
			if (!pokemon.hasMove(this.effectData.move)) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectData.move) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		inherit: true,
		durationCallback() {
			return this.random(2, 3);
		},
	},
	disable: {
		name: "disable",
		id: "disable",
		duration: 4,
		durationCallback(target, source, effect) {
			let duration = 4;
			return duration;
		},
		onStart(pokemon) {
			if (!this.queue.willMove(pokemon)) {
				this.effectData.duration++;
			}
			let moves = pokemon.moves;
			let move = this.dex.getMove(this.sample(moves));
			this.add('-start', pokemon, 'Disable', move.name);
			this.effectData.move = move.id;
			return;
		},
		onResidualOrder: 14,
		onBeforeMove(attacker, defender, move) {
			if (move.id === this.effectData.move) {
				this.add('cant', attacker, 'Disable', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id === this.effectData.move) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
	},
};

exports.BattleStatuses = BattleStatuses;