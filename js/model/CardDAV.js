var Abstract = require('../utils/Abstract')

	/*
	 * Object attributes are
	 *
	 *  id
	 *  alternativeId
	 *
	 *  tel {
	 *    type1 : number ,
	 *    type2 : number ,
	 *    ...
	 *  }
	 *  email
	 *  lastModified
	 *  category : [
	 *     category1 ,
	 *     category2 ,
	 *     ...
	 *  ]
	 *
	 *  photo
	 */

var copy = function( o ){

	//copy tel
	this.tel = {}
	for( var i in o.tel||{} )
		this.tel[i] = o.tel[i]

	// copy category
	this.category = o.category.split()

	this.photo = o.photo

	this.email = o.email

	this.lastModified = new Date( o.lastModified || 0 )
}


module.exports = Object.create( Abstract ).extend({

	copy : copy,


})
