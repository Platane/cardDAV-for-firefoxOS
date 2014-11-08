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
	 * name {
	 *  first
	 *  surt
     * }
	 *
	 *  photo
	 */

var copy = function( o ){

	o=o||{}

	//copy tel
	this.tel = {}
	for( var i in o.tel||{} )
		this.tel[i] = o.tel[i]

	// copy category
	this.category = (o.category||[]).slice()

	this.photo = o.photo

	this.email = o.email

	this.name = {
		first : o.name.first,
		last : o.name.last
	}

	this.lastModified = new Date( 0|o.lastModified )

	this.id = o.id

	return this
}


module.exports = Object.create( Abstract ).extend({

	copy : copy,


})
