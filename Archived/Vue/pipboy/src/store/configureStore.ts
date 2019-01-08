import devConfig, { routerHistory as devhistory } from './configureStore.dev'
import prodConfig, { routerHistory as prodhistory } from './configureStore.prod'

export default process.env.NODE_ENV === 'production' ?  prodConfig : devConfig
export const routerHistory = process.env.NODE_ENV === 'production' ?  prodhistory : devhistory