
# r = restart

# to be called on SERVER only

# must include 'update' beforehand
# source update

# save dir_cur:
dir_cur=$PWD

# go to working dir:
cd $dir_root

# do main job:

# pm2 delete all

cd $dir_rooted_developer
echo $PWD
pm2 restart index.js

cd $dir_rooted_production
echo $PWD
pm2 restart index.js

cd $dir_rooted_user
echo $PWD
pm2 restart index.js

cd $dir_rooted_vip_0000
echo $PWD
pm2 restart index.js

cd $dir_rooted_client
echo $PWD
pm2 restart index.js

cd $dir_rooted_sinar
echo $PWD
pm2 restart index.js

# cd /var/www/www-root/data/nodejs/server/anastasiya-bot/anastasiya-bot-developer-hosting-regru
# echo $PWD
# pm2 start src/index.js

pm2 save

# return to $cur_dir:
cd $dir_cur

# ─────────────────────────────────

# value added in all public files

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $SCRIPT_DIR/@bash_inc_deploy

# ─────────────────────────────────

# must do nothing else ■

