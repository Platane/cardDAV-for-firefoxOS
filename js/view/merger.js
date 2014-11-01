var Abstract = require('../utils/Abstract')
  , updatable = require('./sync-updatable')
  , controlable = require('./controlable')

  , dom = require('../utils/domHelper')

  , propertiesControler = require('../controler/setting/properties')

var tpl = [
    '<section class="gaia-list fit scroll sticky">',
        '<article>',
            '<header>merger</header>',
            '<ul>',
            '</ul>',
        '</article>',
    '</section>',
].join('')


var on = function(){
    return this
}
var off = function(){
    return this
}


var initElement = function(){
    this.dom = dom.domify( tpl )
}
var init = function( models ){

    controlable.init.call( this )

    this.model = {
        setting : models.setting,
        deck : models.deck
    }

    initElement.call( this )

    return this
}

module.exports = Object.create( Abstract )
.extend( controlable )
.extend( updatable )
.extend({
    init : init,
    on : on,
    off : off
})
