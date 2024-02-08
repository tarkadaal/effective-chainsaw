import Phaser from 'phaser/dist/phaser.js'
import sum from './sum.js'

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
    const x = sum(125, 100)
    this.add.text(x, 100, 'Set Phaser to stun; you\'re good to go!', { fontFamily: 'sans' })
    const ssprite = this.add.sprite(375, 290, 'sawfish').play({ key: 'spin', repeat: -1 })// eslint-disable-line no-unused-vars
    this.add.text(250, 500, 'No sound? Try clicking the panel.', { fontFamily: 'sans' })
    const music = this.sound.add('jingle')
    music.play()
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Example
}

const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
