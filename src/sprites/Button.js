export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, text, style, callback }) {
		super(game, x, y, asset, callback)

		this.text = game.add.text(0, 0, text, style)
		this.text.anchor.setTo(0.5)
		this.text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 4);

		this.addChild(this.text)

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
		this.text.tint = 0x00ffff
	}

	out() {
		this.tint = 0xffffff
		this.text.tint = 0xffffff
	}
}
