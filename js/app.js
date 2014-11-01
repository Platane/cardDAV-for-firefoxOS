
var transport = require('./work/transport')
  , localContactProxy = require('./work/localContactProxy')
  , localStorage = require('./work/settingLocalStorage')

  , appView = Object.create( require('./view/app') )

  , scheduler = require('./model/scheduler')
  , appModel = Object.create( require('./model/app') )
  , settingModel = Object.create( require('./model/setting') )
  , deckModel = Object.create( require('./model/deck') )


var modelBall = {
    app:appModel,
    setting:settingModel,
    deck:deckModel
}

scheduler.init()

settingModel.init()

deckModel.init( modelBall )

appModel.init( modelBall )
appModel.state = 'setting'


localStorage.init( modelBall )
    .hydrate()
    .on()




window.onload=function(){
    appView
        .init( modelBall )
        .on()
}
