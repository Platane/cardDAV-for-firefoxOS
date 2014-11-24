var Abstract = require('../../utils/Abstract')
  , dom = require('../../utils/domHelper')

var init = function( models , dom ){
    this.dom = dom
    this.model = {
        entry : models.entry
    }
    return this
}

var startSwipe = function( e ){
    this.anchor = this.last = e.pageX;
    this.swipeDistance = 0;
    dom.bind( this.dom , 'mousemove' , swipe.bind(this) )
    dom.bind( this.dom , 'mouseup' , stopSwipe.bind(this) )
}

var swipe = function( e ){
    this.swipeDistance = Math.max( this.swipeDistance , Math.abs(this.anchor - e.pageX))

    if(this.swipeDistance>100) {
        var value = e.pageX - this.last < 0 ? 'remote' : 'local'

        var previousValue = this.model.entry.take

        if(value!=previousValue){
            this.model.entry.take = value;
            this.model.entry.buildTrunk();
        }
    }

    this.last = e.pageX
}

var stopSwipe = function( e ){
    dom.unbind( this.dom , 'mousemove' )
    dom.unbind( this.dom , 'mouseup' )

    if(this.swipeDistance>100){
        e.preventDefault();
        e.stopPropagation();
    }
}

var enable = function(){
    dom.bind( this.dom , 'mousedown' , startSwipe.bind(this) )
    return this
}

var disable = function(){
    dom.unbind( this.dom , 'mousedown' )
    return this
}

module.exports = Object.create( Abstract )
    .extend({
        init:init,
        enable:enable,
        disable:disable
    })
