'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

const EMPTY_IVS = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};

describe(`Emergency Exit`, function () {
	afterEach(() => battle.destroy());

	it(`should request switch-out if damaged below 50% HP`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['superfang'], ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Raticate", ability: 'guts', moves: ['superfang']}],
		]);
		const eePokemon = battle.p1.active[0];
		const foePokemon = battle.p2.active[0];
		battle.makeChoices('move superfang', 'move superfang');
		assert.equal(foePokemon.hp, foePokemon.maxhp);
		assert.atMost(eePokemon.hp, eePokemon.maxhp / 2);
		assert.equal(battle.requestState, 'switch');
	});

	it(`should request switch-out at the end of a multi-hit move`, function () {
		battle = common.createBattle([
			[{species: "Cinccino", ability: 'skilllink', moves: ['bulletseed']}],
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['sleeptalk']}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
		]);
		battle.makeChoices('move bulletseed', 'move sleeptalk');
		battle.makeChoices('move bulletseed', 'move sleeptalk');
		assert.equal(battle.requestState, 'switch');
	});

	it(`should request switch-out if brought below half HP by residual damage`, function () {
		battle = common.createBattle([[
			{species: "Mew", moves: ['toxic']},
		], [
			{species: "Mew", ability: 'emergencyexit', moves: ['splash']},
			{species: "Shaymin", moves: ['splash']},
		]]);
		battle.p2.active[0].hp = Math.floor(battle.p2.active[0].maxhp / 2 + 2);
		battle.makeChoices();
		assert.equal(battle.requestState, 'switch');
	});

	it(`should request switch-out if brought below half HP by Photon Geyser`, function () {
		battle = common.createBattle([[
			{species: "Mew", moves: ['photongeyser']},
		], [
			{species: "Charmeleon", ability: 'emergencyexit', moves: ['splash']},
			{species: "Shaymin", moves: ['splash']},
		]]);
		battle.makeChoices();
		assert.equal(battle.requestState, 'switch');
	});

	it(`should not request switch-out if attacked and healed by berry`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['sleeptalk'], item: 'sitrusberry', ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Raticate", ability: 'guts', moves: ['superfang']}],
		]);
		battle.makeChoices('move sleeptalk', 'move superfang');
		assert.equal(battle.requestState, 'move');
	});

	it(`should not request switch-out if fainted`, function () {
		battle = common.createBattle({gameType: 'doubles'});
		battle.setPlayer('p1', {team: [
			{species: 'Vikavolt', item: 'choicespecs', moves: ['thunderbolt']},
			{species: 'Pyukumuku', moves: ['batonpass']},
			{species: 'Magikarp', moves: ['splash']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Golisopod', ability: 'emergencyexit', moves: ['sleeptalk']},
			{species: 'Mew', moves: ['sleeptalk']},
			{species: 'Ditto', moves: ['transform']},
		]});
		battle.makeChoices('move thunderbolt 1, move batonpass', 'move sleeptalk, move sleeptalk');
		assert(!battle.p2.activeRequest.forceSwitch);
	});

	it.skip(`should request switch-out before end-of-turn fainted Pokemon`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', item: 'toxicorb', moves: ['substitute', 'sleeptalk', 'liquidation']}, {species: "Magikarp", moves: ['splash']}],
			[{species: "Charizard", item: 'rockyhelmet', moves: ['bellydrum', 'sleeptalk', 'dragonclaw']}, {species: "Mew", moves: ['sleeptalk']}],
		]);
		battle.makeChoices('move substitute', 'move bellydrum');
		battle.makeChoices('move sleeptalk', 'move sleeptalk');
		battle.makeChoices('move liquidation', 'move dragonclaw');
		assert(battle.p1.activeRequest.forceSwitch);
		assert(!battle.p2.activeRequest.forceSwitch);
	});

	it(`should request switch-out after taking hazard damage`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['uturn', 'sleeptalk']}, {species: "Magikarp", ability: 'swiftswim', moves: ['splash']}],
			[{species: "Arceus-Flying", ability: 'ironbarbs', moves: ['stealthrock', 'spikes', 'dragonascent']}],
		]);
		battle.makeChoices('move uturn', 'move stealthrock');
		battle.makeChoices('switch 2', '');
		battle.makeChoices('move splash', 'move spikes');
		battle.makeChoices('move splash', 'move spikes');
		battle.makeChoices('move splash', 'move spikes');
		battle.makeChoices('switch 2', 'move dragonascent');
		assert(battle.p1.active[0].hp);
		assert.equal(battle.requestState, 'switch');
	});

	it(`should not request switch-out after taking residual damage and getting healed by berry`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['uturn', 'sleeptalk'], item: 'sitrusberry'}, {species: "Magikarp", ability: 'swiftswim', moves: ['splash']}],
			[{species: "Ferrothorn", ability: 'ironbarbs', moves: ['stealthrock', 'spikes', 'protect']}],
		]);
		battle.makeChoices('move uturn', 'move stealthrock');
		battle.makeChoices('switch 2', '');
		battle.makeChoices('move splash', 'move spikes');
		battle.makeChoices('move splash', 'move spikes');
		battle.makeChoices('move splash', 'move spikes');
		battle.makeChoices('switch 2', 'move protect');
		assert.equal(battle.requestState, 'move');
	});

	it.skip(`should not request switch-out after taking poison damage and getting healed by berry`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['substitute', 'sleeptalk'], item: 'sitrusberry'}, {species: "Magikarp", moves: ['splash']}],
			[{species: "Gengar", moves: ['toxic', 'nightshade', 'protect']}],
		]);
		battle.makeChoices('move substitute', 'move toxic');
		battle.makeChoices('move sleeptalk', 'move nightshade');
		battle.makeChoices('move sleeptalk', 'move protect');
		assert.equal(battle.requestState, 'move');
	});

	it(`should not request switch-out on usage of Substitute`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['substitute'], ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Deoxys-Attack", ability: 'pressure', item: 'laggingtail', moves: ['thunderbolt']}],
		]);
		const eePokemon = battle.p1.active[0];
		battle.makeChoices('move substitute', 'move thunderbolt');
		assert.false.atMost(eePokemon.hp, eePokemon.maxhp / 2);
		battle.makeChoices('move substitute', 'move thunderbolt');
		assert.atMost(eePokemon.hp, eePokemon.maxhp / 2);
		assert.equal(battle.requestState, 'move');
	});

	it(`should prevent Volt Switch after-switches`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['sleeptalk'], ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Zekrom", ability: 'pressure', moves: ['voltswitch']}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
		]);
		const eePokemon = battle.p1.active[0];
		battle.makeChoices('move sleeptalk', 'move voltswitch');
		assert.atMost(eePokemon.hp, eePokemon.maxhp / 2);

		assert.false.holdsItem(eePokemon);
		assert.equal(battle.requestState, 'switch');

		battle.makeChoices('default', '');
		assert.species(battle.p1.active[0], 'Clefable');
		assert.species(battle.p2.active[0], 'Zekrom');
	});

	it(`should not prevent Red Card's activation`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', item: 'redcard', moves: ['sleeptalk'], ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Raticate", ability: 'guts', moves: ['superfang']}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
		]);
		const eePokemon = battle.p1.active[0];
		battle.makeChoices('move sleeptalk', 'move superfang');
		assert.atMost(eePokemon.hp, eePokemon.maxhp / 2);

		assert.false.holdsItem(eePokemon);
		assert.equal(battle.requestState, 'switch');

		battle.makeChoices('auto', '');
		assert.species(battle.p1.active[0], 'Clefable');
		assert.species(battle.p2.active[0], 'Clefable');
	});

	it(`should not prevent Eject Button's activation`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', item: 'ejectbutton', moves: ['sleeptalk'], ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Raticate", ability: 'guts', moves: ['superfang']}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
		]);
		const eePokemon = battle.p1.active[0];
		battle.makeChoices('auto', 'auto');
		assert.atMost(eePokemon.hp, eePokemon.maxhp / 2);

		assert.false.holdsItem(eePokemon);
		assert.equal(battle.requestState, 'switch');

		battle.makeChoices('auto', '');
		assert.species(battle.p1.active[0], 'Clefable');
	});

	it(`should be suppressed by Sheer Force`, function () {
		battle = common.createBattle([
			[{species: "Golisopod", ability: 'emergencyexit', moves: ['sleeptalk'], ivs: EMPTY_IVS}, {species: "Clefable", ability: 'Unaware', moves: ['metronome']}],
			[{species: "Nidoking", ability: 'sheerforce', moves: ['thunder']}],
		]);
		const eePokemon = battle.p1.active[0];
		battle.makeChoices('move sleeptalk', 'move thunder');
		assert.atMost(eePokemon.hp, eePokemon.maxhp / 2);
		assert.equal(battle.requestState, 'move');
	});
});
