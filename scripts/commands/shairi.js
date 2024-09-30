module.exports.config = {
	name: "shairi", 
  version: "1.0.0", 
  permission: 0,
  credits: "Nayan",
  description: "Random shairi video",
  prefix: true,
  category: "Media", 
  usages: "", 
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "fs":""
  }
};

const videoDATA = "https://slc5gv-8888.csb.app/video/shairi";

module.exports.onLoad = ({}) => {
  if (!global.nodemodule["fs"].existsSync(__dirname + '/nayan')) {
    global.nodemodule["fs"].mkdirSync(__dirname + '/nayan');
  }
  global.nodemodule["fs"].readdirSync(__dirname + '/nayan').forEach(file => {
    global.nodemodule["fs"].unlinkSync(__dirname + `/nayan/${file}`);
  })
}

module.exports.run = async ({ api, event }) => {
  global.nodemodule["axios"]
    .get(videoDATA)
    .then(res => {
      global.nodemodule["axios"]
        .get(encodeURI(res.data.data), { responseType: "arraybuffer" })
        .then(ress => {
          let path = __dirname + `/nayan/${Date.now()}.mp4`;
          global.nodemodule["fs"].writeFileSync(path, Buffer.from(ress.data, 'utf-8'));
          api.sendMessage({
            body: "☆《SHAIRI》☆",
            attachment: global.nodemodule["fs"].createReadStream(path)
          }, event.threadID, () => global.nodemodule["fs"].unlinkSync(path), event.messageID);
          return;
        })
        .catch(e => {
          api.sendMessage("Something went wrong...", event.threadID, event.messageID);
          return;
        });
    })
  .catch(e => {
    api.sendMessage("Something went wrong...", event.threadID, event.messageID);
    return;
  });

  return;
}
