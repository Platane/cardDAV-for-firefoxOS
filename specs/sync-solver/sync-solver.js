var solver = require('../../js/work/solver.js')
  , samples = require('../../test/samples.js')

describe('solver :',function(){

	for( var i=samples.length;i--;)
		(function(i){
			var sample = samples[i]
			var repartitionLiteral = ''
			for( var i in sample.expect||{})
				repartitionLiteral += ' '+i+':'+sample.expect[i]
			describe( sample.label ,function(){

				beforeEach(function(){
					this.s = solver.sort( sample.remote , sample.local )
				})

				it('should have repartition '+repartitionLiteral, function(){
					var e = sample.expect||{}
					for( var i in this.s )
						expect( i+':'+this.s[i].length ).toBe( i+':'+(0|e[i]) )
				})
			})
		})(i)
})
