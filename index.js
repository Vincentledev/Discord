const Discord = require('discord.js')
const bot = new Discord.Client()
const webhook = new Discord.WebhookClient('688756544262766612', 'PKvNKU-Oz1T_Lc0WDGktwbdXBellwTDpVBm85eId5PK1oodkcWhhvjXqGtQiHjUhKCgw')

bot.on('ready', () => {
  console.log('[!]Bot en ligne');
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Bienvenue sur le serveur, ${member}`);
});

bot.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('!kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Le ban est réussi ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to kick the member');
            console.error(err);
          });
      } else {
        message.reply("Cet utilsateur n'est pas sur le serveur");
      }
    } else {
      message.reply("Tu n'as pas dit qui tu voulais bannir !");
    }
  }
});

bot.on('message', function (message) {
	if (message.content === '!help') {
		message.channel.send(`Toute les commandes du bot : \n!help \n!server \n!Soren `)
	}

	if (message.content === '!server') {
		let server_name = message.guild.name
		let server_size = message.guild.members.size
	    message.channel.send('Serveur : ' + server_name + '\nPersonnes dans le serveur: ' + server_size)
	    webhook.send('Je suis un webhook')
	}

	if (message.content === '!Soren') {
		message.channel.send("Soren le bot : \nv1.5 \nauteur : @I am Kirishima#1866\ndescription : Ce bot est en cours de dévellopement, de nombreuse maintenance sont à venir pour un bot génial")
	}
})

bot.login('process.env.TOKEN')