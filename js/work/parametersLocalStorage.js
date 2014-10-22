var Abstract = require('../utils/Abstract')

var init = function( models ){

    this.model = {
        parameters : models.parameters
    }

    return this
}

var on = function(){
    this.model.parameters.listen( save.bind(this) , this )
    return this
}
var off = function(){
    this.model.parameters.unlisten( this )
    return this
}

var localStorage = typeof window == 'object' && window.localStorage

var attr = {url:1,login:1,password:1}
var save = function(){
    if( !localStorage )
        return this

    var o=Object.create(attr)

    for(var i in o )
        o[i] = this.model.parameters[i]

    localStorage.setItem( 'parameters' , JSON.stringify(o) )

    return this
}

var hydrate = function(){

    var o

    if( !localStorage || !(o = localStorage.getItem( 'parameters' ) ) )
        return this

    o = JSON.parse( o )

    for(var i in attr )
        this.model.parameters[ i ] = o[i]

    this.model.parameters.hasChanged()

    return this
}

module.exports = Object.create( Abstract ).extend({
    init : init,
    save : save,
    hydrate : hydrate,

    on:on,
    off:off
})
