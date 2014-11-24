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
},
{
    name : {
        first : 'Charles',
        last : 'Azerin'
    },
    tel : {
        CELL: '06 85 95 05 36'
    },
    email : 'buzzz50@eple.com',
    lastModified : '1412261951',
    photo : photos[2],
    id : '4a8456294475219$%^&@!#w'
},
{
    name : {
        first : 'Clinton',
        last : 'Boyd'
    },
    tel : {
        CELL: '06 50 14 50 80',
        HOME: '06 80 96 26 88',
        WORK: '09 33 58 12 44'
    },
    email : 'superman48@y.com',
    lastModified : '1412271971',
    photo : photos[4],
    id : '48aaa8a*!@*(!@))!_!@qw'
},
{
    name : {
        first : 'Miguel',
        last : 'Brown'
    },
    tel : {
        CELL: '07 16 84 10 80',
        WORK: '06 87 58 98 68'
    },
    email : 'sprofyan48@rue.com',
    lastModified : '1412171971',
    photo : photos[5],
    id : '48aaa8555555qw'
},
{
    name : {
        first : 'Ashley',
        last : 'Sutton'
    },
    tel : {
        CELL: '07 16 81 15 11',
        WORK: '06 56 23 12 10'
    },
    email : 'ashley.sutton69@example.com',
    lastModified : '1412171911',
    photo : photos[6],
    id : '48aaa11a1a@!$5qw'
},
{
    name : {
        first : 'Vicki',
        last : 'Roberts'
    },
    tel : {
        CELL: '84 65 58 43 87',
        WORK: '84 22 59 21 37'
    },
    email : 'vicki.roberts76@example.com',
    lastModified : '1412161911',
    photo : photos[2],
    id : '48a45a 44a qw'
},
{
    name : {
        first : 'Alexa',
        last : 'Arnold'
    },
    tel : {
        CELL: '07 63 59 56 57'
    },
    email : 'alexa.arnold65@example.com',
    lastModified : '1412161511',
    photo : photos[1],
    id : '48a45a 44a qw'
},
{
    name : {
        first : 'Norman',
        last : 'Olivier'
    },
    tel : {
        CELL: '08 91 77 66 02'
    },
    email : 'alnold65@example.com',
    lastModified : '1412161518',
    photo : photos[0],
    id : '48a45a 44a qw 77'
},
]

var list = [
{
    local : [ peoples[0] ],
    remote : [ peoples[0] ],
    label : 'strictly same with same id one people',
    expect : {same:1}
},
{
    local : [ peoples[0] , peoples[1] , peoples[2] , peoples[3] ],
    remote : [  peoples[0] , peoples[1] , peoples[2] , peoples[3] ],
    label : 'strictly same with same id four people',
    expect : {same:4}
},
{
    local : [ ],
    remote : [ peoples[3] ],
    label : 'add one',
    expect : {added:1}
},
{
    local : [ peoples[3] ],
    remote : [  ],
    label : 'remove one',
    expect : {removed:1}
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
    var a = Object.create( peoples[0] )
    a.name = {
        first : peoples[0].name.first+'th',
        last : peoples[0].name.last
    }
    var b = Object.create( peoples[1] )
    b.name = {
        first : peoples[1].name.first+'th',
        last : peoples[1].name.last
    }
    var c = Object.create( peoples[2] )
    c.name = {
        first : peoples[2].name.first+'th',
        last : peoples[2].name.last
    }
    var d = Object.create( peoples[6] )
    d.name = {
        first : peoples[6].name.first+'th',
        last : peoples[6].name.last
    }
    d.tel = {
        CELL : peoples[6].tel.CELL,
        WORK : '06 89 42 36 99',
    }
    list.push({
        local : [ peoples[8], peoples[7], peoples[2] , peoples[4] , peoples[5] , peoples[1] , peoples[0] , peoples[3] , peoples[6] ],
        remote : [ peoples[9], a , b , c , peoples[5] , peoples[4] , peoples[3] , d],
        label : 'mixed',
        expect : {asChanged:4,same:3,added:1,removed:2}
    })
})()


for(var i=list.length;i--;){
    for(var k=list[i].local.length;k--;)
        list[i].local[k] = Object.create( card ).copy( list[i].local[k] )
    for(var k=list[i].remote.length;k--;)
        list[i].remote[k] = Object.create( card ).copy( list[i].remote[k] )
}

module.exports = list
