import Phaser from 'phaser'
import Button from '../sprites/Button';
import config from '../config';
export default class extends Phaser.State {

	constructor() {
		super()
		this.s_bk
		this.btn_return
		this.btn_prize
		this.btn_close
		this.score
	}

	create() {
		this.s_bk = this.add.sprite(this.game.world.centerX, 20, 's_bk')
		this.s_bk.anchor.x = 0.5
		this.overlay = this.add.sprite(this.game.world.centerX, 0, 'overlay')
		this.overlay.anchor.x = 0.5

		this.game.clickAudio = this.game.add.audio('click')

		/*this.bg_score_a = this.add.sprite(this.game.world.centerX, 20, 'bg_score_a')
		this.bg_score_a.anchor.x = 0.5
		this.bg_score_a.alpha = 0.5*/

		this.add.sprite(0, 0, 'bd')
		this.add.sprite(450, 60, 'score_bg')

		this.hightlight = this.add.sprite(465, 88, 'highlight')
		this.hightlight.alpha = 0.5
		this.hightlight.scale.x = 0.89

		this.leas = this.add.group()

		this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR)

		this.btn_prize = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 460,
			asset: 'btn_bg',
			text: 'ENTER TO WIN\nEXCLUSIVE PRIZES',
			style: this.game.btn_style_s,
			callback: () => {this.state.start('Register')}
		})
		this.btn_return = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 520,
			asset: 'btn_bg_s',
			text: 'RETURN TO START',
			style: this.game.btn_style_ss,
			callback: () => {this.state.start('Start')}
		})
		this.btn_close = new Button({
			game: this.game,
			x: 860,
			y: 35,
			asset: 'btn_close',
			callback: () => {this.state.start('Start')}
		})
		this.btn_close.anchor.setTo(1, 0)
		
		this.add.text(220, 80, 'DISTANCE SCORE', { font: '10px ethnocentric', fill: '#fff'})
		this.sText = this.add.text(220, 92, this.game.s + ' meters x 1 point', {
      font: '16px levenim',
      fill: '#fff'
    })
		
		const clanLabel = this.add.text(220, 132, 'RELEVANT CLAN ICONS\nCOLLECTED', {
			font: '10px ethnocentric',
			fill: '#fff'
		})
		clanLabel.lineSpacing = -5
		this.clanText = this.add.text(220, 155, this.game.clan + ' icons x 5 points', {
      font: '16px levenim',
      fill: '#fff'
    })
		this.game.score = this.game.s * 1 + this.game.clan * 5

		this.add.text(220, 200, 'CARDS COLLECTED', { font: '10px ethnocentric', fill: '#fff'})
		var j = 0
		for (const key in this.game.cards) {
			if (this.game.cards.hasOwnProperty(key)) {
				const v = this.game.cards[key];
				this.add.text(220, 212 + j * 18, v.count + ' ' + v.name + ' cards x ' + v.point + ' points', {
					font: '16px levenim',
					fill: '#fff'
				})
				j++
				this.game.score += (v.point * v.count)
			}
		}
		this.add.text(220, 312, 'SCORE:', {font: '18px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1})
		this.scoreText = this.add.text(220, 332, this.game.score, {
      font: '32px ethnocentric',
			fill: '#fff',
			stroke: '#0ff',
      strokeThickness: 1
		})
		
		var style = { font: 'bold 12px levenim-bd', fill: '#fff', align: "center" }
		this.createTextRank(520, 90, 'lb_rank', 'Position', style)
		this.createTextRank(620, 90, 'lb_name', 'Name', style)
		this.createTextRank(720, 90, 'lb_score', 'Score', style)

		this.add.existing(this.btn_prize)
		this.add.existing(this.btn_return)
		this.add.existing(this.leas)
		this.getRank()
	}

	getRank() {
		var rq = new XMLHttpRequest()
		rq.open('POST', config.host + '/rank')
		rq.onload = () => {
			if (rq.status == 200) {
				var json = rq.responseText
				var records = JSON.parse(json)
				var pos = 0
				for (let i = 0; i < 10; i++) {
					const record = records.list[i];
					if (pos == 0) {
						if (record.rank > records.rank) {
							pos = 1
							var you = {rank: records.rank + 1, name: "YOU", score: this.game.score}
							this.listRecord(i + 1, you)
							this.hightlight.y = 90 + (i + 1) * 24.5
						}
					}
					record.rank += pos
					this.listRecord(i + 1 + pos, record)
				}
			}
		}
		rq.send(JSON.stringify(this.game.score))
	}

	listRecord(i, record) {
		if (i <= 10) {
			var style = { font: '12px levenim', fill: '#fff', align: "center" }
			this.createTextRank(520, 90 + i * 25, 'lb_rank' + i, record.rank, style)
			this.createTextRank(620, 90 + i * 25, 'lb_name' + i, record.name, style)
			this.createTextRank(720, 90 + i * 25, 'lb_score' + i, record.score, style)
		}
	}

	createTextRank(x, y, name, text, style) {
		var t = this.add.text(x, y, text, style)
		t.name = name
		t.anchor.x =  0.5
		this.leas.add(t)
	}
}