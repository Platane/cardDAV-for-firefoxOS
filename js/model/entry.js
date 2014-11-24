var Abstract = require('../utils/Abstract')
  , Notifier = require('../utils/Notifier')

  , Card = require('../model/Card')

var id=0;

var buildTrunk = function(){
    this.id = this.id || (this.remote||{}).id || (this.local||{}).id || 'entry-'+(id++)

    var master = this[this.take],
        slave = this[ this.take == 'remote' ? 'local' : 'remote' ]

    if(!master){
        this.trunk = null
        return this
    }
    if(!slave){
        this.trunk = master
        return this
    }

    this.trunk = Object.create(Card)

    // name
    this.trunk.name = master.name

    // photo
    this.trunk.photo = master.photo

    // tel
    this.trunk.tel = {}
    for( var i in slave.tel )
        this.trunk.tel[i] = slave.tel[i]
    for( var i in master.tel )
        this.trunk.tel[i] = master.tel[i]

    this.hasChanged()

    return this
}

module.exports = Object.create( Abstract )
.extend( Notifier )
.extend({

    remote: null,
    local: null,
    trunk: null,
    take: 'remote',
    buildTrunk:buildTrunk,

})
