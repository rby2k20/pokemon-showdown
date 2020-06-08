/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

'use strict';

/**@type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
	acid: {
		inherit: true,
		basePower: 70,
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
	},
	bind: {
		inherit: true,
		basePower: 40,
		pp: 5,
		type: "Bug",
  },
	clamp: {
		inherit: true,
		basePower: 70,
		pp: 5,
  },
	disable: {
		num: 50,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "For 4 turns, the target's last move used becomes disabled. Fails if one of the target's moves is already disabled, if the target has not made a move, if the target no longer knows the move, or if the move was a Max or G-Max Move.",
		shortDesc: "For 4 turns, disables the target's last move used.",
		id: "disable",
		isViable: true,
		name: "Disable",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'disable',
		onTryHit(target) {
			return true;
		},
		effect: {
			duration: 4,
			durationCallback(target, source, effect) {
				let duration = this.random(1, 7);
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
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	dreameater: {
		inherit: true,
		basePower: 200,
		drain: [1, 1],
		onTryImmunity(target) {
			return target.status === 'slp' || target.status === 'psn' || target.status === 'tox' || target.hasAbility('comatose');
		},
		type: "Ghost",
  },
	firespin: {
		inherit: true,
		basePower: 30,
		pp: 5,
  },
	gust: {
		inherit: true,
		basePower: 80,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		type: "Flying",
  },
	karatechop: {
		inherit: true,
		type: "Fighting",
	},
	leechlife: {
		inherit: true,
		basePower: 60,
		drain: [1, 1],
  },
	megadrain: {
		inherit: true,
		drain: [1, 1],
	},
	mimic: {
		inherit: true,
		onHit(target, source) {
			let moveslot = source.moves.indexOf('mimic');
			if (moveslot < 0) return false;
			let moves = target.moves;
			let moveid = this.sample(moves);
			if (!moveid) return false;
			let move = this.dex.getMove(moveid);
			let mimicMove = {
				move: move.name,
				id: move.id,
				pp: source.moveSlots[moveslot].pp,
				maxpp: move.pp * 8 / 5,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
      source.moveSlots[moveslot] = mimicMove;
      source.baseMoveSlots[moveslot] = mimicMove;
			this.add('-start', source, 'Mimic', move.name);
		},
	},
	petaldance: {
		inherit: true,
		basePower: 120,
  },
	poisonsting: {
		inherit: true,
		basePower: 95,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'psn',
		},
  },
	recover: {
		inherit: true,
		onHit(target) {
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	rockslide: {
		inherit: true,
		basePower: 85,
  },
	skyattack: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			this.boost({def:1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
  },
	softboiled: {
		inherit: true,
		onHit(target) {
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	solarbeam: {
		inherit: true,
		basePower: 100,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			this.boost({spa:1}, attacker, attacker, move);
			this.boost({spd:1}, attacker, attacker, move);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
  },
	submission: {
		inherit: true,
		basePower: 100,
		accuracy: 100,
  },
	thrash: {
		inherit: true,
		basePower: 100,
		type: "Dragon",
  },
	toxic: {
		inherit: true,
		accuracy: 100,
  },
	triattack: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 20,
			onHit(target, source) {
				let result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		type: "Ghost",
  },
	twineedle: {
		inherit: true,
		basePower: 40,
  },
	vicegrip: {
		inherit: true,
		critRatio: 2,
		type: "Bug",
	},
	wrap: {
		inherit: true,
		basePower: 40,
		pp: 5,
  },
};

exports.BattleMovedex = BattleMovedex;