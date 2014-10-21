var parse = (function(){

    var parseLine = function( line ){

        var l  = line.split( ':' ),
            ll = l[0].split( ';' )

        var p = {}
        for(var i=1;i<ll.length;i++){
            var lll= ll[i].split('=')
            p[ lll[0].toLowerCase() ] = lll[1]
        }

        return {
            key : ll[0].toLowerCase(),
            value : l[1],
            properties : p
        }
    }

    var parsePhoneNumber = function( number ){
        return number
    }

    var parseRev = function( number ){
        return number
    }

    var parseCategories = function( string ){
        var t = string.split(',')
        if(!t[0].length)
            t.shift()
        return t
    }

    var parseName = function( string ){
        var l = string.split(';')
        return{
            firstName : l[0],
            surName : l[1]
        }
    }

    var parseFullName = function( string ){
        var l = string.split(' ')
        return{
            firstName : l.slice( -1 ).join(' '),
            surName : l.slice( 0,-1 ).join(' ')
        }
    }


    return function( string , card ){

        card = card ||  Object.create( cardDAV )

        string.split('\n')

        .forEach(function(line){

            var l = parseLine( line )

            switch( l.key ){
                case 'tel' :
                    (card.tel = card.tel || {})[ l.properties.type || 'CELL' ] = parsePhoneNumber( l.value )
                    break
                case 'rev' :
                    card.rev = parseRev( l.value )
                    break
                case 'photo' :
                    card.photo = {
                        base64 : l.value,
                        encoding : l.properties.encoding,
                        type : l.properties.type
                    }
                    break
                case 'n' :
                    card.name = parseName( l.value )
                    break
                case 'fn' :
                    if( !card.name )
                        card.name = parseFullName( l.value )
                    break
                case 'uid' :
                    card.id = l.value
                    break
                case 'email' :
                    card.email = l.value
                    break
                case 'categories' :
                    card.uid = parseCategories( l.value )
                    break
            }
        })

        return card
    }

})()

var stringify = function( cardDav ){

}


module.exports = {
    parse : parse,
    stringify : stringify,
}


// http://tools.ietf.org/html/rfc6352

