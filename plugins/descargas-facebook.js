 import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 💛\`*', m, fake);
  }

  await conn.sendMessage(m.chat, { text: 'Cargando...' }, { quoted: m });
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, '*`Error al obtener datos. Verifica el enlace.`*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*`No se encontraron resultados.`*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return conn.reply(m.chat, '*`Error al procesar los datos.`*', m);
  }

  if (!data) {
    return conn.reply(m.chat, '*`No se encontró una resolución adecuada.`*', m);
  }

  await conn.sendMessage(m.chat, { text: 'Descarga completa.' }, { quoted: m });
  let video = data.url;

  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: 'Vídeo descargado con éxito.', fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return conn.reply(m.chat, '*`Error al enviar el video.`*', m);
  await conn.sendMessage(m.chat, { text: '❌' }, { quoted: m });
  }
};

handler.help = ['fb *<link>*'];
handler.corazones = 2
handler.tags = ['dl']
handler.command = /^(fb|facebook|fbdl)$/i;

export default handler;                                                                                                                                                                                                                                          