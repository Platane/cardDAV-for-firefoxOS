
var create = function() {
    var o
    if(o=this.stack.pop())
        return o
    return Object.create( this.object )
}

var factory = {
    create : create,
    object : {}
}

module.exports = function( object ){

    var f = Object.create( factory )

    f.object = object
    f.stack = []

    object.remove = function( ){
        f.stack.push( this )
        return this
    }

    return f
}
