var Abstract = require('../../utils/Abstract')
  , dom = require('../../utils/domHelper')

var init = function( models , dom ){
    this.dom = dom
    this.model = {
        app : models.app
    }
    return this
}

var requestChangeState = function( e ){
    this.model.app.state = e.currentTarget.getAttribute('data-action')
    this.model.app.hasChanged()
}

var enable = function(){

    dom.bind(
        this.dom.querySelector('[data-action=setting]'),
        'click',
        requestChangeState.bind(this)
    )

    return this
}

var disable = function(){
    dom.unbind( this.dom.querySelector('[data-action=setting]') , 'click')

    return this
}

module.exports = Object.create( Abstract )
    .extend({
        init:init,
        enable:enable,
        disable:disable
    })
