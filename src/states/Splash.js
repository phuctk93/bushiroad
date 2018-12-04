import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //Share all
    this.load.audio('click', 'assets/audio/click.wav')
    this.load.audio('jump1', 'assets/audio/jump1.wav')
    this.load.audio('wrong', 'assets/audio/wrong.wav')
    this.load.audio('card_sound', 'assets/audio/card.wav')
    this.load.audio('collect_sound', 'assets/audio/collect.wav')
    this.load.audio('bg_sound', 'assets/audio/bg.ogg')

    this.load.image('btn_bg', 'assets/images/btn_bg.png')
    this.load.image('btn_bg_s', 'assets/images/btn_bg_s.png')

    //Start scene
    this.load.image('chars', 'assets/images/start/character.png')
    this.load.image('s_bk', 'assets/images/start/s_bk.png')
    this.load.image('overlay', 'assets/images/start/overlay.png')
    this.load.image('bd', 'assets/images/start/bd.png')

    this.load.image('btn_lea', 'assets/images/start/btn_lea.png')
    this.load.image('btn_start', 'assets/images/start/btn_start.png')
    this.load.image('btn_tutor', 'assets/images/start/btn_tutor.png')
    this.load.image('btn_web', 'assets/images/start/btn_web.png')
    this.load.image('btn_close', 'assets/images/start/btn_close.png')
    this.load.image('btn_next', 'assets/images/start/btn_next.png')
    this.load.image('btn_pre', 'assets/images/start/btn_pre.png')

    this.load.image('bd_tutor', 'assets/images/start/bd_tutor.png')
    this.load.image('bd_tutor_bot', 'assets/images/start/bd_tutor_bot.png')
    this.load.image('c_page', 'assets/images/start/c_page.png')
    this.load.image('bg_tutor1', 'assets/images/start/bg_tutor1.png')
    this.load.image('bg_tutor2', 'assets/images/start/bg_tutor2.png')
    this.load.image('bg_tutor3', 'assets/images/start/bg_tutor3.png')
    this.load.image('bg_tutor4', 'assets/images/start/bg_tutor4.png')
    this.load.image('bg_tutor5', 'assets/images/start/bg_tutor5.png')
    this.load.image('bg_tutor6', 'assets/images/start/bg_tutor6.png')

    this.load.image('highlight', 'assets/images/start/highlight.png')

    //Play scene
    this.load.atlas('player', 'assets/animation/player.png', 'assets/animation/player.json')
    this.load.image('shadow', 'assets/images/play/shadow.png')
    this.load.image('ground', 'assets/images/play/ground.png');
    this.load.image('rock1', 'assets/images/play/rock1.png');
    this.load.image('rock2', 'assets/images/play/rock2.png');
    this.load.image('sky', 'assets/images/play/bg_loop.png');
    this.load.image('bd_top', 'assets/images/play/bd_top.png');
    this.load.image('hp', 'assets/images/play/health.png');
    this.load.image('card', 'assets/images/play/card.png');
    this.load.image('card_c', 'assets/images/play/card_c.png');
    this.load.image('card_r', 'assets/images/play/card_r.png');
    this.load.image('card_sr', 'assets/images/play/card_sr.png');
    this.load.image('card_vr', 'assets/images/play/card_vr.png');
    this.load.image('clan', 'assets/images/play/clan.png');
    this.load.image('icon_avoid', 'assets/images/play/icon_avoid.png');
    this.load.image('icon_collect', 'assets/images/play/icon_collect.png');
    this.load.image('fg', 'assets/images/play/fg.png');
    this.load.image('fg1', 'assets/images/play/fg1.png');

    //End
    this.load.image('btn_return', 'assets/images/end/btn_return.png');
    this.load.image('btn_prize', 'assets/images/end/btn_prize.png');
    this.load.image('score_bg', 'assets/images/end/score_bg.png');

    //Register
    this.load.image('bg_reg', 'assets/images/register/bg_reg.png');
    this.load.image('btn_reg', 'assets/images/register/btn_reg.png');

    //Share
    this.load.image('bg_share', 'assets/images/share/bg_share.png')
    this.load.image('btn_fb', 'assets/images/share/btn_fb.png')
    this.load.image('btn_tw', 'assets/images/share/btn_tw.png')
    this.load.image('btn_return_l', 'assets/images/share/btn_return_l.png')

    /*Temp asset
    this.load.image('bg_score_a', 'assets/images/end/bg_score_a.png')
    this.load.image('bg_share_a', 'assets/images/share/bg_share_a.png')
    this.load.image('bg_reg_a', 'assets/images/register/bg_reg_a.png')*/
  }

  create () {
    this.state.start('Start')
  }
}
