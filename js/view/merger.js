var Abstract = require('../utils/Abstract')
  , updatable = require('./sync-updatable')
  , controlable = require('./controlable')

  , dom = require('../utils/domHelper')

  , entryFactory = require('./factory.js')( require('./entry.js') )

  , propertiesControler = require('../controler/setting/properties')


var section = function( type ){
    return [
        '<li data-type="'+type+'" class="merger-class">',
            '<span class="merger-label">'+type+'</span>',
            '<ul></ul>',
        '</li>',
    ].join('')
}

var tpl = [
    '<section class="">',
        '<article>',
            '<header>merger</header>',
            '<ul>',
                section('change'),
                section('add'),
                section('remove'),
                section('same'),
            '</ul>',
        '</article>',
    '</section>',
].join('')


var cleanupEntries = function(){

    var oldE = this.entries = this.entries || {}

    for( var i in oldE )
        for(var k=(oldE[i]||[]).length;k--;)
            oldE[i][k].finish().remove()

    this.entries = {}
}

var updateEntries = function(){

    cleanupEntries.call(this)

    var newE = this.model.deck.merged || {}

    for( var i in newE ){

        var domSection = this.dom.querySelector('[data-type="'+i+'"]')

        var domList = domSection.querySelector('ul')

        this.entries[i]=[]

        for(var k=(newE[i]||[]).length;k--;){
            var e = entryFactory.create().init({ entry: newE[i][k] })
            domList.appendChild( e.dom )

            this.entries[i].push( e )
        }
    }
}

var updateFold = function(){
    this.dom
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
var on = function(){
    this.planUpdate( this.model.deck , updateEntries.bind(this) , this )
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
    on : on,
    off : off
})
