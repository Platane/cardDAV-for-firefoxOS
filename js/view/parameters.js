var AbstractView = require('./Abstract')
  , dom = require('../utils/domHelper')


var tpl = [
/*
    '<section role="region">',
      '<header>',
        '<menu type="toolbar">',
          '<a href="#"><span class="icon icon-edit">edit</span></a>',
          '<a href="#"><span class="icon icon-add">add</span></a>',
        '</menu>',
        '<h1>Messages</h1>',
      '</header>',
    '</section>',*/

'<section class="gaia-list fit scroll sticky">',
    '<article>',
        '<header>CardDAV server</header>',
        '<ul>',

            '<li>',
                '<div>',
                    '<p><em>server URL</em></p>',
                    '<input data-property="url" size="100" type="text" placeholder="url" required="">',
                '</div>',
            '</li>',

            '<li>',
                '<div>',
                    '<p><em>Authentification</em></p>',
                    '<input data-property="login" size="100" type="text" placeholder="login" >',
                    '<input data-property="password" size="100" type="password" placeholder="password" >',
                '</div>',
            '</li>',
            /*
            '<li>',
                '<p>',
                    '<label class="pack-checkbox">',
                        '<input type="checkbox">',
                        '<span></span>',
                    '</label>',
                    '<em>show advanced</em>',
                '</p>',
            '</li>',
            */
        '</ul>',
    '</article>',
'</section>',
].join('')


var initElement = function(){

    this.dom = dom.domify( tpl )

    this._domInputs = this.dom.querySelectorAll( '[data-property]' )
}

var propertyChanged = function( e ){
    var property = e.currentTarget.getAttribute('data-property'),
        value = e.currentTarget.value

    if( this.model.parameters[ property ] == value )
        return

    this.model.parameters[ property ] = value

    this.model.parameters.hasChanged()
}

var updateProperties = function(){

    for(var i=this._domInputs.length;i--;)
        this._domInputs[i].value = this.model.parameters[ this._domInputs[i].getAttribute('data-property') ]

}

var on = function(){

    var cb = propertyChanged.bind(this)

    for(var i=this._domInputs.length;i--;)
        dom.bind( this._domInputs[i] , 'change' , cb )

    this.planUpdate( this.model.parameters , updateProperties.bind(this) , this  )

    return this
}
var off = function(){
    for(var i=this._domInputs.length;i--;)
        dom.unbind( this._domInputs[i] , 'change' )

    this.unplanUpdate( this  )

    return this
}



var init = function( model ){

    AbstractView.init.call( this )

    this.model = {
        parameters : model.parameters
    }

    initElement.call( this )

    updateProperties.call(this)

    return this
}

module.exports = Object.create( AbstractView )
.extend({
    init : init,
    on : on,
    off : off
})
