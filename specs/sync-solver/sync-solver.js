var solver = require('../../js/work/solver.js')

describe('sync solver',function(){

	describe('exact same entity',function(){

		beforeEach(function(){

			this.listA = [
				{ id:'5a6446' , tel : { 'CELL' : '06 85 75 52 63' }  }
			]

			this.listB = [
				{ id:'5a6446' , tel : { 'CELL' : '06 85 75 52 63' }  }
			]

		})

		beforeEach(function(){

			this.res = solver.sort( this.listA , this.listB )

		})

		xit('should be sorted as same',function(){
			for( var i in this.res )
				switch( i ){
					case 'same' :
						expect( this.res[i].length ).toBe( 1 )
						expect( this.res[i][0][0].id ).toBe( '5a6446' )
					break
					default :
						expect( this.res[i].length ).toBe( 0 )
				}
		})

	})

})
