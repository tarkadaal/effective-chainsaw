import Phaser from 'phaser/dist/phaser.js'

// Assets alias is defined in webpack.config.js
import SawfishSpritesheet from 'Assets/textures/sawfish.png'
import SawfishData from 'Assets/textures/sawfish.json'
import Jingle from 'Assets/sounds//music//phaser-jingle.wav'

class Example extends Phaser.Scene {
  preload () {
    this.load.aseprite('sawfish', SawfishSpritesheet, SawfishData)
    this.load.audio('jingle', [Jingle])
  }

  create () {
    this.anims.createFromAseprite('sawfish')
    this.add.text(50, 50, 'Set Phaser to stun; you\'re good to go!', { fontFamily: 'sans' })
    const ssprite = this.add.sprite(200, 150, 'sawfish').play({ key: 'spin', repeat: -1 })// eslint-disable-line no-unused-vars
    this.add.text(50, 250, 'No sound? Try clicking the panel.', { fontFamily: 'sans' })
    const music = this.sound.add('jingle')
    music.play()
  }
}

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  scene: Example,
  pixelArt: true,
  zoom: 3
}

const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
