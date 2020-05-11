/*
 * Announcements chat plugin
 * By Spandamn
 */

export class Announcement {
	readonly activityId: 'announcement';
	announcementNumber: number;
	room: ChatRoom | GameRoom;
	source: string;
	timeout: NodeJS.Timer | null;
	timeoutMins: number;
	constructor(room: ChatRoom | GameRoom, source: string) {
		this.activityId = 'announcement';
		this.announcementNumber = ++room.gameNumber;
		this.room = room;
		this.source = source;
		this.timeout = null;
		this.timeoutMins = 0;
	}

	generateAnnouncement() {
		return `<div class="broadcast-blue"><p style="margin: 2px 0 5px 0"><strong style="font-size:11pt">${this.source}</strong></p></div>`;
	}

	displayTo(user: User, connection: Connection | null = null) {
		const recipient = connection || user;
		recipient.sendTo(this.room, `|uhtml|announcement${this.announcementNumber}|${this.generateAnnouncement()}`);
	}

	display() {
		const announcement = this.generateAnnouncement();
		for (const id in this.room.users) {
			const thisUser = this.room.users[id];
			thisUser.sendTo(this.room, `|uhtml|announcement${this.announcementNumber}|${announcement}`);
		}
	}

	onConnect(user: User, connection: Connection | null = null) {
		this.displayTo(user, connection);
	}

	end() {
		this.room.send(`|uhtmlchange|announcement${this.announcementNumber}|<div class="infobox">(The announcement has ended.)</div>`);
	}
}

export const commands: ChatCommands = {
	announcement: {
		htmlcreate: 'new',
		create: 'new',
		new(target, room, user, connection, cmd, message) {
			if (!target) return this.parse('/help announcement new');
			target = target.trim();
			if (room.battle) return this.errorReply("Battles do not support announcements.");

			const text = Chat.filter(this, target, user, room, connection);
			if (target !== text) return this.errorReply("You are not allowed to use filtered words in announcements.");

			const supportHTML = cmd === 'htmlcreate';

			if (!this.can('minigame', null, room)) return false;
			if (supportHTML && !this.can('declare', null, room)) return false;
			if (!this.canTalk()) return;
			if (room.minorActivity) return this.errorReply("There is already a poll or announcement in progress in this room.");

			const source = supportHTML ? this.canHTML(target) : Chat.escapeHTML(target);
			if (!source) return;

			room.minorActivity = new Announcement(room, source);
			room.minorActivity.display();

			this.roomlog(`${user.name} used ${message}`);
			this.modlog('ANNOUNCEMENT');
			return this.privateModAction(`(An announcement was started by ${user.name}.)`);
		},
		newhelp: [`/announcement create [announcement] - Creates an announcement. Requires: % @ # & ~`],

		timer(target, room, user) {
			if (!room.minorActivity || room.minorActivity.activityId !== 'announcement') {
				return this.errorReply("There is no announcement running in this room.");
			}
			const announcement = room.minorActivity;

			if (target) {
				if (!this.can('minigame', null, room)) return false;
				if (target === 'clear') {
					if (!announcement.timeout) return this.errorReply("There is no timer to clear.");
					clearTimeout(announcement.timeout);
					announcement.timeout = null;
					announcement.timeoutMins = 0;
					return this.add("The announcement timer was turned off.");
				}
				const timeout = parseFloat(target);
				if (isNaN(timeout) || timeout <= 0 || timeout > 0x7FFFFFFF) return this.errorReply("Invalid time given.");
				if (announcement.timeout) clearTimeout(announcement.timeout);
				announcement.timeoutMins = timeout;
				announcement.timeout = setTimeout(() => {
					if (announcement) announcement.end();
					room.minorActivity = null;
				}, (timeout * 60000));
				room.add(`The announcement timer was turned on: the announcement will end in ${timeout} minute${Chat.plural(timeout)}.`);
				this.modlog('announcement TIMER', null, `${timeout} minutes`);
				return this.privateModAction(`(The announcement timer was set to ${timeout} minute${Chat.plural(timeout)} by ${user.name}.)`);
			} else {
				if (!this.runBroadcast()) return;
				if (announcement.timeout) {
					return this.sendReply(`The announcement timer is on and will end in ${announcement.timeoutMins} minute${Chat.plural(announcement.timeoutMins)}.`);
				} else {
					return this.sendReply("The announcement timer is off.");
				}
			}
		},
		timerhelp: [
			`/announcement timer [minutes] - Sets the announcement to automatically end after [minutes] minutes. Requires: % @ # & ~`,
			`/announcement timer clear - Clears the announcement's timer. Requires: % @ # & ~`,
		],

		close: 'end',
		stop: 'end',
		end(target, room, user) {
			if (!this.can('minigame', null, room)) return false;
			if (!this.canTalk()) return;
			if (!room.minorActivity || room.minorActivity.activityId !== 'announcement') {
				return this.errorReply("There is no announcement running in this room.");
			}
			const announcement = room.minorActivity;
			if (announcement.timeout) clearTimeout(announcement.timeout);

			announcement.end();
			room.minorActivity = null;
			this.modlog('ANNOUNCEMENT END');
			return this.privateModAction(`(The announcement was ended by ${user.name}.)`);
		},
		endhelp: [`/announcement end - Ends a announcement and displays the results. Requires: % @ # & ~`],

		show: 'display',
		display(target, room, user, connection) {
			if (!room.minorActivity || room.minorActivity.activityId !== 'announcement') {
				return this.errorReply("There is no announcement running in this room.");
			}
			const announcement = room.minorActivity;
			if (!this.runBroadcast()) return;
			room.update();

			if (this.broadcasting) {
				announcement.display();
			} else {
				announcement.displayTo(user, connection);
			}
		},
		displayhelp: [`/announcement display - Displays the announcement`],

		''(target, room, user) {
			this.parse('/help announcement');
		},
	},
	announcementhelp: [
		`/announcement allows rooms to run their own announcements. These announcements are limited to one announcement at a time per room.`,
		`Accepts the following commands:`,
		`/announcement create [announcement] - Creates a announcement. Requires: % @ # & ~`,
		`/announcement htmlcreate [announcement] - Creates a announcement, with HTML allowed. Requires: # & ~`,
		`/announcement timer [minutes] - Sets the announcement to automatically end after [minutes]. Requires: % @ # & ~`,
		`/announcement display - Displays the announcement`,
		`/announcement end - Ends a announcement. Requires: % @ # & ~`,
	],
};

process.nextTick(() => {
	Chat.multiLinePattern.register('/announcement (new|create|htmlcreate) ');
});
