const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors())


app.get("/", async (req, res) => {
    console.log(req.query.url);
    const url = 'https://seapi.link/?type=tmdb&id='+req.query.tmdb_id;+'&max_results=1';
    const response = await fetch(url);
    const data = await response.json();

    const first = data?.results.filter(result => result.server == "upstream");
    const urlNext = first[0].url;
    const anotherResponse = await fetch(urlNext);
    const anotherRes = await anotherResponse.text();
    if (!anotherRes.includes("window.atob(")) {
        res.json({"pirate_link" : "", "status" : "captcha"});
    }
    const realLink = anotherRes.split("window.atob('")[1].split("')+")[0];
    const s = eval("function(p,a,c,k,e,d){while(c--)if(k[c])p=p.replace(new RegExp('\\b'+c.toString(a)+'\\b','g'),k[c]);return p}('c("z").5e({5d:[{1u:"w://1z.1y.1x/5c/1w/1v/5b/5a.59?t=58-57-56&s=1m&e=55&f=1o&i=0.0&54=0"}],53:"w://1z.1y.1x/i/1w/1v/52.51",n:"g%",m:"g%",50:"4z",4y:"4x.4w",4v:\'4u\',4t:"o",a:[{1u:"/1t/1e.1t",4s:"4r y",4q:"y"}],y:{4p:0.7,4o:\'4n\',4m:\'#4l\',4k:"4j",4i:1n,4h:\'g\',},\'4g\':{"4f":"4e"},4d:"4c.4b.4a.49.48.47.46.45.44.43.42.5.1.41.40.3z.3y",3x:o,3w:"",3v:"w://3u.3t",3s:{}});9 u,v;9 3r=0,3q=0;9 3=c();9 1s=0,3p=0,3o=0,8=0;$.3n({3m:{\'3l-3k\':\'14-3j\'}});3.b(\'3i\',2(x){6(5>0&&x.d>=5&&v!=1){v=1;$(\'k.3h\').3g(\'3f\')}6(x.d>=8+5||x.d<8){8=x.d;r.3e(\'q\',3d.3c(8),{3b:j*j*24*7})}});3.b(\'1j\',2(x){1s=x.d});3.b(\'12\',2(x){1r(x)});3.b(\'3a\',2(){$(\'k.1q\').39();r.13(\'q\')});3.b(\'1d\',2(x){});2 1r(x){$(\'k.1q\').1p();$(\'#38\').1p();6(u)37;u=1;l=0;6(36.35===34){l=1}$.1k(\'/33?1c=32&1b=1a&31=1o-1n-30-1m-2z&2y=1&l=\'+l,2(1l){$(\'#2x\').2w(1l)});9 8=r.1k(\'q\');6(8>0){c().1j(8)}}2 2v(){9 a=3.2u(1h);1g.1f(a);6(a.1i>1){2t(i=0;i<a.1i;i++){6(a[i].2s==1h){1g.1f(\'!!=\'+i);3.2r(i)}}}}3.b(\'2q\',2(){3.b(\'2p\',2(p){6(2o(\'1e\').2n(p.a[p.2m].2l)){c().1d(o);c().2k(0);19(\'/?1c=2j&1b=1a\')}});2 19(15){9 $h=$("<k />").18({d:"2i",n:"g%",m:"g%",2h:0,16:0,17:2g,2f:"2e(10%, 10%, 10%, 0.4)","2d-2c":"2b"});$("<2a />").18({n:"j%",m:"j%",17:29,"28-16":"27"}).26({\'25\':15,\'23\':\'0\',\'22\':\'14\'}).11($h);$h.21(2(){$(20).13();c().12()});$h.11($(\'#z\'))}});',36,195,'||function|player|||if||lastt|var|tracks|on|jwplayer|position|||100|dd||60|div|adb|height|width|true|tr|ttbn20gd5y4br2|ls|||vvplay|vvad|https||captions|vplayer||appendTo|play|remove|no|url|top|zIndex|css|openIframeOverlay|bn20gd5y4br2|file_code|op|pause|empty|log|console|track_name|length|seek|get|data|1678033576|90|17514509|hide|video_ad|doPlay|prevt|srt|file|03497|01|co|upstreamcdn|s87|this|click|scrolling|frameborder||src|prop|50px|margin|1000001|iframe|center|align|text|rgba|background|1000000|left|absolute|upload_srt|setCurrentCaptions|id|track|test|RegExp|captionsChanged|ready|setCurrentAudioTrack|name|for|getAudioTracks|set_audio_track|html|fviews|embed|507060105bcaca5dfd4d9fcbe5bf24c3|181|hash|view|dl|undefined|cRAds|window|return|over_player_msg|show|complete|ttl|round|Math|set|slow|fadeIn|video_ad_fadein|time|cache|Cache|Content|headers|ajaxSetup|v2done|tott|vastdone2|vastdone1|cast|to|upstream|aboutlink|abouttext|displaytitle|mp4|WT11|EVO|X264|MA|HD|DTS|Bluray|1080p|2022|Home|Way|No|Man|Spider|title|Original|713|qualityLabels|fontOpacity|backgroundOpacity|Verdana|fontFamily|303030|backgroundColor|FFFFFF|color|userFontScale|kind|Upload|label|androidhls|metadata|preload|91|8889|duration|uniform|stretching|jpg|x30t9wg67jxp|image|sp|10800|iFw|NxlBP6ducmAWjLInowjibtsq3iz3iFI|fFodbN8|m3u8|master|x30t9wg67jxp_o|hls2|sources|setup'.split('|'))");
    console.log(s);
    res.json({"pirate_link" : realLink, "status" : "success"});
})

app.listen(5000, () => { console.log("Server is running on port 5000") });