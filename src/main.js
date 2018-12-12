import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import StartState from './states/Start'
import GameState from './states/Game'
import EndState from './states/End'
import RegState from './states/Register'
import ShareState from './states/Share'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const width = config.gameWidth
    const height = config.gameHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.antialias = false

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Game', GameState, false)
    this.state.add('End', EndState, false)
    this.state.add('Register', RegState, false)
    this.state.add('Share', ShareState, false)

    this.s = 0
    this.clan = 0
    this.score = 0
    this.cards = {
      0: {name: 'very rare', point: 75, count: 0},
      1: {name: 'super rare', point: 50, count: 0},
      2: {name: 'rare', point: 30, count: 0},
      3: {name: 'common', point: 15, count: 0}
    }
    this.btn_style = {font: '24px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1}
    this.btn_style_s = {font: '16px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1, align: "center"},
    this.btn_style_ss = {font: '8px ethnocentric', fill: '#fff', stroke: '#0ff', strokeThickness: 1, align: "center"},

    this.speed = 5
    this.gravity = 3000
    this.death = true
    this.shortJump = 800
    this.heighJump = 1200

    this.name = localStorage.getItem('name')
    this.email = localStorage.getItem('email')
    this.key = localStorage.getItem('key')
    this.agree = true

    var d = document
    d.getElementById("death").onchange = e => {this.death = e.target.checked}
    d.getElementById("gravity").onchange = e => {
      this.gravity = e.target.value
    }
    d.getElementById("speed").onchange = e => {
      this.speed = e.target.value
    }
    d.getElementById("sJump").onchange = e => {this.shortJump = e.target.value}
    d.getElementById("hJump").onchange = e => {this.heighJump = e.target.value}

    this.nameE = d.getElementById('name')
		this.emailE = d.getElementById('email')
		this.agreeE = d.getElementById('agree')
    this.esignE = d.getElementById('esign')
    this.form = d.getElementById('form')

    this.nameE.value = this.name
    this.emailE.value = this.email
    
    this.nameE.onkeyup = e => {
      var value = e.target.value
      this.name = value
    }

    this.emailE.onkeyup = e => {
      var value = e.target.value
      this.email = value
    }
    this.agreeE.onchange = () => {
      this.agree = this.agreeE.checked
    }
    this.esignE.onchange = () => {this.esign = this.esignE.checked}

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}

window.game = new Game()
//scale.setMinMax(480, 240, 1020, 510);

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
