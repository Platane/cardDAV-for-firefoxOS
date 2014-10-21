var AbstractView = require('./Abstract')


var tpl = [
    '<section role="region">',
      '<header>',
        '<menu type="toolbar">',
          '<a href="#"><span class="icon icon-edit">edit</span></a>',
          '<a href="#"><span class="icon icon-add">add</span></a>',
        '</menu>',
        '<h1>Messages</h1>',
      '</header>',
    '</section>',
].join('')


var initElement = function(){
    this.dom = this._domify( tpl )
}

var init = function(){

    AbstractView.init.call( this )

    initElement.call( this )
}

module.exports = Object.create( AbstractView )
.extend({
    init : init
})
