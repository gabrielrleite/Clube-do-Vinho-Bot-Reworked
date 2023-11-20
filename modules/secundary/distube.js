const {client} = require("../primary/client");
const config = require("../../config.json");
const Distube = require("distube").default;
const fs = require("fs");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DeezerPlugin } = require("@distube/deezer");
const db = require("../primary/database");

client.colour = 0x17BEBB;
client.player = new Distube(client, {
    searchSongs: 1,
    emitNewSongOnly: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new DeezerPlugin(), new YtDlpPlugin({ update: true })],
  });

const player = client.player;
const channelQueueId = config.queueId;
const queue = player.getQueue(channelQueueId);
const guildId = config.guildId;

async function volume() {
  const connection = await db.connect();
  const vol = await db.executeQuery(connection, "SELECT volume FROM music");
  player.setVolume(guildId, vol[0].volume);
  await db.closeConnection(connection);
}

player.on('addSong', (queue, song) => queue.textChannel.send(
  `${song.name} - \`${song.formattedDuration}\` foi adicionada a fila.`
).then(volume()));

player.on('addList', (queue, playlist) => queue.textChannel.send(
  `A playlist ${playlist.name} - \`(${playlist.songs.length} músicas)\` foi adicionada a fila.`
).then(volume()));

player.on('playSong', (queue, song) => queue.textChannel.send(
  `Tocando agora: ${song.name} - \`${song.formattedDuration}\`.`
).then(volume()));

module.exports = { queue, player };