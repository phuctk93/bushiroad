import Phaser from 'phaser'
import Button from '../sprites/Button';
import config from '../config';

export default class extends Phaser.State {

	constructor() {
		super()
		this.s_bk
		this.btn_start
		this.btn_tutor
		this.btn_lea
		this.btn_web
		this.btn_close
		this.currentPage = 0
	}

	create() {
		this.geted = false
		this.s_bk = this.add.sprite(this.game.world.centerX, 0, 's_bk')
		this.s_bk.anchor.x = 0.5
		this.add.sprite(500, 50, 'chars')
		this.game.clickAudio = this.add.audio('click')

		this.tutors = this.add.group()
		this.leas = this.add.group()

		this.btn_start = new Button({
			game: this.game,
			x: 350,
			y: 150,
			asset: 'btn_bg',
			text: 'START GAME',
			style: this.game.btn_style,
			callback: () => {this.state.start('Game')}
		})
		this.btn_tutor = new Button({
			game: this.game,
			x: 350,
			y: 250,
			asset: 'btn_bg',
			text: 'TUTORIAL',
			style: this.game.btn_style,
			callback: () => {
				this.toggle('tutor', true)
			}
		})
		this.btn_lea = new Button({
			game: this.game,
			x: 350,
			y: 350,
			asset: 'btn_bg',
			text: 'LEADERBOARD',
			style: this.game.btn_style,
			callback: () => {
				this.toggle('lea', true)
				this.getLeaderBoard()
			}
		})
		this.btn_web = new Button({
			game: this.game,
			x: 350,
			y: 450,
			asset: 'btn_bg',
			text: 'CARDFIGHT!!\nVANGUARD WEBSITE',
			style: this.game.btn_style_s,
			callback: () => {
				window.open("https://en.cf-vanguard.com/","_blank")
			}
		})

		this.foot_style = {font: '14px levenim-bd', fill: '#000', align: "center"}
		this.foot_text = this.add.text(250, 490,
			'©Project Vanguard 2018',
			this.foot_style
		)

		this.add.text(230, 510,
			'© Bushiroad International Pte Ltd.',
			this.foot_style
		)

		this.tap_text = this.add.text(210, 530,
			'Tap here to view our privacy message',
			this.foot_style
		)
		this.underline = this.add.graphics(this.tap_text.left, this.tap_text.bottom - 5)
		this.underline.lineStyle(1, 0x000)
		this.underline.beginFill(0x000)
		// Location to start drawing the line (x, y)
		this.underline.drawRect(0, 0, this.tap_text.width, 2)
		this.tap_text.inputEnabled = true;
		this.tap_text.events.onInputDown.add( () => {
			window.open("https://en.bushiroad.com/privacy/", "_blank")
			
		}, this.tap_text)

		this.add.existing(this.btn_start)
		this.add.existing(this.btn_tutor)
		this.add.existing(this.btn_lea)
		this.add.existing(this.btn_web)

		this.overlay = this.add.sprite(this.game.world.centerX, 0, 'overlay')
		this.overlay.anchor.x = 0.5
		this.overlay.inputEnabled = true
		this.overlay.visible = false
		this.btn_close_tutor = new Button({
			game: this.game,
			x: 860,
			y: 35,
			asset: 'btn_close',
			callback: () => {this.toggle('tutor', false)}
		})
		this.btn_close_tutor.anchor.x = 1
		this.btn_close_tutor.visible = false

		this.btn_close_lea = new Button({
			game: this.game,
			x: 860,
			y: 35,
			asset: 'btn_close',
			callback: () => {this.toggle('lea', false)}
		})
		this.btn_close_lea.anchor.x = 1
		this.btn_close_lea.visible = false

		this.btn_next = new Button({
			game: this.game,
			x: this.game.world.centerX + 160,
			y: 285,
			asset: 'btn_next',
			callback: () => {
				if (this.currentPage < 5) {
					this.currentPage++
				} else {
					this.currentPage = 0
				}
				this.setCurrent(this.currentPage)
			}
		})
		this.tutors.add(this.btn_next)

		this.btn_pre = new Button({
			game: this.game,
			x: this.game.world.centerX - 160,
			y: 285,
			asset: 'btn_pre',
			callback: () => {
				if (this.currentPage > 0) {
					this.currentPage--
				} else {
					this.currentPage = 5
				}
				this.setCurrent(this.currentPage)
			}
		})
		this.tutors.add(this.btn_pre)

		const bd_tutor = this.add.sprite(this.game.world.centerX, 285, 'bd_tutor')
		bd_tutor.anchor.setTo(0.5)
		this.tutors.add(bd_tutor)

		for (let i = 1; i <= 6; i++) {
			const tutor = this.add.sprite(this.game.world.centerX, 285, 'bg_tutor' + i)
			tutor.name = 'bg_tutor' + i
			tutor.anchor.setTo(0.5)
			this.tutors.add(tutor)
		}

		const bd_tutor_bot = this.add.sprite(this.game.world.centerX, 455, 'bd_tutor_bot')
		bd_tutor_bot.anchor.setTo(0.5)
		this.tutors.add(bd_tutor_bot)

		this.c_pageX = this.game.world.centerX - 45
		this.c_page = this.add.sprite(this.c_pageX, 455, 'c_page')
		this.c_page.anchor.setTo(0.5)
		this.tutors.add(this.c_page)

		this.setCurrent(0)

		this.tutors.visible = false

		this.score_bg = this.add.sprite(this.game.world.centerX, 285, 'score_bg')
		this.score_bg.anchor.setTo(0.5)
		this.leas.add(this.score_bg)
		var style = { font: 'bold 12px levenim-bd', fill: '#fff', align: "center" }
		this.createTextRank(400, 150, 'lb_rank', 'Position', style)
		this.createTextRank(this.game.world.centerX, 150, 'lb_name', 'Name', style)
		this.createTextRank(600, 150, 'lb_score', 'Score', style)
		this.leas.visible = false

		this.game.world.bringToTop(this.tutors)
		this.game.world.bringToTop(this.leas)

		this.add.existing(this.tutors)
		this.add.existing(this.leas)
		this.add.existing(this.btn_close_tutor)
		this.add.existing(this.btn_close_lea)

		this.game.add.sprite(0, 0, 'bd')

	}

	toggle(name, visible) {
		if (name ==  'tutor') {
			this.btn_close_tutor.visible = visible
			this.tutors.visible = visible
		} else {
			this.btn_close_lea.visible = visible
			this.leas.visible = visible
		}
		this.overlay.visible = visible
	}

	setCurrent(current) {
		this.c_page.x = this.c_pageX + (current * 18.5)
		for (let i = 1; i <= 6; i++) {
			this.tutors.getByName('bg_tutor' + i).visible = false
		}
		var c  = current + 1
		this.tutors.getByName('bg_tutor'+ c).visible = true
	}

	getLeaderBoard() {
		var rq = new XMLHttpRequest()
		rq.open('GET', config.host + '/lb')
		rq.onload = () => {
			if (rq.status == 200) {
				var json = rq.responseText
				var records = JSON.parse(json)
				for (let i = 0; i < 10; i++) {
					const record = records[i];
					this.listRecord(i + 1, record)
				}
				this.geted = true
			}
		}
		rq.send()
	}

	listRecord(rank, record) {
		if (this.geted) {
			this.leas.getByName('lb_rank' + rank).text = rank
			this.leas.getByName('lb_name' + rank).text = record.name
			this.leas.getByName('lb_score' + rank).text = record.score
		} else {
			var style = { font: '12px levenim', fill: '#fff', align: "center" }
			this.createTextRank(400, 150 + rank * 25, 'lb_rank' + rank, rank, style)
			this.createTextRank(this.game.world.centerX, 150 + rank * 25, 'lb_name' + rank, record.name, style)
			this.createTextRank(600, 150 + rank * 25, 'lb_score' + rank, record.score, style)
		}
	}

	createTextRank(x, y, name, text, style) {
		var t = this.add.text(x, y, text, style)
		t.name = name
		t.anchor.x =  0.5
		this.leas.add(t)
	}
}