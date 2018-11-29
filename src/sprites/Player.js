export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = this.game.gravity;
    this.body.collideWorldBounds = true;
    this.canJump = false;
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update () {
    if ( this.body.onFloor() ) {
      if (game.input.activePointer.isDown || this.spaceKey.isDown) {
        this.canJump = true;
        if (game.input.activePointer.duration >= 100 || this.spaceKey.duration >= 100 ) {
          this.body.velocity.y = -game.heighJump;
          this.canJump = false
          this.game.jumpAudio.play()
        }
      } else if ( this.canJump ) {
        if (game.input.activePointer.isUp ||!this.spaceKey.isDown) {
          this.body.velocity.y = -game.shortJump;
          this.canJump = false
          this.game.jumpAudio.play()
        }
      }
    }
  }

  getTime(pointer) {
    this.lastDuration = pointer.duration;
  }
}
