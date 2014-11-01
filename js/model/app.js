var Abstract = require('./Abstract')
  , notifier = require('../utils/Notifier')



module.exports = Object.create( Abstract )
.extend(notifier)
.extend({
    state : ''
})
