import { igdl } from "ruhend-scraper";
import fs from 'fs';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🔗 *Ingresa un link de Instagram*', m);
  }
  try {
    await conn.reply(m.chat, `🕒 *Enviando El Video...*`, m);
    let res = await igdl(args[0]);
    let data = res.data;
    for (let media of data) {
      const tmpDir = './tmp';
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }
      const filePath = `${tmpDir}/${media.url.split('/').pop()}`;
      await new Promise(resolve => setTimeout(resolve, 2000));
      await conn.sendFile(m.chat, filePath, 'instagram.mp4', '🎞️ *Tu video de instagram*', m);
    }
  } catch (e) {
    conn.reply(m.chat, '⚙️ Ocurrió un error: ' + e, m);
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.group = true;
handler.register = true;

export default handler;
