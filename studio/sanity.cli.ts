import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'up3mwksb',
    dataset: 'production'
  },
  studioHost: 'mg-modas-feminina',
  deployment: {
    appId: 'adydrrys8u2y0kb3evmyb6rq',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
