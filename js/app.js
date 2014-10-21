
var transport = require('./work/transport')
  , cardDavListParser = require('./work/cardDAVListParser')
  , localContactProxy = require('./work/localContactProxy')

  , appView = Object.create( require('./view/app') )

  , scheduler = require('./model/scheduler')
  , appModel = Object.create( require('./model/App') )

try{


scheduler.init()

appModel.init()

appView.init({
    app:appModel
})


}
catch( e ){
    console.log("error", e.message , e)
}
