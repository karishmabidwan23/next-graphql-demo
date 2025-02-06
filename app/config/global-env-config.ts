
/**
 * Create global config file to avoid using enviroment variable scatteredly in whole application. 
 * With this file we can mention all required process.env here. Also later if we want to inclucde evnrioment variable 
 * from other sources like secrets etc Its good to configure everything at once place.
 */
export const GLOBAL_ENV_CONFIG = {
    gitGraphqlUrl: process.env.GITHUB_GRAPHQL_URL,
    gitAuthToken: process.env.GITHUB_AUTH_TOKEN
}