const {
  utils: { fromBuildIdentifier },
} = require('@electron-forge/core')
const path = require('path')

module.exports = {
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod',
  /** @type {import('electron-packager').Options} */
  packagerConfig: {
    appBundleId: fromBuildIdentifier({ beta: 'dev.finir', prod: 'dev.finir' }),
    name: 'Kèo Nimo',
    icon: './assets/logo.icns',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Kèo Nimo',
        setupIcon: './assets/logo.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        name: 'Kèo Nimo',
        setupIcon: './assets/logo.ico',
      },
    },
  ],
}
