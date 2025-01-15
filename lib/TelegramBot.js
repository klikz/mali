const { Telegraf } = require('telegraf');
class TelegramBot {
    chatId = [106696611]; // ID чатов, куда нужно отправить сообщение
    bot = new Telegraf('8000897327:AAFjCKH3bmeI03uznNtTju3E4C74O0w4NY8');
  
    int() {
      this.bot.start((ctx) => {
        const chatId = ctx.chat.id;
        console.log('User connected:', chatId);
  
        if (!this.chatId.includes(chatId)) {
          this.chatId.push(chatId);        
        }
  
        ctx.reply('Xush kelibsiz!');
      });
  
      this.bot.launch()
        .then(() => {
          console.log('Bot ishga tushdi');
        })
        .catch((err) => {
          console.error('Botni ishga tushirishda xatolik:', err);
        });
    }
  
    async send(dopMess) {
      if (this.chatId.length === 0) {
        console.error('Hech qanday chat ID topilmadi');
        return;
      }
  
      for (const chatId of this.chatId) {
        try {
          await this.bot.telegram.sendMessage(chatId, dopMess, { parse_mode: 'HTML' });
          console.log(`Xabar muvaffaqiyatli yuborildi: ${chatId}`);
        } catch (err) {
          console.error(`Xabar yuborishda xatolik yuz berdi (${chatId}):`, err);
        }
      }
    }
  }
  module.exports = TelegramBot;