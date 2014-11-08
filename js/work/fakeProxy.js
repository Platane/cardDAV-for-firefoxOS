var samples = require('../../test/samples')

var indice_=0
var getAll = function(){

    var set=this.set

    return new Promise(function(resolve,reject){
        window.setTimeout(function(){
            resolve(set)
        },Math.random()*252)
    })
}

var save = function( object ){

}

var proxy = {
    fetchAll : getAll,
}

module.exports = function( type , i ) {
    var p = Object.create( proxy )
    if( typeof i == 'string')
        for( var k in samples )
            if( samples[k].label == i ){
                p.set = samples[ k ][ type ]
                return p
            }
    i=(0|i)%samples.length
    p.set = samples[ i ][ type ]
    return p
}
