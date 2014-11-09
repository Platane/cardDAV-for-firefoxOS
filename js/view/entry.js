var Abstract = require('../utils/Abstract')
  , controlable = require('./controlable')
  , updatable = require('./sync-updatable')

  , dom = require('../utils/domHelper')


var tpl = [
    '<li class="entry">',

        '<span data-what="local" class="entry-section entry-section-local">',
            '<span class="entry-face-wrapper">',
                '<svg viewBox="0 0 90 154"><use xlink:href="#svg-phone"></use></svg>',
                '<span data-what="face" class="entry-face"></span>',
            '</span>',
        '</span>',

        '<span data-what="right-action" class="entry-action entry-right-action">\></span>',

        '<span data-what="trunk" class="entry-section entry-section-trunk">',
            '<span data-what="face" class="entry-face"></span>',
            '<span data-what="name" class="entry-name"></span>',
        '</span>',

        '<span data-what="left-action" class="entry-action entry-left-action">&times;</span>',

        '<span data-what="remote" class="entry-section entry-section-remote">',
            '<span class="entry-face-wrapper">',
                '<svg viewBox="0 0 100 100"><use xlink:href="#svg-cloud"></use></svg>',
                '<span data-what="face" class="entry-face"></span>',
                '</span>',
        '</span>',
    '</li>',
].join('')


var updateSection = function( dom , e ){

    dom.querySelector('[data-what="face"]')
    .style.backgroundImage = e.photo ? 'url('+ e.photo +')' : ''

    var domName = dom.querySelector('[data-what="name"]')
    domName && ( domName.innerHTML = e.name ? e.name.first+' '+e.name.last : '' )
}
var update = function(){
    for( var i in {local:1, remote:1, trunk:1})
        updateSection(
            this.dom.querySelector('[data-what="'+i+'"]'),
            this.model.entry[ i ] || {}
        )
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
