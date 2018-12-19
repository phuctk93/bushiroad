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
		
		this.game.clickAudio = this.game.add.audio('click')

		this.game.form.style.display = 'block'

		/*this.bg_reg_a = this.add.sprite(this.game.world.centerX, 0, 'bg_reg_a')
		this.bg_reg_a.anchor.x = 0.5
		this.bg_reg_a.alpha = 0.5*/

		this.thank = this.add.text(
			this.game.world.centerX,
			75,
			'ENTER TO WIN \nEXCLUSIVE PRIZES',
			{font: '28px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1, align: 'center'}
		)
		this.thank.anchor.setTo(0.5)
		this.thank.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.we = this.add.text(
			this.game.world.centerX,
			160,
			'Enter the following details and stand a chance to win exclusive Cardfight!! Vanguard Prizes!!',
			{font: '13px levenim', fill: '#fff'}
		)
		this.we.anchor.setTo(0.5)
		
		this.add.sprite(0, 0, 'bd')

		this.btn_reg = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 460,
			asset: 'btn_bg',
			text: 'SUBMIT',
			style: this.game.btn_style,
			callback: () => {
				this.submit()
				//this.state.start('Share')
				//this.game.form.style.display = 'none'
			}
		})
		this.btn_return = new Button({
			game: this.game,
			x: this.world.centerX,
			y: 520,
			asset: 'btn_bg_s',
			text: 'RETURN TO GAME',
			style: this.game.btn_style_ss,
			callback: () => {
				this.state.start('Start')
				this.game.form.style.display = 'none'
			}
		})

		this.add.existing(this.btn_reg)
		this.add.existing(this.btn_return)

	}

	submit() {
		if (this.game.name === '') {
			alert('Please enter your name')
			return
		}
		if (!this.game.agree) {
			alert('You will need to agree to our Privacy Policy and Terms of Use to proceed. Thank you')
			return
		}
		if (!this.validateEmail(this.game.email)) {
			alert('Please enter a valid your email address to submit your score. Thank you')
			return
		}
		if (this.validBadWord(this.game.name)) {
			alert('We have spotted foul language used in your name. Please amend before submitting. Thank you')
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
		rq.onerror = () => {
			alert("Error!! Please try again!")
		}
		var u = {
			name: this.game.name,
			email:  this.game.email,
			score: this.game.score,
			esign: this.game.esign
		}
		rq.send(JSON.stringify(u))
	}

	validBadWord(word) {
		const bad_words = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi
		return bad_words.test(String(word).toLowerCase())
	}

	validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
}