var Abstract = require('../utils/Abstract')
  , controlable = require('./controlable')
  , updatable = require('./sync-updatable')

  , dom = require('../utils/domHelper')


var section = function( what ) {
    return [
        '<span data-what="'+what+'" class="entry-section-'+what+'">',

        '</span>',
    ].join('')
}

var tpl = [
    '<li>',
        section( 'local' ),
        section( 'truck' ),
        section( 'remote' ),
    '</li>',
].join('')


var update = function(){
    var e = this.model.entry
    //var el = this.dom.querySelector('[data-what="name"]')
}

var initElement = function(){
    this.dom = dom.domify( tpl )
}
var init = function( models ){

    controlable.init.call( this )

    this.model = {
        entry : models.entry
    }

    initElement.call( this )
    update.call( this )

    //this.controler.nav = Object.create( navControler ).init( models , this.dom )

    return this
}

module.exports = Object.create( Abstract )
.extend( controlable )
.extend({
    init : init
})
