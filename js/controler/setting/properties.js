var Abstract = require('../../utils/Abstract')
  , dom = require('../../utils/domHelper')

var init = function( models , dom ){
    this._domInputs = dom.querySelectorAll( '[data-property]' )
    this.model = {
        setting : models.setting
    }
    return this
}


var propertyChanged = function( e ){
    var property = e.currentTarget.getAttribute('data-property'),
        value = e.currentTarget.value

    if( this.model.setting[ property ] == value )
        return

    this.model.setting[ property ] = value

    this.model.setting.hasChanged()
}

var enable = function(){

    var cb = propertyChanged.bind(this)

    for(var i=this._domInputs.length;i--;)
        dom.bind( this._domInputs[i] , 'change' , cb )

    return this
}

var disable = function(){

    for(var i=this._domInputs.length;i--;)
        dom.unbind( this._domInputs[i] , 'change' )

    return this
}

module.exports = Object.create( Abstract )
    .extend({
        init:init,
        enable:enable,
        disable:disable
    })
