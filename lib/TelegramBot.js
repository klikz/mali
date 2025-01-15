const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
dotenv.config();
class TelegramBot {
    chatId = []; // ID чатов, куда нужно отправить сообщение
    bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  
    int() {
      var userList = process.env.USER_ID;
      // Преобразуем строку в массив, разделяя по запятой
      var userArray = userList.split(',');
      // Преобразуем каждый элемент массива в целое число
      this.chatId = userArray.map(function(id) {
        return parseInt(id, 10); // Преобразуем в целое число (десятичная система)
      });

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