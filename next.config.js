const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase,{ defaultConfig }) => {
    if(phase === PHASE_DEVELOPMENT_SERVER){
        return {
            env:{
                DB_USER:'admin',
                DB_PASS:'KfyQdJBRVG6iigQJ',
                DB_NAME:'testing'
            }
        }
    }

    return defaultConfig;
}