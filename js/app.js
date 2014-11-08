
var transport = require('./work/transport')
  , localContactProxy = require('./work/localContactProxy')
  , localStorage = require('./work/settingLocalStorage')

  , appView = Object.create( require('./view/app') )

  , scheduler = require('./model/scheduler')
  , appModel = Object.create( require('./model/app') )
  , settingModel = Object.create( require('./model/setting') )
  , strategyModel = Object.create( require('./model/strategy') )
  , deckModel = Object.create( require('./model/deck') )


var modelBall = {
    app:appModel,
    setting:settingModel,
    deck:deckModel,
    strategy:strategyModel,
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
