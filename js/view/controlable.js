module.exports = {

    init:function(){
        this.controler = {}
        return this
    },

    enable:function(){
        for(var i in this.controler )
            this.controler[i].enable()
        return this
    },

    disable:function(){
        for(var i in this.controler )
            this.controler[i].disable()
        return this
    },
}
