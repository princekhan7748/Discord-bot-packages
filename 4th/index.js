const { Client } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_INTEGRATIONS',
		'GUILD_WEBHOOKS',
		'GUILD_INVITES',
		'GUILD_VOICE_STATES',
		'GUILD_PRESENCES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGE_TYPING',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS',
		'DIRECT_MESSAGE_TYPING',
	],
});
module.exports = client;

// Loading file systems

require('./events/voice/StreamingStop');
require('./events/voice/StreamingStart');
require('./events/voice/Undeaf');
require('./events/voice/Deaf');
require('./events/voice/Unmute');
require('./events/voice/Mute');
require('./events/voice/Switch');
require('./events/voice/Leave');
require('./events/voice/join');


require('./events/user/FlagsUpdate');
require('./events/user/DiscriminatorUpdate');
require('./events/user/UsernameUpdate');
require('./events/user/AvatarUpdate');


require('./events/role/PermissionsUpdate');
require('./events/role/PositionUpdate');


require('./events/guild/MemberOnline');
require('./events/guild/MemberOffline');
require('./events/guild/URLUpdate');
require('./events/guild/URLAdd');
require('./events/guild/BannerAdd');
require('./events/guild/BoostLevelUp');
require('./events/guild/MemberEntered');
require('./events/guild/NicknameUpdate');
require('./events/guild/RoleRemove');
require('./events/guild/RoleAdd');
require('./events/guild/MemberUnboost');
require('./events/guild/MemberBoost');
require('./events/guild/ChannelPermissionsUpdate');
require('./events/guild/ChannelTopicUpdate');
require('./events/guild/AfkChannelAdd');
require('./events/guild/boostDown');
require('./events/guild/UnhandledChannel');


require('./events/message/Pinned');


require('./events/message/Update');
require('./events/message/Create');
require('./events/message/delete');

require('./botsettings');

const logs = require('discord-logs');
logs(client, { debug: true });


client.login(token);

