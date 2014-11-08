var cardModel = require('../model/card')

var mozContacts = window && window.navigator && window.navigator.mozContacts ? window.navigator.mozContacts : {}

var getAll = (function(){

    var parse = function( o ){
        var card = Object.create( cardModel )

        //o.name = 
    }

    return function(){

        if( !mozContacts.find )
            return []

        return new Promise(function(resolve,rejected){

            var success = function( ){
                return resolve( this.result )
            }

            var error  = function( ){
                rejected( new Error('enable to find contacts') );
            }

            var request = mozContacts.find({})

            request.addEventListener('success',success,false)
            request.addEventListener('error',error,false)
        })
    }
})()

var save = function( object ){

}

module.exports = {
   getAll : getAll
}
