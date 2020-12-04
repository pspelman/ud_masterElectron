// Notarize module
const {notarize} = require('electron-notarize')

console.log(`Notarizing app`)

exports.default = async function (context) {
  // this will be run for all targets, not just Mac
  // Skip notarize if NOT macOS
  console.log(`SKIPPING NOTARIZATION`)
  return
  if (process.platform !== 'darwin') return

  // Get some context vars
  let appName = context.packager.appInfo.productFilename
  let appDir = context.appOutDir

  // Run Notarize
  return await notarize({
    appBundleId: 'com.readits.philspelman',
    appPath: `${appDir}/${appName}.app`,
    appleId: process.env.appleId,
    appleIdPassword: process.env.appleIdPassword
  })
}
