const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '£'

client.login(process.env.TOKEN);

client.on('ready', ()=>{
    client.user.setPresence ({ game: { name: '[()help]', type: 0} });
      console.log('discord-developpement')
  });

client.on('message', async message => {
  
    if(message.content === prefix + "help") {
        var help_embed = new Discord.RichEmbed()
        .setColor("#3E4E6B")
        .setTitle("Command | Help:")
        .addField("£help", "affiche les commmandes")
        .addField("£kick", "permet d'expulser le membre ")
        .addField("£ban", "permet de ban les membre")
        .addField("£mute", "permet de mute une personne (ce n'est pas temporaire)")
        .addField("£unmute", "permet de unmute ")
        .addField("£clear", "permet le clear des message jusqu'a 100 message (a eviter de faire 100 message il vaut mieu mettre 99)")
        .addField("£commande", "permet de savoir comment commander ")
        .addField("£info","permet d'avoir des information sur le discord")
        .setThumbnail(client.user.avatarURL)
        .setFooter("Chiloute - BOT, menu help")
        message.channel.send(help_embed)
    } 
      if(message.content === prefix + "avatar") {
         var avatar_embed = new Discord.RichEmbed()
        .setColor("#3E4E6B")
        .setTitle(`Avatar de ${message.author.username}`)
        .setImage(message.author.avatarURL)
        message.channel.send(avatar_embed)
    }  

    if (message.content === prefix + "commande") {
        message.channel.send("Comment commander un ou des comptes ? Vous devez tous simplement contacter @SillehX1#0001")
    }

    if (message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#3E4E6B")
        .setTitle("Commande - INFO:")
        .setDescription("Voici les informations du serveur")
        .addField("BOT :", "Information du bot")
        .addField(":spy:Nom : ", `${client.user.tag}`)
        .addField(":id:Id", `${client.user.id}`)  
        .addField("Developpeur : ", "Chiloute")
        .addBlankField()
        .addField("Serveur :", "Information du serveur")
        .addField("Nom : ", `${message.guild.name}`)
        .addField("Nombre de membres : ", `${message.guild.memberCount}`)
        .addField("Nombre de salons et de catégories : ", `${message.guild.channels.size}`)
        .setThumbnail(message.guild.iconURL)
        .setFooter("Chiloute - BOT, menu info")
         message.channel.send(info_embed);
    }
    if (message.content.startsWith(prefix + "kick")) {
        if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("```diff\n- Vous n'avez pas la permissions de kick des membres de se discord\n```");
    
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("```diff\n- je n'est pas la permission pour kick des membres\n```")
        }

        if (message.mentions.users.size === 0) {
            return message.channel.send("```diff\n- Vous devez mentionnez un membre\n```")
        }
        
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("```diff\n- je ne sais pas si l'utilisateur existe !\n```")
        }

        kick.kick().then(member => {
            message.channel.send(`**__${member.user.username} à été kick par ${message.author.username}__**`);
        });

    }
        if (message.content.startsWith(prefix + "ban")) {
        if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("```diff\n- Vous n'avez pas la permissions de ban des membres de se discord\n```");
    
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("```diff\n- Je n'est pas la permission pour ban des membres\n```")
        }

        if (message.mentions.users.size === 0) {
            return message.channel.send("```diff\n- Vous devez mentionnez un membre\n```")
        }
        
        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("```diff\n- Je ne sais pas si l'utilisateur existe !\n```")
        }

        ban.ban().then(member => {
            message.channel.send(`**__${member.user.username} à été ban par ${message.author.username}__**`);
        });

    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("```diff\n- Vous n'avez pas la permission de clear des messages dans se channel\n```");
        

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("```diff\n- Tu dois préciser un nombre de message a supprimé\n```")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**__${args[0]} message on été supprimés !__**`);
        });
    }
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.channel.send("```diff\n- Vous n'avez pas la permission de mute un membre\n```");

        if(message.mentions.users.size === 0) {
            return message.channel.send("```diff\n- Vous devez mentionnez un membre\n```");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("```diff\n- Je ne sais pas si l'utilisateur existe !\n```");
        }

        if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.channel.send("```diff\n- Je n'est pas la permission pour mute des membres\n```");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.channel.send("```diff\n- Vous n'avez pas la permission de unmute un membre\n```");

        if(message.mentions.users.size === 0) {
            return message.channel.send("```diff\n- Vous devez mentionnez un membre\n```");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("```diff\n- Je ne sais pas si l'utilisateur existe !\n```");
        }

        if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.channel.send("```diff\n- Je n'est pas la permission pour unmute des membres\n```");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        })
    }

});
