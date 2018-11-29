import Button from '../sprites/Button';
export default class extends Phaser.State {

	constructor() {
		super()
		this.s_bk
		this.btn_return
		this.btn_close
	}

	create() {
		this.s_bk = this.add.sprite(this.game.world.centerX, 0, 's_bk')
		this.s_bk.anchor.x = 0.5
		this.overlay = this.add.sprite(this.game.world.centerX, 0, 'overlay')
		this.overlay.anchor.x = 0.5
		this.bg_share = this.add.sprite(this.game.world.centerX, 0, 'bg_share')
		this.bg_share.anchor.x = 0.5

		this.game.clickAudio = this.game.add.audio('click')

		/*this.bg_share_a = this.add.sprite(this.game.world.centerX, 0, 'bg_share_a')
		this.bg_share_a.anchor.x = 0.5
		this.bg_share_a.alpha = 0.5*/

		this.scoreLabel = this.add.text(this.game.world.centerX, 240, 'SCORE:', {font: '18px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1})
		this.scoreLabel.anchor.setTo(0.5)
		this.scoreText = this.add.text(this.game.world.centerX, 290, this.game.score, {
      font: '48px ethnocentric',
			fill: '#fff',
			stroke: '#0ff',
      strokeThickness: 1
		})
		this.scoreText.anchor.setTo(0.5)

		this.add.sprite(0, 0, 'bd')

		this.btn_fb = new Button({
			game: this.game,
			x: 420,
			y: 350,
			asset: 'btn_fb',
			callback: () => {
				window.open("https://www.facebook.com/sharer/sharer.php?u=" + location.href, "_blank")
			}
		})

		this.btn_tw = new Button({
			game: this.game,
			x: 600,
			y: 350,
			asset: 'btn_tw',
			callback: () => {
				var mess = 'I have scored ' + this.game.score +' score on CARDFIGHT!! VANGUARD. Can you beat my score?'
				window.open(
					"https://twitter.com/home?status=" + mess,
					"_blank"
				)
			}
		})
		
		this.btn_return = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 470,
			asset: 'btn_return_l',
			callback: () => {this.state.start('Start')}
		})

		this.add.existing(this.btn_return)
		this.add.existing(this.btn_fb)
		this.add.existing(this.btn_tw)
	}
}