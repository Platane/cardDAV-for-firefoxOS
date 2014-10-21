/*
 * simple hxr wrapper
 * @return {Promise}
 */
var request = function( url , options ){

    options = options || {}

    if( options.login && options.password )
        ( options.headers = options.headers || {} )[ 'Authorization' ] = encodeAuth( options.login , options.password )
        
    return new Promise(function(resolve,rejected){

        var success = function( rep ){
            if( rep.target.status != 200 || !rep.target.responseText.length  )
                return rejected( rep.target )

            if( rep.target.status == 200  )
                return resolve( rep.target.responseText )
        }

        var error  = function( rep ){
            rejected( rep );
        }

        var xhr = new XMLHttpRequest({mozSystem: true});
        xhr.open( options.verb || ( options.data ? 'POST' : 'GET' ) , url , true);

        // callbacks
        xhr.addEventListener('error', error , false);
        xhr.addEventListener('abort', error , false);
        xhr.addEventListener('load', success , false);

        // headers
        for( var key in options.headers || {} )
            xhr.setRequestHeader( key , options.headers[ key ] )

        // send
        xhr.send( options.data );
    })
}


var fetch = function( url , options ){
    return get( url , options )

    .then(function( result ){

        return result

        .split('BEGIN:VCARD').slice(1)

        .map(function( string ){
            return CardDAVParser.parse( string )
        })
    })
}

var encodeAuth = function( login , password ){
    return 'Basic '+btoa( login+':'+password );
}


var get = function( url , options ){
    ( options = options || {} ).verb = 'GET'
    return request( url , options )
}

var put = function( url , options ){
    ( options = options || {} ).verb = 'PUT'
    return request( url , options )
}

var post = function( url , options ){
    ( options = options || {} ).verb = 'PUT'
    return request( url , options )
}

var fakeGet = function( url , options ){
    return new Promise(function(resolve,rejected){
        setTimeout( function(){ 

            if( url.substr(-4) !== '.vcf' )
                return resolve(fakeIndex)


        } , 1000 )
    })
}

module.exports = {
    put : put,
    post : post,
    get : get,
    encodeAuth : encodeAuth,

    fetch : fetch
}




var fakeIndex = 
[
'<html><head>',
  '<title>Index for addressbooks/arthur/contacts/ - SabreDAV 1.7.6-stable</title>',
  '<style type="text/css">',
  'body { Font-family: arial}',
  'h1 { font-size: 150% }',
  '</style>',
        '<link rel="shortcut icon" href="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=favicon.ico" type="image/vnd.microsoft.icon"></head>',
'<body>',
  '<h1>Index for addressbooks/arthur/contacts/</h1>',
  '<table>',
    '<tbody><tr><th width="24"></th><th>Name</th><th>Type</th><th>Size</th><th>Last modified</th></tr>',
    '<tr><td colspan="5"><hr></td></tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fparent.png" width="24" alt="Parent"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur">..</a></td>',
    '<td>[parent]</td>',
    '<td></td>',
    '<td></td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/d715a55c-0fb8-43b6-868b-6938f5b8cbc5.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/d715a55c-0fb8-43b6-868b-6938f5b8cbc5.vcf">d715a55c-0fb8-43b6-868b-6938f5b8cbc5.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>4665</td>',
    '<td>2014-07-13T09:05:56+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/d968d91c-123c-4e84-ad1c-ffb568b5d712.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/d968d91c-123c-4e84-ad1c-ffb568b5d712.vcf">d968d91c-123c-4e84-ad1c-ffb568b5d712.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>224</td>',
    '<td>2014-05-02T09:14:37+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.10ac3e58c9%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.10ac3e58c9%2540arthur-brongniart.fr.vcf">20140319T120641.10ac3e58c9%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>251</td>',
    '<td>2014-07-13T09:05:07+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/751f1856-26c4-44a7-afcf-121b45cb23e9.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/751f1856-26c4-44a7-afcf-121b45cb23e9.vcf">751f1856-26c4-44a7-afcf-121b45cb23e9.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>232</td>',
    '<td>2014-04-20T12:32:56+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.286cb8f294%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.286cb8f294%2540arthur-brongniart.fr.vcf">20140319T120641.286cb8f294%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>253</td>',
    '<td>2014-07-13T09:05:03+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/9a1791ea-9b11-4bff-a8c3-b25560bf6a41.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/9a1791ea-9b11-4bff-a8c3-b25560bf6a41.vcf">9a1791ea-9b11-4bff-a8c3-b25560bf6a41.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>245</td>',
    '<td>2014-10-14T14:15:29+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/60ecae9d-254a-4f79-9ab7-e0e3fd010d85.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/60ecae9d-254a-4f79-9ab7-e0e3fd010d85.vcf">60ecae9d-254a-4f79-9ab7-e0e3fd010d85.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>239</td>',
    '<td>2014-07-13T09:00:30+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.614242efff%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.614242efff%2540arthur-brongniart.fr.vcf">20140319T120641.614242efff%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>262</td>',
    '<td>2014-07-13T09:02:49+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.1991912036%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.1991912036%2540arthur-brongniart.fr.vcf">20140319T120641.1991912036%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>4684</td>',
    '<td>2014-07-13T09:08:06+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.effc6759fc%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.effc6759fc%2540arthur-brongniart.fr.vcf">20140319T120641.effc6759fc%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>229</td>',
    '<td>2014-07-13T09:06:43+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/796a9b32-deae-435f-9ebd-6d3bbc7409bb.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/796a9b32-deae-435f-9ebd-6d3bbc7409bb.vcf">796a9b32-deae-435f-9ebd-6d3bbc7409bb.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>43484</td>',
    '<td>2014-09-15T17:12:59+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/65779254-d469-4950-99ba-3b8dfdf65cfa.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/65779254-d469-4950-99ba-3b8dfdf65cfa.vcf">65779254-d469-4950-99ba-3b8dfdf65cfa.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>225</td>',
    '<td>2014-09-15T17:12:52+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120640.ab23d69b88%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120640.ab23d69b88%2540arthur-brongniart.fr.vcf">20140319T120640.ab23d69b88%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>253</td>',
    '<td>2014-07-13T09:04:48+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7e53d77d-e39e-4a5b-9d3e-5112dbe25627.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7e53d77d-e39e-4a5b-9d3e-5112dbe25627.vcf">7e53d77d-e39e-4a5b-9d3e-5112dbe25627.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>228</td>',
    '<td>2014-07-13T09:06:49+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/5f7d5ea2-1118-4b33-b460-a6d49b0b77e2.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/5f7d5ea2-1118-4b33-b460-a6d49b0b77e2.vcf">5f7d5ea2-1118-4b33-b460-a6d49b0b77e2.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>230</td>',
    '<td>2014-04-17T19:31:31+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/39fcb8a6-e5a0-475a-bdcb-b264f50240f6.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/39fcb8a6-e5a0-475a-bdcb-b264f50240f6.vcf">39fcb8a6-e5a0-475a-bdcb-b264f50240f6.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>243</td>',
    '<td>2014-05-12T08:09:35+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.be90f2228e%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.be90f2228e%2540arthur-brongniart.fr.vcf">20140319T120641.be90f2228e%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>64975</td>',
    '<td>2014-09-15T17:12:44+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.2a96064176%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.2a96064176%2540arthur-brongniart.fr.vcf">20140319T120641.2a96064176%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>237</td>',
    '<td>2014-07-13T09:04:42+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7f55387b-ac36-477f-b451-b477d2d1ec6f.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7f55387b-ac36-477f-b451-b477d2d1ec6f.vcf">7f55387b-ac36-477f-b451-b477d2d1ec6f.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>247</td>',
    '<td>2014-10-14T14:15:39+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.6b96f4c7ef%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.6b96f4c7ef%2540arthur-brongniart.fr.vcf">20140319T120641.6b96f4c7ef%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>316477</td>',
    '<td>2014-09-15T17:12:41+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120640.647d85054b%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120640.647d85054b%2540arthur-brongniart.fr.vcf">20140319T120640.647d85054b%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>259</td>',
    '<td>2014-07-13T09:04:28+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/d12d7650-3843-4c75-846d-8ce6b6318970.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/d12d7650-3843-4c75-846d-8ce6b6318970.vcf">d12d7650-3843-4c75-846d-8ce6b6318970.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>242</td>',
    '<td>2014-04-06T11:17:27+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/c64abe04-d493-42d2-a0d4-43d0a96eb7a3.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/c64abe04-d493-42d2-a0d4-43d0a96eb7a3.vcf">c64abe04-d493-42d2-a0d4-43d0a96eb7a3.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>221</td>',
    '<td>2014-09-15T17:12:52+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/6ddf8cf2-d84a-44f3-92d9-0b5afe32688c.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/6ddf8cf2-d84a-44f3-92d9-0b5afe32688c.vcf">6ddf8cf2-d84a-44f3-92d9-0b5afe32688c.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>235</td>',
    '<td>2014-07-13T09:07:07+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7d8c1df8-c4e0-4e17-8eab-89811a7ed0ff.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7d8c1df8-c4e0-4e17-8eab-89811a7ed0ff.vcf">7d8c1df8-c4e0-4e17-8eab-89811a7ed0ff.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>242</td>',
    '<td>2014-10-14T14:15:43+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.472feab4f2%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.472feab4f2%2540arthur-brongniart.fr.vcf">20140319T120641.472feab4f2%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>234</td>',
    '<td>2014-07-13T09:02:41+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.01233516c8%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.01233516c8%2540arthur-brongniart.fr.vcf">20140319T120641.01233516c8%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>247</td>',
    '<td>2014-07-13T09:04:23+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.fc38d9e445%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.fc38d9e445%2540arthur-brongniart.fr.vcf">20140319T120641.fc38d9e445%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>257</td>',
    '<td>2014-07-13T09:04:18+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/5fdcf69c-1fec-4973-98d7-1b2e624a5ac6.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/5fdcf69c-1fec-4973-98d7-1b2e624a5ac6.vcf">5fdcf69c-1fec-4973-98d7-1b2e624a5ac6.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>232</td>',
    '<td>2014-07-13T09:00:21+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/6a2d19e2-303e-4f61-afca-705334cefd73.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/6a2d19e2-303e-4f61-afca-705334cefd73.vcf">6a2d19e2-303e-4f61-afca-705334cefd73.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>203</td>',
    '<td>2014-04-06T11:01:25+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/86f36391-1a77-4b8c-9106-28b19a14092d.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/86f36391-1a77-4b8c-9106-28b19a14092d.vcf">86f36391-1a77-4b8c-9106-28b19a14092d.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>230</td>',
    '<td>2014-07-13T09:00:37+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.7405eb74f5%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.7405eb74f5%2540arthur-brongniart.fr.vcf">20140319T120641.7405eb74f5%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>230</td>',
    '<td>2014-07-13T09:03:00+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.fae4541d45%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.fae4541d45%2540arthur-brongniart.fr.vcf">20140319T120641.fae4541d45%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>251</td>',
    '<td>2014-07-13T09:04:11+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120640.f13e719cd4%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120640.f13e719cd4%2540arthur-brongniart.fr.vcf">20140319T120640.f13e719cd4%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>251</td>',
    '<td>2014-07-13T09:04:07+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.c0f0dd63a3%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.c0f0dd63a3%2540arthur-brongniart.fr.vcf">20140319T120641.c0f0dd63a3%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>248</td>',
    '<td>2014-07-13T09:03:07+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.8acaa3227f%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.8acaa3227f%2540arthur-brongniart.fr.vcf">20140319T120641.8acaa3227f%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>36475</td>',
    '<td>2014-09-15T17:12:35+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/ca8fae72-71c8-4efd-aa82-2c69e4251ac8.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/ca8fae72-71c8-4efd-aa82-2c69e4251ac8.vcf">ca8fae72-71c8-4efd-aa82-2c69e4251ac8.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>243</td>',
    '<td>2014-04-17T19:30:53+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.75db5a613f%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.75db5a613f%2540arthur-brongniart.fr.vcf">20140319T120641.75db5a613f%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>257</td>',
    '<td>2014-07-13T09:03:17+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/78639d09-62a4-4ea7-bb96-aea4196dea62.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/78639d09-62a4-4ea7-bb96-aea4196dea62.vcf">78639d09-62a4-4ea7-bb96-aea4196dea62.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>236</td>',
    '<td>2014-03-22T11:20:24+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.a6e91850c4%2540arthur-brongniart.fr.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/20140319T120641.a6e91850c4%2540arthur-brongniart.fr.vcf">20140319T120641.a6e91850c4%40arthur-brongniart.fr.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>261</td>',
    '<td>2014-07-13T09:07:24+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/742bdc78-7ba3-4231-be7f-3d034db67140.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/742bdc78-7ba3-4231-be7f-3d034db67140.vcf">742bdc78-7ba3-4231-be7f-3d034db67140.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>238</td>',
    '<td>2014-04-12T13:25:01+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7d6e81c3-5584-4dc0-bd86-81cf8e624cc9.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/7d6e81c3-5584-4dc0-bd86-81cf8e624cc9.vcf">7d6e81c3-5584-4dc0-bd86-81cf8e624cc9.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>26402</td>',
    '<td>2014-09-15T17:12:43+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/467e3a68-d451-44d5-ad2c-add0b190b511.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/467e3a68-d451-44d5-ad2c-add0b190b511.vcf">467e3a68-d451-44d5-ad2c-add0b190b511.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>212</td>',
    '<td>2014-04-12T13:25:04+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/c6e35365-81f1-482c-8705-ee7532d6c7be.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/c6e35365-81f1-482c-8705-ee7532d6c7be.vcf">c6e35365-81f1-482c-8705-ee7532d6c7be.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>301</td>',
    '<td>2014-04-12T13:25:07+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/95a45969-892e-4849-ad26-c13eefa38e12.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/95a45969-892e-4849-ad26-c13eefa38e12.vcf">95a45969-892e-4849-ad26-c13eefa38e12.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>54390</td>',
    '<td>2014-10-14T14:15:57+00:00</td>',
    '</tr><tr>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/bacccd44-b2c4-42b9-ba48-bc2a3424f591.vcf"><img src="/owc/remote.php/carddav/?sabreAction=asset&amp;assetName=icons%2Fcard.png" alt="" width="24"></a></td>',
    '<td><a href="/owc/remote.php/carddav/addressbooks/arthur/contacts/bacccd44-b2c4-42b9-ba48-bc2a3424f591.vcf">bacccd44-b2c4-42b9-ba48-bc2a3424f591.vcf</a></td>',
    '<td>text/x-vcard; charset=utf-8</td>',
    '<td>238</td>',
    '<td>2014-10-14T14:15:46+00:00</td>',
    '</tr><tr><td colspan="5"><hr></td></tr></tbody></table>',
        '<address>Generated by SabreDAV 1.7.6-stable (c)2007-2013 <a href="http://code.google.com/p/sabredav/">http://code.google.com/p/sabredav/</a></address>',
'        ',
        '</body></html>',
        ].join('\n')