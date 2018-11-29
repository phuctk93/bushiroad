/* globals __DEV__ */
//import Phaser from 'phaser'
import Player from '../sprites/Player'
import Item from '../sprites/Item';
import Sprite from '../sprites/Sprite';

export default class extends Phaser.State {
  constructor() {
    super();
    this.s = 0
    this.v = 5
    this.t = 10
    this.t1 = 1
    this.banner
    this.clanSprites
    this.clan = 0
    this.life = 3
    this.cardSprites
    this.background
    this.ground
    this.randomX
    this.randomObj
    //this.randomArr = [40]
    this.cardArr = [20]
    this.items
    this.item
    this.col
    this.avoid
    this.rock1
    this.rock2
    this.lifeSprites
    this.plusText
  }
  init() { }
  preload() {
    
  }

  create() {
    this.s = 0
    this.v = this.game.speed
    this.t = 10
    this.t1 = 1
    this.clan = 0
    this.life = 3

    this.game.world.setBounds(0, 0, this.game.width, 450);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    for (const key in this.game.cards) {
			if (this.game.cards.hasOwnProperty(key)) {
        const v = this.game.cards[key];
        v.count = 0;
			}
    }
    

    this.background = this.add.tileSprite(this.game.world.centerX, 0, 710, 510, 'sky');
    this.background.anchor.x = 0.5

    this.game.jumpAudio = this.add.audio('jump1')
    this.game.wrongAudio = this.add.audio('wrong')

    this.collect_sound = this.add.audio('collect_sound')
    this.card_sound = this.add.audio('card_sound')

    this.ground = this.add.tileSprite(this.game.world.centerX, this.game.height, 711, 312, 'ground');
    this.ground.anchor.setTo(0.5, 1)

    this.add.sprite(260, 450, 'shadow')

    this.player = new Player({
      game: this.game,
      x: 300,
      y: 200,
      asset: 'player'
    })

    /* Random with population
    //4 Collect items
    for (let i = 0; i < 4; i++) {
      this.randomArr[i] = 0;
    }

    //10 Avoid items
    for (let i = 4; i < 14; i++) {
      this.randomArr[i] = 1;
    }

    //10 Rocks2
    for (let i = 14; i < 24; i++) {
      this.randomArr[i] = 2;
    }

    //16 Rocks1
    for (let i = 24; i < 40; i++) {
      this.randomArr[i] = 3;
    }
    */

    //1 Very rare - 5% of 20
    for (let i = 0; i < 1; i++) {
      this.cardArr[i] = 0
    }

    //2 supper rare - 10% of 20
    for (let i = 1; i < 3; i++) {
      this.cardArr[i] = 1
    }

    //4 rare - 20% of 20
    for (let i = 3; i < 7; i++) {
      this.cardArr[i] = 2
    }

    //13 normal - 65% of 20
    for (let i = 7; i < 20; i++) {
      this.cardArr[i] = 3
    }

    this.randomObj = this.game.rnd.between(0,2)
    this.items = this.game.add.group();
    this.col = new Item({
      game: this.game,
      x: this.game.width + 100,
      y: game.rnd.between(200, 300),
      type: 0,
      asset: 'icon_collect'
    })
    this.col.body.setCircle(30, 20, 25)

    this.avoid = new Item({
      game: this.game,
      x: this.game.width + 100,
      y: 350,
      type: 1,
      asset: 'icon_avoid'
    })
    this.avoid.body.setCircle(30, 20, 25)

    this.rock1 = new Item({
      game: this.game,
      x: this.game.width + 100,
      y: this.game.world.height,
      type: 2,
      asset: 'rock1'
    })

    this.rock2 = new Item({
      game: this.game,
      x: this.game.width + game.rnd.between(100, 200),
      y: this.game.world.height,
      type: 2,
      asset: 'rock2'
    })

    this.items.add(this.col)
    this.items.add(this.avoid)
    this.items.add(this.rock1)
    this.items.add(this.rock2)

    this.game.add.sprite(0, 0, 'bd')
    var bd = this.game.add.sprite(this.game.world.centerX, 15, 'bd_top')
    bd.anchor.x = 0.5

    //Visuaize cards type
    this.cardSprites = this.game.add.group()
    for (let i = 0; i < 4; i++) {
      var key = 'card'
      if (i == 0) key = 'card_vr'
      if (i == 1) key = 'card_sr'
      if (i == 2) key = 'card_r'
      if (i == 3) key = 'card_c'
      const card = this.add.sprite(190, 70, key)
      card.anchor.setTo(0.5)
      card.scale.set(0.3)
      card.visible = false
      this.cardSprites.add(card)
    }
    this.ran = this.cardArr[this.game.rnd.between(0, 19)]
    this.cardSprites.getAt(this.ran).visible = true

    this.lifeSprites = this.game.add.group()
    for (let i = 0; i < 3; i++) {
      const life = new Sprite({
        game: this.game,
        x: game.width - 182 - 30 * i,
        y: 53,
        asset: 'hp'
      })
      this.lifeSprites.add(life)
    }

    this.clanSprites = this.game.add.group()
    for (let i = 0; i < 4; i++) {
      const clan = new Sprite({
        game: this.game,
        x: 168 + 15 * i,
        y: 128,
        asset: 'clan'
      })
      clan.visible = false;
      this.clanSprites.add(clan)
    }

    this.banner = this.add.text(this.game.world.centerX, 50, this.topText(), {
      font: '24px ethnocentric',
      fill: '#0ff'
    })
    this.banner.anchor.setTo(0.5)

    this.plusText = this.add.text(240, 50, '+ 25', {
      font: '16px ethnocentric',
      fill: '#fff',
      stroke: '#0ff',
      strokeThickness: 2
    })
    this.plusText.alpha = 0

    this.add.existing(this.ground)
    this.add.existing(this.player)
    this.add.existing(this.items)
    this.add.existing(this.lifeSprites)
    this.add.existing(this.clanSprites)
    this.add.existing(this.cardSprites)

  }

  update() {
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    var now = this.game.time.now;
    this.background.tilePosition.x -= this.v / 100;
    this.ground.tilePosition.x -= this.v;
    var item = this.getCurrentItem()
    item.x -= this.v;
    if (item.x <= -100) {
      this.resetItem(item)
    }
    if (now > this.t && this.v <= 15) {
      this.t = now + 10000;
      this.v++;
    }
    if (now > this.t1) {
      this.t1 = now + 1000 / (this.v - 4)
      this.s++
    }
    this.banner.text = this.topText();
  }

  topText() {
    return this.s + ' m';
  }

  getCurrentItem() {
    switch (this.randomObj) {
      case 0:
        return this.col
      case 1:
        return this.avoid
      case 2:
        return this.rock2
      default:
        return this.rock1
    }
  }

  collect(player, item) {
    this.resetItem(item)
    if (item.type != 0 && this.game.death){
      this.life--
      this.game.add.tween(this.player).to({alpha: 0.5}, 100, "Linear", true, 0, 3, true)
      this.game.wrongAudio.play()
      if (this.life > 0) {
        this.lifeSprites.getAt(this.life).kill()
      } else {
        this.game.s = this.s
        this.game.clan = this.clan
        this.state.start('End')
      }
    } else {
      var mod = this.clan % 4
      if (mod % 4 === 3 && this.clan !== 0) {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            this.clanSprites.getAt(i).visible = false
          }, 500)
          this.cardSprites.getAt(i).visible = false
        }
        this.game.cards[this.ran].count++
        this.plusText.text = '+ ' + this.game.cards[this.ran].point
        this.game.add.tween(this.plusText).to( { alpha: 1 }, 1000, "Linear", true);
        this.game.add.tween(this.plusText).to( { alpha: 0 }, 1000, "Linear", true, 1000);
        this.ran = this.cardArr[this.game.rnd.between(0, 19)]
        this.cardSprites.getAt(this.ran).visible = true
        this.card_sound.play()
      }
      this.clanSprites.getAt(mod).visible = true;
      this.clan++
      this.collect_sound.play()
    }
  }

  resetItem(item) {
    if (item.type == 0) {
      item.y = game.rnd.between(200, 300)
    }
    item.x = this.game.width + 100
    //this.randomObj = this.randomArr[this.game.rnd.between(0,40)]
    this.randomObj = this.game.rnd.between(0,3)
  }

  render() {
    /*if (__DEV__) {
      this.game.debug.spriteInfo(this.col, 32, 32)
      this.game.debug.body(this.avoid)
    }*/
  }
}
