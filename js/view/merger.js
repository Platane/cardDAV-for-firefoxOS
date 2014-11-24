var Abstract = require('../utils/Abstract')
  , updatable = require('./sync-updatable')
  , controlable = require('./controlable')

  , foldControler = require('../controler/merger/fold')

  , dom = require('../utils/domHelper')

  , entryFactory = require('./factory.js')( require('./entry.js') )

  , propertiesControler = require('../controler/setting/properties')


var section = function( type ){
    return [
        '<li data-type="'+type+'" class="merger-class merger-class-'+type+'">',
            '<span class="merger-label">'+type+'</span>',
            '<span class="merger-label-cardinality"></span>',
            '<ul></ul>',
        '</li>',
    ].join('')
}

var tpl = [
    '<section class="merger">',
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

        // update the cardinality
        domSection.querySelector('.merger-label-cardinality').innerText = (newE[i]||[]).length

        this.entries[i]=[]

        for(var k=(newE[i]||[]).length;k--;){
            var e = entryFactory.create().init({ entry: newE[i][k] }).enable().on()
            domList.appendChild( e.dom )

            this.entries[i].push( e )
        }
    }
}

var updateFold = function(){
    for( var i in this.entries ) {
        setFold.call( this , i , this.model.mergerState[i].globalFold )
        if( !this.model.mergerState[i].globalFold )
            for(var k=this.entries[i].length;k--;)
                this.entries[i][k].setFold( this.model.mergerState[i].unitFold[ this.entries[i][k].model.entry.id ] )
    }
}

var setFold = function(type , fold){
    var domList = this.dom.querySelector('[data-type="'+type+'"] ul')
    domList.style.display = fold ? 'none' : 'block'
}

var initElement = function(){
    this.dom = dom.domify( tpl )
}
var init = function( models ){

    controlable.init.call( this )

    this.model = {
        setting : models.setting,
        deck : models.deck,
        mergerState : models.mergerState,
    }

    initElement.call( this )

    this.controler.fold = Object.create( foldControler ).init( models , this.dom )

    return this
}
var on = function(){
    this.planUpdate( this.model.deck , updateEntries.bind(this) , 'deck' )
    this.planUpdate( this.model.mergerState , updateFold.bind(this) , 'state' )
    return this
}
var off = function(){
    this.unplanUpdate()
    return this
}

module.exports = Object.create( Abstract )
.extend( controlable )
.extend( updatable )
.extend({
    init : init,
    on : on,
    off : off,
})
