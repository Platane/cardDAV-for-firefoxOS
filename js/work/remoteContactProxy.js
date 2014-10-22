var request = require('.transport').request
  , listParser = require('./cardDADListParser')

var fetchAll = function( options ){

    request(
        options.url ,
        {
            login:options.login,
            password:options.password,
        }
    )

    .then( listParser.parse )

    .then(null,function(err){
        console.log("fail")
    })
}

module.exports = {
    fetchAll : fetchAll
}
