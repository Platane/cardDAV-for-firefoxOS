var Abstract = require('../utils/Abstract')
  , Notifier = require('../utils/Notifier')

var section = {
    globalFold : true,
    unitFold : null,
    init : function( a ){
        this.unitFold={}
        for(var i=(a||[]).length;i--;)
            this.unitFold[ a[i].remote.id ] = true
        return this;
    },
    all : function( fold ){
        for(var i in this.unitFold)
            this.unitFold = fold
    }
}
var all = {
    same : 1,
    add : 1,
    remove : 1,
    change : 1,
}
var deckHasChanged = function(){
    for(var i in all)
        this[i].init( (this.deck.merged||{})[i] )
    this.hasChanged()
}

var init = function(models){

    this.deck = models.deck

    this.deck.listen( deckHasChanged.bind(this) , this )

    for(var i in all)
        this[i] = Object.create(section)
    return this
}

var allUnit = function( fold ){
    for(var i in all)
        this[i].all(fold)
    return this
}
var allGlobal = function( fold ){
    for(var i in all)
        this[i].globalFold = fold
    return this
}

module.exports = Object.create( Abstract )
.extend( Notifier )
.extend({
    init:init,
    allGlobal:allGlobal,
    allUnit:allUnit
})
