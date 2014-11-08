var photos = require('./photos')
  , card = require('../js/model/card')

var peoples = [
{
    name : {
        first : 'Constance',
        last : 'Lewis'
    },
    tel : {
        CELL: '06 46 72 60 39'
    },
    email : 'constance.lewis39@example.com',
    lastModified : '1412278971',
    photo : photos[0],
    id : '488q46 8a648a46 8a*!@*(!@))!_!@qw'
},
{
    name : {
        first : 'Peggy',
        last : 'Mccoy'
    },
    tel : {
        CELL: '06 77 85 78 93'
    },
    email : 'peggy.mccoy82@example.com',
    lastModified : '1412277951',
    photo : photos[1],
    id : '4848sa8 xx--as48a dqwde48q6w8 \adqw'
},
{
    name : {
        first : 'Jeff',
        last : 'Mitchell'
    },
    tel : {
        CELL: '06 15 03 96 59'
    },
    email : 'jeff.mitchell50@example.com',
    lastModified : '1412271951',
    photo : photos[3],
    id : '4a86v66df6 875642 12213   342@$!@$ @!$%qw'
}
]

var list = [
{
    local : [ peoples[0] ],
    remote : [ peoples[0] ],
    label : 'strictly same with same id one people',
    expect : {same:1}
},
{
    local : [ peoples[0] , peoples[1] , peoples[2] ],
    remote : [  peoples[0] , peoples[1] , peoples[2] ],
    label : 'strictly same with same id three people',
    expect : {same:3}
}
]

;(function(){
    var a = peoples[0]
    var b = Object.create( a )
    b.id = 'adsasd a5sd4a'
    list.push({
        local : [ a ],
        remote : [ b ],
        label : 'strictly same with diffent id one people',
        expect : {sameIdConflict:1}
    })
})()

;(function(){
    var a = peoples[0]
    var b = Object.create( a )
    b.name = {
        first : a.name.first+'th',
        last : a.name.last
    }
    list.push({
        local : [ a ],
        remote : [ b ],
        label : 'slightly different name with same id one people',
        expect : {asChanged:1}
    })
})()

;(function(){
    var a = peoples[0]
    var b = Object.create( a )
    b.name = {
        first : a.name.first+'th',
        last : a.name.last
    }
    list.push({
        local : [ peoples[2] , peoples[1] , a ],
        remote : [ peoples[2] , b , peoples[1] ],
        label : 'mixed',
        expect : {asChanged:1,same:2}
    })
})()




for(var i=list.length;i--;){
    for(var k=list[i].local.length;k--;)
        list[i].local[k] = Object.create( card ).copy( list[i].local[k] )
    for(var k=list[i].remote.length;k--;)
        list[i].remote[k] = Object.create( card ).copy( list[i].remote[k] )
}

module.exports = list
