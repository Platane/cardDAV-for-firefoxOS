var request = require('./transport').request
  , listParser = require('./cardListParser')
  , cardParser = require('./cardParser')
  , cardModel = require('../model/card')



var map = function( fn ){
    return function( array ){
        return array.map( fn )
    }
}

var fetchAll = (function(){

    var hydrateAll = function( cards , options ){

        var p=[]

        for(var i=cards.length;i--;)
            p.push( fetchOne( cards[i] , options ) )

        return Promise.all( p )
    }

    return function( options ){

        return request(
            options.url ,
            {
                login:options.login,
                password:options.password,
            }
        )

        .then( listParser.parse )

        .then( hydrateAll )
    }
})()

var fetchOne = function( card , options ){

    options = options || {}

    if( typeof card !== 'object' )
        card = { id : card }

    var url = options.url + '/card?'+card.id

    return request(
        url ,
        {
            login:options.login,
            password:options.password,
        }
    )

    .then( cardParser.parse )

    .then(function(o){
        return cardModel.copy.call( card , o )
    })
}

module.exports = {
    fetchAll : fetchAll
}
