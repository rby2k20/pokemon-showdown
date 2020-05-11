/**
 * Main server ladder library
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This file handles ladders for the main server on
 * play.pokemonshowdown.com.
 *
 * Ladders for all other servers is handled by ladders.ts.
 *
 * Matchmaking is currently still implemented in rooms.ts.
 *
 * @license MIT
 */

export class LadderStore {
	formatid: string;
	static readonly formatsListPrefix = '';

	constructor(formatid: string) {
		this.formatid = formatid;
	}

	/**
	 * Returns [formatid, html], where html is an the HTML source of a
	 * ladder toplist, to be displayed directly in the ladder tab of the
	 * client.
	 */
	// This requires to be `async` because it must conform with the `LadderStore` interface
	// eslint-disable-next-line @typescript-eslint/require-await
	async getTop(prefix?: string): Promise<[string, string] | null> {
		return null;
	}

	/**
	 * Returns a Promise for the Elo rating of a user
	 */
	async getRating(userid: string) {
		const formatid = this.formatid;
		const user = Users.getExact(userid);
		if (user?.mmrCache[formatid]) {
			return user.mmrCache[formatid];
		}
		const [data] = await LoginServer.request('mmr', {
			format: formatid,
			user: userid,
		});
		let mmr = NaN;
		if (data && !data.errorip) {
			mmr = Number(data);
		}
		if (isNaN(mmr)) return 1000;

		if (user && user.id === userid) {
			user.mmrCache[formatid] = mmr;
		}
		return mmr;
	}

	/**
	 * Update the Elo rating for two players after a battle, and display
	 * the results in the passed room.
	 */
	async updateRating(p1name: string, p2name: string, p1score: number, room: AnyObject) {
		if (Ladders.disabled) {
			room.addRaw(`Ratings not updated. The ladders are currently disabled.`).update();
			return [p1score, null, null];
		}

		const formatid = this.formatid;
		const p1 = Users.getExact(p1name);
		const p2 = Users.getExact(p2name);
		room.update();
		room.send(`||Ladder updating...`);
		const [data, , error] = await LoginServer.request('ladderupdate', {
			p1: p1name,
			p2: p2name,
			score: p1score,
			format: formatid,
		});
		let problem = false;

		if (error) {
			if (error.message === 'stream interrupt') {
				room.add(`||Ladder updated, but score could not be retrieved.`);
			} else {
				room.add(`||Ladder (probably) updated, but score could not be retrieved (${error.message}).`);
			}
			problem = true;
		} else if (!room.battle) {
			Monitor.warn(`room expired before ladder update was received`);
			problem = true;
		} else if (!data) {
			room.add(`|error|Unexpected response ${data} from ladder server.`);
			room.update();
			problem = true;
		} else if (data.errorip) {
			room.add(`|error|This server's request IP ${data.errorip} is not a registered server.`);
			room.add(`|error|You should be using ladders.js and not ladders-remote.js for ladder tracking.`);
			room.update();
			problem = true;
		}

		if (problem) {
			// Clear mmrCache for the format to get the users updated rating next search
			if (p1) delete p1.mmrCache[formatid];
			if (p2) delete p2.mmrCache[formatid];
			return [p1score, null, null];
		}

		let p1rating;
		let p2rating;
		try {
			p1rating = data!.p1rating;
			p2rating = data!.p2rating;

			let oldelo = Math.round(p1rating.oldelo);
			let elo = Math.round(p1rating.elo);
			let act = (p1score > 0.9 ? `winning` : (p1score < 0.1 ? `losing` : `tying`));
			let reasons = `${elo - oldelo} for ${act}`;
			if (reasons.charAt(0) !== '-') reasons = '+' + reasons;
			room.addRaw(Chat.html`${p1name}'s rating: ${oldelo} &rarr; <strong>${elo}</strong><br />(${reasons})`);
			let minElo = elo;

			oldelo = Math.round(p2rating.oldelo);
			elo = Math.round(p2rating.elo);
			act = (p1score > 0.9 || p1score < 0 ? `losing` : (p1score < 0.1 ? `winning` : `tying`));
			reasons = `${elo - oldelo} for ${act}`;
			if (reasons.charAt(0) !== '-') reasons = '+' + reasons;
			room.addRaw(Chat.html`${p2name}'s rating: ${oldelo} &rarr; <strong>${elo}</strong><br />(${reasons})`);
			if (elo < minElo) minElo = elo;
			room.rated = minElo;

			if (p1) p1.mmrCache[formatid] = +p1rating.elo;
			if (p2) p2.mmrCache[formatid] = +p2rating.elo;
			room.update();
		} catch (e) {
			room.addRaw(`There was an error calculating rating changes.`);
			room.update();
		}
		return [p1score, p1rating, p2rating];
	}

	/**
	 * Returns a Promise for an array of strings of <tr>s for ladder ratings of the user
	 */
	// This requires to be `async` because it must conform with the `LadderStore` interface
	// eslint-disable-next-line @typescript-eslint/require-await
	static async visualizeAll(username: string) {
		return [`<tr><td><strong>Please use the official client at play.pokemonshowdown.com</strong></td></tr>`];
	}
}
