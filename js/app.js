
var transport = require('./work/transport')
  , cardDavListParser = require('./work/cardDAVListParser')
  , localContactProxy = require('./work/localContactProxy')
  , localStorage = require('./work/parametersLocalStorage')

  , appView = Object.create( require('./view/app') )
  , parametersView = Object.create( require('./view/parameters') )

  , scheduler = require('./model/scheduler')
  , appModel = Object.create( require('./model/App') )
  , parametersModel = Object.create( require('./model/parameters') )



scheduler.init()

appModel.init()
appModel.state = 'parameters'


localStorage.init({
        parameters : parametersModel
    })
    .hydrate()
    .on()


parametersView
    .init({
        parameters : parametersModel
    })
    .on()

window.onload=function(){
    document.body.appendChild( parametersView.dom )
}
