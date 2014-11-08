var parse = (function(){

    var wraper = document.createElement('div')

    // shear some html tags
    var shear = function( htmlString , skip ){

        skip = skip || [
            "script",
            "title",
            "style",
            "meta",
            "link",
            "img"
        ]

        var start=0,
            end= 0

        for( var i = 0 ; i < skip.length ; i ++ ){

            start=0

            while( ( start = htmlString.indexOf( "<"+skip[ i ] , start ) ) != -1 ){

                var nextClosed = htmlString.indexOf( ">" , start)

                var nextAutoClosed = htmlString.indexOf( "/>" , start)

                if( nextAutoClosed > 0 && nextClosed == nextAutoClosed+1 ){
                    // tag < ... />
                    end = nextClosed+1;
                } else {
                    end = htmlString.indexOf( "</"+skip[ i ]+">" , start );
                    if( end == -1 )
                        // can't fin the closing tag /!\
                        end = nextClosed+1;
                    else
                        end += ("</"+skip[ i ]+">").length
                }

                htmlString = htmlString.substring( 0 , start ) + htmlString.substring( end , htmlString.length );
            }
        }

        return htmlString
    }

    var parseDate = function(string){
        return string
    }

    return function( string ){

        wraper.innerHTML = shear( string )

        var trs = wraper.querySelectorAll('tr'),
            o = []

        for(var i=trs.length;i--;){

            var tds = trs[i].querySelectorAll('td')

            if( tds.length != 5 )
                continue

            var a = tds[1].querySelector('a')

            var uid
            if( !a || a.innerHTML == '..' )
                continue

            o.push({
                id : a.innerHTML.substr(0,-4),
                lastModified : parseDate( tds[4].innerHTML )
            })
        }

        wraper.innerHTML = ""

        return o
    }

})()



module.exports = {
    parse : parse
}
