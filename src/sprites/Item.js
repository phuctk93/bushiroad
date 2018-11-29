export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, type}) {
    super(game, x, y, asset, type)
		this.anchor.setTo(0.5)
		game.physics.arcade.enable(this);
		this.type = type
  }

}
