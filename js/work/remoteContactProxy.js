var request = require('./transport').request
  , listParser = require('./cardListParser')
  , cardParser = require('./cardParser')
  , cardModel = require('../model/card')




var fetchAll = (function(){


    return function( options ){

        return request(
            options.url ,
            {
                login:options.login,
                password:options.password,
            }
        )

        .then( listParser.parse )

        .then( function( cards ){

            var p=[]

            for(var i=cards.length;i--;)
                p.push( fetchOne( cards[i] , options ) )

            return Promise.all( p )
        })
    }
})()

var fetchOne = function( card , options ){

    options = options || {}

    if( typeof card !== 'object' )
        card = { id : card }

    var url = options.url + '/'+card.id+'.vcf'

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
