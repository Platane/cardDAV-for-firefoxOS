
var transport = require('./work/transport')
  , cardDavListParser = require('./work/cardDAVListParser')
  , localContactProxy = require('./work/localContactProxy')
  , localStorage = require('./work/settingLocalStorage')

  , appView = Object.create( require('./view/app') )

  , scheduler = require('./model/scheduler')
  , appModel = Object.create( require('./model/app') )
  , settingModel = Object.create( require('./model/setting') )



scheduler.init()

settingModel.init()

appModel.init()
appModel.state = 'setting'
appModel.setting = settingModel


localStorage.init({
        setting : settingModel
    })
    .hydrate()
    .on()




window.onload=function(){
    appView
        .init({
            setting : settingModel,
            app : appModel
        })
        .on()
}
