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
    this.add.bitmapText(35, 70, 'coolfont', 'CAPTAIN SAWFISH IS BLASTING OFF AGAIN!')
    const sawfishShape = [[
      { x: 0, y: 0 },
      { x: 53, y: 0 },
      { x: 56, y: 2 },
      //      { x: 59, y: 4 },
      //      { x: 59, y: 6 },
      { x: 56, y: 7 },
      { x: 53, y: 9 },
      { x: 0, y: 9 },
      { x: 0, y: 0 }
    ]]
    this.sawfish = this.matter.add.sprite(50, 150, 'sawfish', null, {
      shape: {
        type: 'fromVerts',
        verts: sawfishShape
      },
      density: 1,
      frictionStatic: 8,
      frictionAir: 0.13,
      render: { sprite: { xOffset: 0, yOffset: 0.5 } }
    }
    )
    this.sawfish.setFriction(0.4)
    this.sawfish.play({ key: 'eyebrows', repeat: -1 })// eslint-disable-line no-unused-vars

    for (let j = 0; j < 16; j++) {
      for (let i = 0; i < Math.floor(400 / 12) + 1; i++) {
        this.add.sprite(
          (i * 12) - (j % 2 ? 0 : 6),
          220 + (6 * j),
          'brick'
        )
      }
    }
    this.matter.add.rectangle(200, 266, 600, 100, { isStatic: true, friction: 1 })
    const music = this.sound.add('jingle')

    music.play()
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update () {
    // const spinSpeed = this.sawfish.getAngularVelocity()
    if (this.cursors.right.isDown) {
      // this.sawfish.setAngularVelocity(spinSpeed + (0.005 * velocity.x))
      this.sawfish.applyForceFrom(this.sawfish.getBottomLeft(), { x: 0.39, y: -0.34 })
      if (this.sawfish.anims.currentAnim.key !== 'spin') {
        this.sawfish.play({ key: 'spin', repeat: -1 })
      }
    } else {
      //      this.sawfish.setAngularVelocity(spinSpeed - 0.1)
      if (this.sawfish.anims.currentAnim.key !== 'eyebrows') {
        this.sawfish.play({ key: 'idle', repeat: -1 })
      }
    }
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
    default: 'matter',
    matter: {
      gravity: { y: 1.3 }
    }
  }
}

const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
