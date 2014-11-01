var Abstract = require('./Abstract')
  , notifier = require('../utils/Notifier')
  , remoteProxy = require('../work/remoteContactProxy')


var remoteFetchingOver = function( remotes ){

    this._pendingRemoteFecting = false

    this.remotes = remotes

    this.hasChanged()

    merge.call( this )
}

var merge = function(){

    if( this._pendingRemoteFecting || this._pendingRemoteFecting )
        return this

    // try to merge
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


    // fetch local

    return this
}

var init = function( models ){
    this.app = models.app
    this.setting = models.setting

    return this
}


module.exports = Object.create( Abstract )
.extend(notifier)
.extend({
    fetch : fetch,
    init : init
})
