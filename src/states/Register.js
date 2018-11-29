import Button from '../sprites/Button';
import config from '../config';
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
		this.bg_reg = this.add.sprite(this.game.world.centerX, 0, 'bg_reg')
		this.bg_reg.anchor.x = 0.5
		
		this.game.clickAudio = this.game.add.audio('click')

		this.game.form.style.display = 'block'

		/*this.bg_reg_a = this.add.sprite(this.game.world.centerX, 0, 'bg_reg_a')
		this.bg_reg_a.anchor.x = 0.5
		this.bg_reg_a.alpha = 0.5*/
		
		this.add.sprite(0, 0, 'bd')

		this.btn_reg = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 470,
			asset: 'btn_reg',
			callback: () => {
				this.submit()
			}
		})
		this.btn_return = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 520,
			asset: 'btn_return',
			callback: () => {
				this.state.start('Start')
				this.game.form.style.display = 'none'
			}
		})

		this.add.existing(this.btn_reg)
		this.add.existing(this.btn_return)

	}

	submit() {
		if (!this.game.agree) {
			alert('You will need to agree to our Privacy Policy and Terms of Use to proceed. Thank you')
			return
		}
		if (!this.validateEmail(this.game.email)) {
			alert('Please enter valid your email, Thank you')
			return
		}
		var rq = new XMLHttpRequest()
		rq.open('POST', config.host + '/submit')
		rq.onload = () => {
			if (rq.status == 200) {
				var json = rq.responseText
				var user = JSON.parse(json)
				localStorage.setItem("key", user.key)
				localStorage.setItem("name", user.name)
				localStorage.setItem("email", user.email)
				this.state.start('Share')
				this.game.form.style.display = 'none'
			} else {
				alert(rq.responseText)
			}
		}
		var u = {
			name: this.game.name,
			email:  this.game.email,
			score: this.game.score,
			esign: this.game.esign
		}
		rq.send(JSON.stringify(u))
	}

	validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
}