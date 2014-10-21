var computeLikehood = function( A , B ){
    return Infinity
}

var sort = function( listA , listB , options ){

    options = options || {}

    var Container = options.Container || Array

    // nop
    if( options.weak === 0 ){
        var tmp = listA
        listA = listB
        listB = tmp
    }

    // A is the ref, 
    var same                = new Container,
        sameIdConflict      = new Container,
        asChanged           = new Container,
        asChangedIdConflict = new Container,
        added               = new Container,
        removed             = new Container



    var pearedB = []

    for( var i=listA.length;i--;){

        var likehood,
            idMatch = false,
            A = listA[i],
            B


        for( var j=listB.length;j--;){

            // the id match
            idMatch = A.id && (B=listB[j]).id == A.id 

            // compute the likehood score
            likehood = computeLikehood( A , B )

            if( idMatch || likehood <= Infinity )
                break
        }


        if( j>=0 ){

            var couple = [A,B]

            switch( idMatch + ( (likehood == 0)  << 1 ) ){
                case 3 :
                    same.push( couple )
                    break

                case 2 :
                    sameIdConflict.push( couple )
                    break

                case 1 :
                    asChanged.push( couple )
                    break

                case 0 :
                    asChangedIdConflict.push( couple )
                    break
            }

            pearedB[ j ]=true

        }else
            added.push( A )
    }

    for( var j=listB.length;j--;)
        if( !pearedB[j] )
            removed.push( listB[j] )

    return{
        same                 : same,
        sameIdConflict       : sameIdConflict,
        asChanged            : asChanged,
        asChangedIdConflict  : asChangedIdConflict,
        added                : added,
        removed              : removed,
    }
}

module.exports = { 
    sort : sort
}
