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

		this.thank = this.add.text(
			this.game.world.centerX,
			75,
			'THANK YOU FOR \nYOUR SUBMISSION',
			{font: '28px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1, align: 'center'}
		)
		this.thank.anchor.setTo(0.5)
		this.thank.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		/*this.we = this.add.text(
			this.game.world.centerX,
			145,
			'We will notify the Top 10 Players on your Prizes!',
			{font: '13px levenim', fill: '#fff'}
		)
		this.we.anchor.setTo(0.5)*/

		this.brag = this.add.text(
			this.game.world.centerX,
			190,
			'Brag about it?',
			{font: 'bold 28px levenim-bd', fill: '#fff', stroke: '#0ff', strokeThickness: 1}
		)
		this.brag.anchor.setTo(0.5)
		this.brag.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.scoreLabel = this.add.text(this.game.world.centerX, 240, 'SCORE:', {font: '18px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1})
		this.scoreLabel.anchor.setTo(0.5)
		this.scoreText = this.add.text(this.game.world.centerX, 290, this.game.score, {
      font: '48px ethnocentric',
			fill: '#fff',
			stroke: '#0ff',
      strokeThickness: 1
		})
		this.scoreText.anchor.setTo(0.5)
		this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.add.sprite(0, 0, 'bd')

		const btn_share_style = {font: '10.5px', fill: '#fff'}
		this.btn_fb = new Button({
			game: this.game,
			x: 420,
			y: 350,
			asset: 'btn_fb',
			text: 'Share on Facebook',
			style: btn_share_style,
			callback: () => {
				window.open("https://www.facebook.com/sharer/sharer.php?u=" + location.href, "_blank")
			}
		})
		this.btn_fb.text.setShadow(0, 0, 0x000)
		this.btn_fb.text.y = 3
		this.btn_fb.text.x = 9

		this.btn_tw = new Button({
			game: this.game,
			x: 600,
			y: 350,
			asset: 'btn_tw',
			text: 'Share on Twitter',
			style: btn_share_style,
			callback: () => {
				var mess = 'I have scored ' + this.game.score +' score on CARDFIGHT!! VANGUARD. Can you beat my score?'
				window.open(
					"https://twitter.com/home?status=" + mess,
					"_blank"
				)
			}
		})
		this.btn_tw.text.setShadow(0, 0, 0x000)
		this.btn_tw.text.y = 3
		this.btn_tw.text.x = 7
		
		this.btn_return = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 470,
			asset: 'btn_bg',
			text: 'RETURN TO\nSTART GAME',
			style: this.game.btn_style_s,
			callback: () => {this.state.start('Start')}
		})

		this.add.existing(this.btn_return)
		this.add.existing(this.btn_fb)
		this.add.existing(this.btn_tw)
	}
}