var Abstract = require('../utils/Abstract')
  , Notifier = require('../utils/Notifier')

var requireUpdate = function(){

	if( this.willUpdate )
		return this

	this.willUpdate = true

	//requestAnimationFrame( this._hasChanged = ( this._hasChanged || this.hasChanged.bind(this) ) )
	setTimeout( this._callback = ( this._callback || callback.bind(this) ) , 0 )
}

var callback = function(){
    this.hasChanged()
    this.willUpdate = false
}

module.exports = Object.create( Abstract )
	.extend( Notifier )
	.extend({
		requireUpdate : requireUpdate
	})
