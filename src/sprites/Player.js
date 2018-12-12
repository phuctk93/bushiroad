export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.set(0.5)
    this.animSpeed = 15
    const animArray = new Array(25)
    for (let i = 0; i < animArray.length; i++) {
      animArray[i] = i
    }
    const jumpArray = animArray.slice(0, 12)
    const runArray = animArray.slice(13, 25)
    this.animations.add('jump', jumpArray)
    this.animations.add('run', runArray)
    this.animations.play('run', this.animSpeed, true)
    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.gravity.y = this.game.gravity
    //this.body.setCircle(70, 25, 25)
    this.body.collideWorldBounds = true
    this.canJump = false
    this.flashed = false
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update () {
    if ( this.body.onFloor() ) {
      if (game.input.activePointer.isDown || this.spaceKey.isDown) {
        this.canJump = true;
        if (game.input.activePointer.duration >= 50 || this.spaceKey.duration >= 50 ) {
          this.jump(game.heighJump)
        }
      } else if ( this.canJump ) {
        if (game.input.activePointer.isUp ||!this.spaceKey.isDown) {
          this.jump(game.shortJump)
        }
      }
      if (!this.animations.getAnimation('run').isPlaying && !this.animations.getAnimation('jump').isPlaying){
        this.animations.stop('jump')
        this.animations.play('run', this.animSpeed, true)
      }
        
    }
  }

  getTime(pointer) {
    this.lastDuration = pointer.duration;
  }

  jump(heigh) {
    this.body.velocity.y = -heigh;
    this.canJump = false
    this.game.jumpAudio.play()
    if (!this.animations.getAnimation('jump').isPlaying) {
      this.animations.stop('run')
      this.animations.play('jump', this.animSpeed, false)
    }
  }

  death() {
    this.body.collideWorldBounds = false
    this.jump(this.game.heighJump)
  }
}
