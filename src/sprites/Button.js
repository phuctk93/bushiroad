export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, callback }) {
    super(game, x, y, asset, callback)
		this.anchor.setTo(0.5)
		this.inputEnabled = true
		this.events.onInputDown.add(() => {
			this.game.clickAudio.play()
			callback()
		}, this)
		this.events.onInputOut.add(this.out, this)
		this.events.onInputOver.add(this.over, this)
	}
	
	over() {
		this.tint = 0x00ffff
	}

	out() {
		this.tint = 0xffffff
	}
}
