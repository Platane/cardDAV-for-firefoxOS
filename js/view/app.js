var Abstract = require('../utils/Abstract')
  , updatable = require('./sync-updatable')

  , dom = require('../utils/domHelper')

  , settingView = require('../view/setting')
  , mergerView = require('../view/merger')
  , headerView = require('../view/header')

var tpl = [
    '<section role="region"></region>',
].join('')

var cleanUpState = function(){
    if( this.view[ this.activeView ] ){

        this.view[ this.activeView ].off().disable()

        this._domMain.removeChild( this.view[ this.activeView ].dom )
    }
}

var updateState = function(){

    var nextView;
    switch( this.model.app.state ){
        case 'setting' :
        case 'merger' :
            nextView = this.model.app.state
            break
    }

    if( this.activeView == nextView )
        return

    //clean up the previous state
    cleanUpState.call(this)

    this.activeView = nextView

    //clean up the previous state
    if( this.view[ this.activeView ] ){

        this.view[ this.activeView ].on().enable()

        this._domMain.appendChild( this.view[ this.activeView ].dom )
    }
}

var initElement = function(){
    var d = dom.domify( tpl )

    document.body.appendChild( d )

    this._domMain = d
}

var init = function( models ){
    this.model = {
        app : models.app
    }

    this.view = {
        setting : Object.create( settingView ).init( models ),
        merger : Object.create( mergerView ).init( models ),
    }

    initElement.call(this)

    this._domMain.appendChild( ( this.header = Object.create( headerView ).init( models ).enable() ).dom )

    return this
}
var on = function(){

    updateState.call( this )

    this.header.on()

    this.planUpdate( this.model.app , updateState.bind(this) , this )
    return this
}
var off = function(){

    cleanUpState.call( this )

    this.header.off()

    this.unplanUpdate( this )
    return this
}

module.exports = Object.create( Abstract )
.extend( updatable )
.extend({
    init : init,
    on:on,
    off:off
})
