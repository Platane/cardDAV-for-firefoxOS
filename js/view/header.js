var Abstract = require('../utils/Abstract')
  , controlable = require('./controlable')
  , updatable = require('./sync-updatable')

  , dom = require('../utils/domHelper')

  , navControler = require('../controler/header/nav')


var tpl = [

    '<header>',
        '<menu type="toolbar">',
            '<a href="#" data-action="fetch" ><span class="icon icon-down">fetch</span></a>',
            '<a href="#" data-action="setting" ><span class="icon icon-options">settings</span></a>',
        '</menu>',
        '<h1>app</h1>',
    '</header>',

].join('')


var initElement = function(){
    this.dom = dom.domify( tpl )
}

var updateState = function(){

    var exState = this._state || '',
        newState = this.model.app.state


    this._state = newState

    if( newState == exState )
        return

    //clean up the previous state
    switch( exState ){
        case 'setting' :
            dom.removeClass( this.dom.querySelector('[data-action=fetch]') , 'visible' )
            break
    }

    //clean up the previous state
    switch( newState ){
        case 'setting' :
            dom.addClass( this.dom.querySelector('[data-action=fetch]') , 'visible' )
            break
    }

}

var init = function( models ){

    controlable.init.call( this )


    this.model = {
        app : models.app
    }


    initElement.call( this )
    updateState.call( this )

    this.controler.nav = Object.create( navControler ).init( models , this.dom )

    return this
}
var on = function(){
    this.planUpdate( this.model.app , updateState.bind(this) , this )
    return this
}
var off = function(){
    this.unplanUpdate( this )
    return this
}

module.exports = Object.create( Abstract )
.extend( controlable )
.extend( updatable )
.extend({
    init : init,
    on:on,
    off:off
})
