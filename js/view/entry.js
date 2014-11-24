var Abstract = require('../utils/Abstract')
  , controlable = require('./controlable')
  , updatable = require('./sync-updatable')

  , dom = require('../utils/domHelper')
  , swapSourceControler = require('../controler/entry/swapSource')


var tpl = [
    '<li class="entry">',

        '<span data-what="local" class="entry-section entry-section-local">',
            '<span class="entry-face-wrapper">',
                '<svg viewBox="0 0 90 156"><use y="1" xlink:href="#svg-phone"></use></svg>',
                '<span data-what="face" class="entry-face"></span>',
            '</span>',
        '</span>',

        '<span data-what="right-action" class="entry-action entry-local-action"></span>',

        '<span data-what="trunk" class="entry-section entry-section-trunk">',
            '<span data-what="face" class="entry-face"></span>',
            '<span data-what="name" class="entry-name"></span>',
        '</span>',

        '<span data-what="left-action" class="entry-action entry-remote-action"></span>',

        '<span data-what="remote" class="entry-section entry-section-remote">',
            '<span class="entry-face-wrapper">',
                '<svg viewBox="0 0 100 100"><use xlink:href="#svg-cloud"></use></svg>',
                '<span data-what="face" class="entry-face"></span>',
                '</span>',
        '</span>',

        '<div class="entry-detail" style="display:none;">',
            '<ul class="entry-detail-phones"></ul>',
        '</div>',
    '</li>',
].join('')


var updateTrunk = function( dom , e ){
    dom.querySelector('[data-what="face"]')
    .style.backgroundImage = e.photo ? 'url('+ e.photo +')' : ''

    var domName = dom.querySelector('[data-what="name"]')
    domName && ( domName.innerHTML = e.name ? e.name.first+' '+e.name.last : '' )
}
var updateSection = function( dom , e ){
    dom.querySelector('[data-what="face"]')
    .style.backgroundImage = e.photo ? 'url('+ e.photo +')' : ''

    var domName = dom.querySelector('[data-what="name"]')
    domName && ( domName.innerHTML = e.name ? e.name.first+' '+e.name.last : '' )
}
var updatePhoneList = function(){
    var list = this.dom.querySelector('.entry-detail-phones')
    list.innerHTML=''
    var trunk = this.model.entry.trunk||{}
    for( var i in trunk.tel||{} )
        list.innerHTML+=[
            '<li>',
                '<span class="phone-label phone-label-'+i+'">'+i+'</span>',
                '<span class="phone-number">'+trunk.tel[i]+'</span>',
            '</li>',
        ].join('')
}
var update = function(){
    for( var i in {local:1, remote:1, trunk:1})
        updateSection(
            this.dom.querySelector('[data-what="'+i+'"]'),
            this.model.entry[ i ] || {}
        )
    updatePhoneList.call(this)

    this.dom.className = 'entry entry-take-'+this.model.entry.take;
}
var setFold = function(folded){
    //var folded = this.model.state.folded
    if( this.folded == folded )
        return
    var container = this.dom.querySelector('.entry-detail')
    if( folded )
        container.style.height = '0'
    else {
        container.style.display = ''
        container.style.height = ''
        var h = container.offsetHeight //force reflow
        container.style.height = '0'
        container.offsetHeight //force reflow
        container.style.height = h+'px'
    }
    this.folded = folded
}

var initElement = function(){
    this.dom = dom.domify( tpl )
    this.dom.setAttribute('data-id', this.model.entry.id )
}
var init = function( models ){

    controlable.init.call( this )

    this.model = {
        entry : models.entry
    }

    initElement.call( this )
    update.call( this )

    this.controler.nav = Object.create( swapSourceControler ).init( models , this.dom )

    return this
}
var finish = function(){

    this.disable().off()

    return this;
}

var on = function(){
    this.planUpdate( this.model.entry , update.bind(this) , this )
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
    setFold : setFold,
    folded : true,
    finish : finish,
    on:on,
    off:off,
})
