var Abstract = require('./Abstract')
  , notifier = require('../utils/Notifier')
  //, remoteProxy = require('../work/remoteContactProxy')
  , remoteProxy = require('../work/fakeProxy')('remote','mixed')
  , localProxy =require('../work/fakeProxy')('local','mixed')
  , solver = require('../work/solver')

  , entry = require('../model/entry')


var remoteFetchingOver = function( remotes ){

    this._pendingRemoteFecting = false

    this.remotes = remotes

    this.hasChanged()

    merge.call( this )
}

var localFetchingOver = function( locals ){

    this._pendingLocalFecting = false

    this.locals = locals

    this.hasChanged()

    merge.call( this )
}

var merge = function(){

    if( this._pendingRemoteFecting || this._pendingLocalFecting )
        return this

    // sort into named categorized
    this.sorted = solver.sort( this.remotes , this.locals )
    this.hasChanged()

    // merge according to strategy
    this.merged = solver.merge( this.sorted , this.stategy )
    this.hasChanged()
}

var fetch = function(){

    var setting = this.setting || {}

    this._pendingRemoteFecting = true
    this._pendingLocalFecting = true

    remoteProxy
    .fetchAll({
        url : setting.url,
        login : setting.login,
        password : setting.password
    })
    .then(remoteFetchingOver.bind(this))

    localProxy
    .fetchAll({
        url : setting.url,
        login : setting.login,
        password : setting.password
    })
    .then(localFetchingOver.bind(this))

    return this
}

var init = function( models ){
    this.app = models.app
    this.setting = models.setting
    this.stategy = models.strategy

    return this
}


module.exports = Object.create( Abstract )
.extend(notifier)
.extend({
    fetch : fetch,
    init : init
})
