// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {desktopCapturer} = require('electron')
desktopCapturer.getSources({types: ['screen']})
  .then(sources => {
    console.log(`sources: `, sources)
  })

// this is where the sources screenshots can be created into thumbnails
document.getElementById('screenshot-button').addEventListener('click', () => {
  desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {width:1920, height:1080},
  })
    .then(sources => {
      // set the thumbnail of the primary display to show up in the IMG placeholder (id='placeholder')
      document.getElementById('screenshot').style.padding = "24px"
      document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
    })
})

document.getElementById('windowshot-button').addEventListener('click', () => {
  desktopCapturer.getSources({
    types: ['window'],
    // thumbnailSize: {width:1920, height:1080},
  })
    .then(sources => {
      // set the thumbnail of the primary display to show up in the IMG placeholder (id='placeholder')
      document.getElementById('screenshot').style.padding = "24px"
      document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
    })
})

