var View = require('../../js/view/Abstract')
  , Model = require('../../js/model/Abstract')
  , scheduler = require('../../js/model/scheduler')


describe('view :' , function(){

    beforeEach(function(){

        scheduler.unlisten()

        this.view = Object.create( View ).init()
        this.model = Object.create( Model ).init()
    })

    describe('planUpdate method :',function(){

        beforeEach(function(){

            //prepare the spy
            this.fn = function(){}
            spyOn( this , 'fn' ).and.callThrough()
        })

        describe('only register, model don\'t change :',function(){

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('callback function should not be called',function(){
                expect( this.fn.calls.count() ).toEqual(0)
            })
        })

        describe('register, then model changes directly after :',function(){

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )

                // change
                this.model.hasChanged()

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('callback function should be called',function(){
                expect( this.fn.calls.count() ).toEqual(1)
            })
        })

        describe('register, then model changes after a short time :',function(){

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )

                // change
                setTimeout( function(){
                    this.model.hasChanged()
                }.bind(this),100)

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('callback function should be called',function(){
                expect( this.fn.calls.count() ).toEqual(1)
            })
        })

        describe('register, then model changes several times :',function(){

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )

                // change
                setTimeout( function(){
                    this.model.hasChanged()
                    this.model.hasChanged()
                    this.model.hasChanged()
                    this.model.hasChanged()
                }.bind(this),100)

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('callback function should be called once',function(){
                expect( this.fn.calls.count() ).toEqual(1)
            })
        })

        describe('register with two keys the same model, then model changes several times :',function(){

            beforeEach(function(){

                //prepare the spy
                this.fn2 = function(){}
                spyOn( this , 'fn2' ).and.callThrough()
            })

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )
                this.view.planUpdate( this.model , this.fn2 , "key2" )

                // change
                setTimeout( function(){
                    this.model.hasChanged()
                    this.model.hasChanged()
                    this.model.hasChanged()
                }.bind(this),100)

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('each callback function should be called once',function(){
                expect( this.fn.calls.count() ).toEqual(1)
                expect( this.fn2.calls.count() ).toEqual(1)
            })
        })

        describe('register two models, then one model changes several times :',function(){

            beforeEach(function(){

                //prepare the spy
                this.fn2 = function(){}
                spyOn( this , 'fn2' ).and.callThrough()

                //other model
                this.model2= Object.create( Model ).init()
            })

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )
                this.view.planUpdate( this.model2 , this.fn2 , "key2" )

                // change
                setTimeout( function(){
                    this.model.hasChanged()
                    this.model.hasChanged()
                    this.model.hasChanged()
                }.bind(this),100)

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('only one callback function should be called once',function(){
                expect( this.fn.calls.count() ).toEqual(1)
                expect( this.fn2.calls.count() ).toEqual(0)
            })
        })


        describe('register two models, then the two models change several times :',function(){

            beforeEach(function(){

                //prepare the spy
                this.fn2 = function(){}
                spyOn( this , 'fn2' ).and.callThrough()

                //other model
                this.model2= Object.create( Model ).init()
            })

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )
                this.view.planUpdate( this.model2 , this.fn2 , "key2" )

                // change
                setTimeout( function(){
                    this.model.hasChanged()
                    this.model2.hasChanged()
                    this.model.hasChanged()
                    this.model2.hasChanged()
                }.bind(this),100)

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('each callback function should be called once',function(){
                expect( this.fn.calls.count() ).toEqual(1)
                expect( this.fn2.calls.count() ).toEqual(1)
            })
        })


        describe('unregister model :',function(){

            beforeEach(function(){

                //prepare the spy
                this.fn2 = function(){}
                spyOn( this , 'fn2' ).and.callThrough()

                //other model
                this.model2= Object.create( Model ).init()
            })

            beforeEach(function( done ){

                //register
                this.view.planUpdate( this.model , this.fn , "key" )
                this.view.planUpdate( this.model2 , this.fn2 , "key2" )

                // unregister
                this.view.unplanUpdate( "key2" )

                // change
                setTimeout( function(){
                    this.model.hasChanged()
                    this.model.hasChanged()
                    this.model.hasChanged()
                    this.model2.hasChanged()
                    this.model2.hasChanged()
                    this.model2.hasChanged()
                }.bind(this),100)

                // call done ( else error )
                setTimeout( done , 200 )
            })

            it('callback function should not be called',function(){
                expect( this.fn.calls.count() ).toEqual(1)
                expect( this.fn2.calls.count() ).toEqual(0)
            })
        })

    })

})
