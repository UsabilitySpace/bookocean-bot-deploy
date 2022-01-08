# ks = killall + start

# main job

killall -9 node; clear; npm start

# ─────────────────────────────────

# value added in all public files

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $SCRIPT_DIR/@bash_inc_deploy

# ─────────────────────────────────


