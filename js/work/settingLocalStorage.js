var Abstract = require('../utils/Abstract')

var init = function( models ){

    this.model = {
        setting : models.setting
    }

    return this
}

var on = function(){
    this.model.setting.listen( save.bind(this) , this )
    return this
}
var off = function(){
    this.model.setting.unlisten( this )
    return this
}

var localStorage = typeof window == 'object' && window.localStorage

var attr = {url:1,login:1,password:1}
var save = function(){
    if( !localStorage )
        return this

    var o=Object.create(attr)

    for(var i in o )
        o[i] = this.model.setting[i]

    localStorage.setItem( 'setting' , JSON.stringify(o) )

    return this
}

var hydrate = function(){

    var o

    if( !localStorage || !(o = localStorage.getItem( 'setting' ) ) )
        return this

    o = JSON.parse( o )

    for(var i in attr )
        this.model.setting[ i ] = o[i] || ''

    this.model.setting.hasChanged()

    return this
}

module.exports = Object.create( Abstract ).extend({
    init : init,
    save : save,
    hydrate : hydrate,

    on:on,
    off:off
})
