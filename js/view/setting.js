var Abstract = require('../utils/Abstract')
  , updatable = require('./sync-updatable')
  , controlable = require('./controlable')

  , dom = require('../utils/domHelper')

  , propertiesControler = require('../controler/setting/properties')

var tpl = [
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

var updateProperties = function(){

    for(var i=this._domInputs.length;i--;)
        this._domInputs[i].value = this.model.setting[ this._domInputs[i].getAttribute('data-property') ]

}

var on = function(){

    this.planUpdate( this.model.setting , updateProperties.bind(this) , this  )

    updateProperties.call(this)

    return this
}
var off = function(){

    this.unplanUpdate( this  )

    return this
}



var init = function( models ){

    controlable.init.call( this )

    this.model = {
        setting : models.setting
    }

    initElement.call( this )

    this.controler.properties = Object.create( propertiesControler ).init( models , this.dom )

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
