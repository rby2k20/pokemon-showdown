export const BattleItems: {[k: string]: ModdedItemData} = {
	berryjuice: {
		inherit: true,
		isNonstandard: null,
	},
	brightpowder: {
		inherit: true,
		desc: "An attack against the holder has its accuracy out of 255 lowered by 20.",
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('brightpowder - decreasing accuracy');
			return accuracy - 20;
		},
	},
	dragonfang: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dragon') {
				return basePower * 1.1;
			}
		},
		desc: "Holder's Dragon-type attacks have 1.1x power. Evolves Seadra (trade).",
	},
	dragonscale: {
		inherit: true,
		onBasePower() {},
		desc: "Weakens Dragon-type moves.",
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	focusband: {
		inherit: true,
		name: "Focus Orb"
		desc: "Holder has a ~11.7% chance to survive an attack that would KO it with 1 HP.",
		onDamage(damage, target, source, effect) {
			if (this.randomChance(30, 256) && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-activate', target, 'item: Focus Band');
				return target.hp - 1;
			}
		},
	},
	kingsrock: {
		inherit: true,
		onModifyMove(move) {
			const affectedByKingsRock = [
				'absorb', 'aeroblast', 'barrage', 'beatup', 'bide', 'bonerush', 'bonemerang', 'cometpunch', 'counter', 'crabhammer', 'crosschop', 'cut', 'dig', 'doublekick', 'doubleslap', 'doubleedge', 'dragonrage', 'drillpeck', 'eggbomb', 'explosion', 'extremespeed', 'falseswipe', 'feintattack', 'flail', 'fly', 'frustration', 'furyattack', 'furycutter', 'furyswipes', 'gigadrain', 'hiddenpower', 'highjumpkick', 'hornattack', 'hydropump', 'jumpkick', 'karatechop', 'leechlife', 'machpunch', 'magnitude', 'megadrain', 'megakick', 'megapunch', 'megahorn', 'mirrorcoat', 'nightshade', 'outrage', 'payday', 'peck', 'petaldance', 'pinmissile', 'pound', 'present', 'pursuit', 'psywave', 'quickattack', 'rage', 'rapidspin', 'razorleaf', 'razorwind', 'return', 'reversal', 'rockthrow', 'rollout', 'scratch', 'seismictoss', 'selfdestruct', 'skullbash', 'skyattack', 'slam', 'slash', 'snore', 'solarbeam', 'sonicboom', 'spikecannon', 'strength', 'struggle', 'submission', 'superfang', 'surf', 'swift', 'tackle', 'takedown', 'thief', 'thrash', 'triplekick', 'twineedle', 'visegrip', 'vinewhip', 'vitalthrow', 'watergun', 'waterfall', 'wingattack',
			];
			if (affectedByKingsRock.includes(move.id)) {
				if (!move.secondaries) move.secondaries = [];
				// The kingsrock flag allows for differentiation from Snore,
				// which can flinch and is also affected by King's Rock
				move.secondaries.push({
					chance: 12,
					volatileStatus: 'flinch',
					kingsrock: true,
				});
			}
		},
	},
	lightball: {
		inherit: true,
		// In Gen 2 this happens in stat calculation directly.
		onModifySpA() {},
	},
	luckypunch: {
		inherit: true,
		desc: "If held by a Chansey, its critical hit ratio is always at stage 2. (25% crit rate)",
		onModifyCritRatioPriority: -1,
		onModifyCritRatio(critRatio, user) {
			if (user.species.name === 'Chansey') {
				return 3;
			}
		},
	},
	metalpowder: {
		inherit: true,
		desc: "If held by a Ditto, its Defense and Sp. Def are 1.5x, even while Transformed.",
		// In Gen 2 this happens in stat calculation directly.
		onModifyDef() {},
		onModifySpD() {},
	},
	quickclaw: {
		inherit: true,
		name: "Quick Needle",
		desc: "Each turn, holder has a ~23.4% chance to move first in its priority bracket.",
		onFractionalPriority(priority, pokemon) {
			if (this.randomChance(60, 256)) {
				return 0.1;
			}
		},
	},
	stick: {
		inherit: true,
		desc: "Holder's Normal-type attacks have 1.1x power.",
		onModifyCritRatioPriority: 0,
		onModifyCritRatio() {},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	},
	thickclub: {
		inherit: true,
		// In Gen 2 this happens in stat calculation directly.
		onModifyAtk() {},
	},
	berserkgene: {
		inherit: true,
		isNonstandard: null,
	},
	berry: {
		inherit: true,
		isNonstandard: null,
	},
	bitterberry: {
		inherit: true,
		isNonstandard: null,
	},
	burntberry: {
		inherit: true,
		isNonstandard: null,
	},
	goldberry: {
		inherit: true,
		isNonstandard: null,
	},
	iceberry: {
		inherit: true,
		isNonstandard: null,
	},
	mintberry: {
		inherit: true,
		isNonstandard: null,
	},
	miracleberry: {
		inherit: true,
		isNonstandard: null,
	},
	mysteryberry: {
		inherit: true,
		isNonstandard: null,
	},
	pinkbow: {
		inherit: true,
		isNonstandard: null,
	},
	polkadotbow: {
		inherit: true,
		isNonstandard: null,
	},
	przcureberry: {
		inherit: true,
		isNonstandard: null,
	},
	psncureberry: {
		inherit: true,
		isNonstandard: null,
	},//spaceworld changes begin here
	leftovers: {
		desc: "Heals 30 HP every turn.",
		onResidual(pokemon) {
			this.heal(30);
		},
	},
	mysticpetal: {
		id: "mysticpetal",
		name: "Mystic Petal",
		desc: "Weakens Grass-type moves."
		num: 999,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	whitefeather: {
		id: "whitefeather",
		name: "White Feather",
		desc: "Weakens Flying-type moves."
		num: 998,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	confuseclaw: {
		id: "confuseclaw",
		name: "Confuse Claw",
		desc: "Hurts opponent on switch-in."
		num: 997,
		onStart(pokemon) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target); //FIXME: this may be wrong
			}
		},
	},
	miracleseed: {
		inherit: true,
		name: "Big Leaf",
	},
	sharpstone: {
		id: "sharpstone",
		name: "Sharp Stone",
		num: 991,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Rock') {
				return basePower * 1.1;
			}
		},
		desc: "Holder's Rock-type attacks have 1.1x power.",
	},
	hardstone:
		desc: "Weakens Rock-type moves."
			onSourceModifyDamage(damage, source, target, move) {
				if (move.type === 'Rock' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				},
			},
			onBasePower() {},
		},
	sharpbeak: {
		inherit: true,
		name: "Black Feather",
	},
	silkscarf: {
		inherit: true,
		name: "Sharp Fang",
	},
	snakeskin: {
		id: "snakeskin",
		name: "Snakeskin",
		desc: "Prevents poisoning."
		num: 997,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Snakeskin');
			return false;
		},
	},
	electricpouch: {
		id: "electricpouch",
		name: "Electric Pouch",
		desc: "Weakens Electric-type moves."
		num: 996,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	poisonbarb: {
		inherit: true,
		name: "Toxic Needle",
	},
	strangepower: {
		id: "strangepower",
		name: "Strange Power",
		desc: "The holder's type immunities granted solely by its typing are negated."
		num: 995,
		onNegateImmunity: false,
	},
	poisonfang: {
		id: "poisonfang",
		name: "Poison Fang",
		num: 996,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return basePower * 1.1;
			}
		},
		desc: "Holder's Poison-type attacks have 1.1x power.",
	},
	silverpowder: {
		desc: "Weakens Bug-type moves."
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
		onBasePower() {},
	},
	migraineseed: {
		id: "migraineseed",
		name: "Migraine Seed",
		num: 995,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return basePower * 1.1;
			}
		},
		desc: "Holder's Psychic-type attacks have 1.1x power.",
	},
	countercuff: { //why do you exist omg
		id: "countercuff",
		name: "Counter Cuff",
		num: 994,
		desc: "Reflects 1/4 of damage taken to the attacker upon receiving damage.",
		onDamagingHit(damage, target, source, move) {
			this.damage(source.baseMaxhp / 8, source, target);
		},
	},
	strangewater: {
		id: "strangewater",
		name: "Strange Water",
		desc: "Weakens Water-type moves."
		num: 993,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	twistedspoon: {
		desc: "Weakens Psychic-type moves."
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
		onBasePower() {},
	},
	attackneedle: {
		id: "attackneedle",
		name: "Attack Needle",
		num: 992,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Bug') {
				return basePower * 1.1;
			}
		},
		desc: "Holder's Bug-type attacks have 1.1x power.",
	},
	blackbelt: {
		inherit: true,
		name: "Power Bracer",
	},
	jigglingballoon: {
		id: "jigglingballoon",
		name: "Jiggling Balloon",
		desc: "Weakens Normal-type moves."
		num: 990,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	firemane: {
		id: "firemane",
		name: "Fire Mane",
		desc: "Weakens Fire-type moves."
		num: 989,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	earth: {
		id: "earth",
		name: "Earth",
		desc: "Prevents paralysis."
		num: 988,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Earth');
			return false;
		},
	},
	nevermeltice: {
		inherit: true,
		name: "Ice Fang",
	},
	fossilshard: {
		id: "fossilshard",
		name: "Fossil Shard",
		desc: "Weakens Ground-type moves."
		num: 987,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	grossgarbage: {
		id: "grossgarbage",
		name: "Gross Garbage",
		desc: "Weakens Poison-type moves."
		num: 986,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	championbelt: {
		id: "championbelt",
		name: "Champion Belt",
		desc: "Weakens Fighting-type moves."
		num: 985,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	tag: {
		id: "tag",
		name: "Tag",
		desc: "Weakens Ghost-type moves."
		num: 984,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	"5yencoin": {
		id: "5yencoin",
		name: "5 Yen Coin",
		desc: "Weakens Psychic-type moves."
		num: 983,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	guardthread: {
		id: "guardthread",
		name: "Guard Thread",
		desc: "Weakens Bug-type moves."
		num: 982,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	stimulusorb: {
		id: "stimulusorb",
		name: "Stimulus Orb",
		desc: "Prevents sleep."
		num: 981,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Stimulus Orb');
			return false;
		},
	},
	detectorb: {
		id: "detectorb",
		name: "Detect Orb",
		desc: "Raises Evasion by 1 stage."
		num: 980,
		onModifyAccuracy(accuracy) {
				this.debug('Detect Orb - decreasing accuracy');
				return accuracy * 0.8;
			}
		},
	},
	mysticwater: {
		inherit: true,
		name: "Wet Horn",
	},
	scopelens: {
		isNonStandard: null,
		name: "Sharp Scythe",
		spritenum: 0,
	},
	icebikini: {
		id: "icebikini",
		name: "Ice Bikini",
		desc: "Weakens Ice-type moves."
		num: 979,
		oonSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.5);
			},
		},
	},
	magnet: {
		inherit: true,
		name: "Thunder Fang",
	},
	charcoal: {
		inherit: true,
		name: "Fire Claw",
	},
	spelltag: {
		inherit: true,
		name: "Spike",
	},
	invisiblewall: {
		id: "invisiblewall",
		name: "Invisible Wall",
		desc: "Halves Special Attack damage."
		num: 979,
		onTryHit(pokemon) {
			if (pokemon.volatiles['lightscreen']) {
				return false;
			}
		},
		effect: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Light Screen');
			},
		},
	},
	metalcoat: {
		inherit: true,
		onBasePower() {},
		onTryHit(pokemon) {
			if (pokemon.volatiles['lightscreen']) {
				return false;
			}
		},
		effect: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Light Screen');
			},
		},
	},
	prettytail: {
		id: "prettytail",
		name: "Pretty Tail",
		desc: "Prevents poisoning."
		num: 978,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Pretty Tail');
			return false;
		},
	},
	watertail: {
		id: "watertail",
		name: "Water Tail",
		desc: "Prevents burns."
		num: 977,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Water Tail');
			return false;
		},
	},
	firetail: {
		id: "firetail",
		name: "Fire Tail",
		desc: "Prevents freezing."
		num: 976,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'frz') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Fire Tail');
			return false;
		},
	},
	thundertail: {
		id: "thundertail",
		name: "Thunder Tail",
		desc: "Prevents paralysis."
		num: 975,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] item: Thunder Tail');
			return false;
		},
	},
};
