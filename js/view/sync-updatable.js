var scheduler = require('../model/scheduler')

var triggerUpdate = function(){
    if( !this._upflags )
        return this

    for( var i in this._flags )
        if( i & this._upflags )
            this._flags[i].fn()
    this._upflags = 0
}

module.exports = {

    planUpdate:function( model , fn , key ){

        if( !this._flags )
            this._flags = {}

        // idempotent
        for( var i in this._flags )
            if( this._flags[i].key == key )
                return this

        // flag, is a unique power of two
        var flag = Math.pow( 2 , Object.keys( this._flags ).length )

        // listen the model event
        model.listen( function(){

            // set this flag up
            this._upflags = (this._upflags||0) | flag

            // ask for update
            scheduler.requireUpdate()

        }.bind(this) , key )

        // don't lose it
        this._flags[ flag ] = {
            key : key,
            fn : fn,
            model : model
        }

        // listen the scheduler
        this._schedulerListened = !!this._schedulerListened || scheduler.listen( triggerUpdate.bind( this ) , this )

        return this
    },

    unplanUpdate:function( key ){
        for( var i in this._flags || {} )
            if( !key || this._flags[i].key == key )
                this._flags[i].model.unlisten( this._flags[i].key )
        return this
    },
}
