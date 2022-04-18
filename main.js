const path = require('path')
const url = require('url')

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const windowSetup = new BrowserWindow({
    width: 500,
    height: 800,
    fullscreenable: true,
    center: true,
    resizable: true,
    webPreferences: {
      images: true,
      nodeIntegration: false,

      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Bet Nimo',
  })

  windowSetup.loadFile('index.html')
}

app.dock.setIcon = path.join(__dirname, 'assets', 'logo.icns')

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// windows and linux quit app if no windows open
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.exit()
})
