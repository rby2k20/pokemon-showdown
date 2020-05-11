type ChildProcess = import('child_process').ChildProcess;

type Config = typeof import('../config/config-example') & AnyObject;

type GroupSymbol = '~' | '&' | '#' | '★' | '*' | '@' | '%' | '☆' | '+' | ' ' | '‽' | '!';


// Chat
type CommandContext = Chat.CommandContext;
type PageContext = Chat.PageContext;
type PageTable = Chat.PageTable;
type ChatCommands = Chat.ChatCommands;
type SettingsHandler = Chat.SettingsHandler;
type ChatFilter = Chat.ChatFilter;
type NameFilter = Chat.NameFilter;
type StatusFilter = Chat.StatusFilter;
type LoginFilter = Chat.LoginFilter;
namespace Chat {
	export type CommandContext = import('./chat').CommandContext;
	export type PageContext = import('./chat').PageContext;
	export type SettingsHandler = import('./chat').SettingsHandler;
	export type PageTable = import('./chat').PageTable;
	export type ChatCommands = import('./chat').ChatCommands;
	export type ChatHandler = import('./chat').ChatHandler;
	export type ChatFilter = import('./chat').ChatFilter;
	export type NameFilter = import('./chat').NameFilter;
	export type StatusFilter = import('./chat').StatusFilter;
	export type LoginFilter = import('./chat').LoginFilter;
}

// Rooms
type GlobalRoom = Rooms.GlobalRoom;
type ChatRoom = Rooms.ChatRoom;
type GameRoom = Rooms.GameRoom;
type BasicRoom = Rooms.BasicRoom;
type BasicChatRoom = Rooms.BasicChatRoom;
type RoomGame = Rooms.RoomGame;
type RoomBattle = Rooms.RoomBattle;
type Roomlog = Rooms.Roomlog;
type Room = Rooms.Room;
type RoomID = "" | "global" | "lobby" | "staff" | "upperstaff" | "development" | "battle" | string & {__isRoomID: true};
namespace Rooms {
	export type GlobalRoom = import('./rooms').GlobalRoom;
	export type ChatRoom = import('./rooms').ChatRoom;
	export type GameRoom = import('./rooms').GameRoom;
	export type BasicRoom = import('./rooms').BasicRoom;
	export type BasicChatRoom = import('./rooms').BasicChatRoom;
	export type RoomGame = import('./room-game').RoomGame;
	export type RoomBattle = import('./room-battle').RoomBattle;
	export type Roomlog = import('./roomlogs').Roomlog;
	export type Room = import('./rooms').Room;
}

// Streams
// (I don't understand why eslint only has a problem with this - it's used in room-battle)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Streams {
	export type WriteStream = import('../lib/streams').WriteStream;
	export type ReadStream = import('../lib/streams').ReadStream;
	export type ReadWriteStream = import('../lib/streams').ReadWriteStream;
	export type ObjectWriteStream<T> = import('../lib/streams').ObjectWriteStream<T>;
	export type ObjectReadStream<T> = import('../lib/streams').ObjectReadStream<T>;
	export type ObjectReadWriteStream<T> = import('../lib/streams').ObjectReadWriteStream<T>;
}

// Users
type User = Users.User;
type Connection = Users.Connection;
namespace Users {
	export type User = import('./users').User;
	export type Connection = import('./users').Connection;
}
