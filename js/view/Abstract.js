var Abstract = require('../utils/Abstract')
  , scheduler = require('../model/scheduler')

module.exports = Object.create( Abstract ).extend({

    init:function(){

    	this.flags = {}

    	this._upflags = 0

    	return this
    },

    planUpdate:function( model , fn , key ){


    	// idempotent
    	for( var i in this.flags )
    		if( this.flags[i].key == key )
    			return this

    	// flag, is a unique power of two
    	var flag = Math.pow( 2 , Object.keys( this.flags ).length )

    	// listen the model event
		model.listen( function(){

			// set this flag up
			this._upflags = this._upflags | flag

			// ask for update
			scheduler.requireUpdate()

		}.bind(this) , key )

		// don't lose it
    	this.flags[ flag ] = {
    		key : key,
    		fn : fn,
            model : model
    	}

    	// listen the scheduler
    	this._schedulerListened = !!this._schedulerListened || scheduler.listen( this.update.bind( this ) , this )

    	return this
    },

    unplanUpdate:function( key ){
        for( var i in this.flags )
            if( this.flags[i].key == key )
                this.flags[i].model.unlisten( key )
        return this
    },

    update:function(){
    	if( !this._upflags )
    		return this

    	for( var i in this.flags )
    		if( i & this._upflags )
    			this.flags[i].fn()
    },

    _domify:(function(){
        if( !typeof document != 'object' )
            return function(){}
        var tank = document.createElement('div')
        return function( tpl ){
            tank.innerHTML = tpl
            var domEl = tank.children[ 0 ]
            tank.innerHTML = ''
            return domEl
        }
    })()
})
