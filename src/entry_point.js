import Phaser from 'phaser/dist/phaser.js'

// Assets alias is defined in webpack.config.js
import SawfishSpritesheet from 'Assets/textures/sawfish.png'
import SawfishData from 'Assets/textures/sawfish.json'
import Jingle from 'Assets/sounds//music//phaser-jingle.wav'
import Brick from 'Assets/textures/brick2.png'
import FontImage from 'Assets/fonts/calligro-page-0.png'
import FontData from 'Assets/fonts/calligro-font.xml'

class Example extends Phaser.Scene {
  preload () {
    this.load.aseprite('sawfish', SawfishSpritesheet, SawfishData)
    this.load.audio('jingle', [Jingle])
    this.load.image('brick', Brick)
    this.load.bitmapFont('coolfont', FontImage, FontData)
  }

  create () {
    this.anims.createFromAseprite('sawfish')
    // this.add.text(10, 50, 'CAPTAIN SAWFISH SAVES THE F**KING WORLD', { fontFamily: 'mono' })
    this.add.bitmapText(35, 70, 'coolfont', 'CAPTAIN SAWFISH SAVES THE F**KING WORLD!')
    const ssprite = this.physics.add.sprite(200, 150, 'sawfish').play({ key: 'spin', repeat: -1 })// eslint-disable-line no-unused-vars

    const bricks = this.physics.add.staticGroup()
    const brickConfigs = []
    for (let j = 0; j < 16; j++) {
      for (let i = 0; i < Math.floor(400 / 12) + 1; i++) {
        const brick = {
          key: 'brick',
          setXY: {
            x: (i * 12) - (j % 2 ? 0 : 6),
            y: 220 + (6 * j)
          },
          setOrigin: {
            x: 0,
            y: 0
          }
        }
        brickConfigs.push(brick)
      }
    }
    this.physics.add.collider(ssprite, bricks)
    bricks.createMultiple(brickConfigs)
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
  zoom: 3,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}

const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
