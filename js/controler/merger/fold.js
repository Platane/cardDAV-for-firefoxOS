var Abstract = require('../../utils/Abstract')
  , dom = require('../../utils/domHelper')

var init = function( models , dom ){
    this.dom = dom
    this.model = {
        mergerState : models.mergerState
    }
    return this
}


var onClick = function( e ){
    var parent;
    if( dom.hasClass(e.target, 'merger-label')){
        var type = dom.getParent(e.target, 'merger-class').getAttribute('data-type')
        this.model.mergerState[ type ].globalFold = !this.model.mergerState[ type ].globalFold
        this.model.mergerState.hasChanged()
    } else if( parent = dom.getParent(e.target, 'entry' )){
        var id = parent.getAttribute('data-id')
        var type = dom.getParent(parent, 'merger-class').getAttribute('data-type')
        this.model.mergerState[ type ].unitFold[ id ] = !this.model.mergerState[ type ].unitFold[ id ]
        this.model.mergerState.hasChanged()
    }
}

var enable = function(){
    dom.bind( this.dom , 'click' , onClick.bind(this) )
    return this
}

var disable = function(){
    dom.unbind( this.dom , 'click' )
    return this
}

module.exports = Object.create( Abstract )
    .extend({
        init:init,
        enable:enable,
        disable:disable
    })
