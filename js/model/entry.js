var Abstract = require('../utils/Abstract')
  , Notifier = require('../utils/Notifier')

module.exports = Object.create( Abstract )
.extend( Notifier )
.extend({

    renote: null,
    local: null,
    trunk: null,

})
