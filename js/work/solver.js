var entry = require('../model/entry')

// if very likely close to 0
// same is zero
var computeLikehood = (function(){

    var formatNumber = function(a){
        return a.replace( /([^\d])/g, '' )
    }

    var numberLikeHood = function( a , b ){
        if( a == b )
            return 0
        if( formatNumber( a ) == formatNumber( b ) )
            return 1
        return Infinity
    }

    var stringLikeHood = function( a , b ){
        if( a==b )
            return 0

        a = a.toLowerCase()
        b = b.toLowerCase()

        if( a==b )
            return 0.5

        return Infinity
    }

    var nameLikeHood = function( a , b ){
        return Math.max(
            stringLikeHood( a.first , b.first ) ,
            stringLikeHood( a.last , b.last )
        )
    }

    return function( a , b ){

        var exactSame=true, score=Infinity

        // name
        var n = nameLikeHood( a.name , b.name );
        exactSame = exactSame && !n
        score = Math.min( score , n )


        // tel


        // photo
        exactSame = exactSame && (a.photo == b.photo)

        return score + (+!exactSame)*0.1
    }
})()

var computeGlobalLikehood = function( a , b ){
    var diff = computeLikehood( a , b )

    return diff
}


var sort = function( listA , listB , options ){

    options = options || {}

    var Container = options.Container || Array

    // A is the ref,
    // some X as been added to B to make A
    var same                = new Container(),
        sameIdConflict      = new Container(),
        asChanged           = new Container(),
        asChangedIdConflict = new Container(),
        added               = new Container(),
        removed             = new Container()



    var pearedB = []

    for( var i=listA.length;i--;){

        var likehood,
            idMatch = false,
            A = listA[i],
            B

        for( var j=listB.length;j--;){

            B=listB[j]

            // the id match
            idMatch = A.id && B.id == A.id

            // compute the likehood score
            likehood = computeLikehood( A , B )

            // if the id match, or if they are pretty much the same ( likehood close to 0 )
            if( idMatch || likehood <= 3 )
                break
        }

        // a peer as been found
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

var merge = function( sorted , strategy , options ){

    options = options || {}

    var Container = options.Container || Array

    var remote = 0,
        local = 1

    var change       = new Container(),
        add          = new Container(),
        remove       = new Container(),
        same         = new Container()

    var _same = sorted.sameIdConflict.concat( sorted.same )
    for( var i=_same.length;i--;)
        same.push(Object.create( entry ).extend({
            remote : _same[i][remote],
            local  : _same[i][local ],
            take : 'remote',
            idConflict : i<sorted.sameIdConflict.length
        }).buildTrunk())


    /// TODO, apply strategy
    var _change = sorted.asChangedIdConflict.concat( sorted.asChanged )
    for( var i=_change.length;i--;)
        change.push(Object.create( entry ).extend({
            remote : _change[i][remote],
            local  : _change[i][local ],
            take : 'remote',
            idConflict : i<sorted.asChangedIdConflict.length
        }).buildTrunk())

    for( var i=sorted.added.length;i--;)
        add.push(Object.create( entry ).extend({
            remote : sorted.added[i],
            local  : null,
            take : 'remote'
        }).buildTrunk())

    for( var i=sorted.removed.length;i--;)
        remove.push(Object.create( entry ).extend({
            remote : null,
            local  : sorted.removed[i],
            take : 'remote'
        }).buildTrunk())

    return {
        same: same,
        add: add,
        remove: remove,
        change: change
    }
}

module.exports = {
    sort : sort,
    merge : merge
}
