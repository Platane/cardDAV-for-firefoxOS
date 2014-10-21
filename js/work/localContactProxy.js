
var mozContacts = window && window.navigator && window.navigator.mozContacts ? window.navigator.mozContacts : {}

var getAll = function(){

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

var save = function( object ){
    
}

module.exports = {
   getAll : getAll
}
