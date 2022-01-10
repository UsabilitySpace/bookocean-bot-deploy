// Copyright © Usability.Space, 2020-2021. All code and texts

// ════════════════════════════════════════════════════════
// REQUIRES
// ════════════════════════════════════════════════════════

const iFaces = require('os').networkInterfaces();
const config_of_bot_engine = require("/var/www/www-root/data/nodejs/server/usability-space-bot-engine/config/config.bot.engine.js");

const fs   = require('fs')
const path = require('path');

// ════════════════════════════════════════════════════════
// CONSTS
// ════════════════════════════════════════════════════════

//console.log(" ───────────");

// let iFaces = require('os').networkInterfaces();

function myip () {

    let address;

    // console.log(iFaces);

    Object.keys(iFaces).forEach(dev => {
        iFaces[dev].filter(details => {
            if (details.family === 'IPv4' && details.internal === false) {
                address = details.address;
            }
        });
    });
    return address;
}

const IP =  myip();

//console.log(" ───────────");

const config_of_this_IP = {
    roots : config_of_bot_engine["roots"],
    bots  : config_of_bot_engine["bots"][IP],
};

// ════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════

const CONFIG_BOT_RUN = '/var/www/www-root/data/nodejs/server/usability-space-bot-engine/config/config-bot-run';

let files = fs.readdirSync(CONFIG_BOT_RUN);
for (const file of files) {
    fs.unlinkSync(path.join(CONFIG_BOT_RUN, file));
}

// array of bots to be exported:
let bots_to_export = {};

// fill the array with the bots to be exported:
let a = config_of_this_IP.bots;
for (let BOT_N in Object.keys(a)) {

    const BOT_N_PATH_TO_INDEX_JS = config_of_this_IP.roots["bot"] + "index.js";
    const BOT_N_NAME = Object.keys(a)[BOT_N];

    bots_to_export[BOT_N] = {
        script : BOT_N_PATH_TO_INDEX_JS,
        name   : BOT_N_NAME,
        args   : `${BOT_N_NAME}`,
    };

    let BOT_N_DATA_1_ECOSYSTEM = JSON.stringify({apps : bots_to_export[BOT_N]});
    let BOT_N_PATH_1_ECOSYSTEM = `${CONFIG_BOT_RUN}/${BOT_N}_${BOT_N_NAME}_ECOSYSTEM.js`;

    fs.writeFileSync(
        BOT_N_PATH_1_ECOSYSTEM,
        BOT_N_DATA_1_ECOSYSTEM,
    );
    console.log(BOT_N_DATA_1_ECOSYSTEM);

    let BOT_N_DATA_2_NODE = `node ${BOT_N_PATH_TO_INDEX_JS} ${BOT_N_NAME}`
    let BOT_N_PATH_2_NODE = `${CONFIG_BOT_RUN}/${BOT_N}_${BOT_N_NAME}_NODE.sh`
    
    fs.writeFileSync(
        BOT_N_PATH_2_NODE,
        BOT_N_DATA_2_NODE,
    );
    console.log(BOT_N_DATA_2_NODE);

    let BOT_N_DATA_3_PM2 = `pm2 start ${BOT_N_PATH_1_ECOSYSTEM} --name ${BOT_N_NAME}`
    let BOT_N_PATH_3_PM2 = `${CONFIG_BOT_RUN}/${BOT_N}_${BOT_N_NAME}_PM2.sh`

    fs.writeFileSync(
        BOT_N_PATH_3_PM2,
        BOT_N_DATA_3_PM2,
    );
    console.log(BOT_N_DATA_3_PM2);

}

// now, export the bots:
module.exports = {
    apps : bots_to_export,
}

