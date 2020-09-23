const Discord = require('discord.js');
const bot = new Discord.Client();
const ProxyScrape = require('proxyscrape');
const proxy = new ProxyScrape();
const config = require('./Config.json');

client.login(process.env.BOT_TOKEN);

bot.on('ready', () => console.log('Bot is online'))

bot.on('message', async message => {

    if(!message.content.startsWith(config.prefix))
        return;

    let args = message.content.slice(config.prefix.length).split(/ +/)
    let cmd = args.shift().toLowerCase();

    if(cmd == 'proxy'){
        if(!args[0]){
            const proxyEmbed = new Discord.MessageEmbed()
                .setAuthor(`Error`)
                .setDescription('No area specified')
                .setColor('RED')


            message.channel.send(proxyEmbed);
        }else{
            let aProxies = await proxy.getProxies({proxytype: 'all', country: args[0].toUpperCase()})
            aProxies = shuffle(aProxies)
            const proxyEmbed = new Discord.MessageEmbed()
                .setTitle(`Proxies from ${args[0].toUpperCase()}`)
                .setDescription(aProxies.slice(0, 10).map(ip => `\`${ip}\``).join('\n'))
                .setColor('RANDOM')

            const infoEmbed = new Discord.MessageEmbed()
                .setAuthor('Proxy Generator', message.guild.iconURL())
                .setDescription('**Sending proxies...**')
                .setColor('RANDOM');

            message.channel.send(infoEmbed)
            message.author.send(proxyEmbed).catch(err => message.channel.send(proxyEmbed))
        }
    }
})


bot.login(config.token);

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
