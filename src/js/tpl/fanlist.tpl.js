/*TMODJS:{"version":47,"md5":"2489797540c510d18c2bab1f390b7ddd"}*/
template("/Users/xiaominghari/Documents/wanrenqun/cbd/cbd/src/js/tpl/fanlist",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.data,e=(a.v,a.i,b.$escape),f="";return c(d,function(a){f+=' <li> <img class="fl-avatar" src="',f+=e(a.headimgurl),f+='" alt=""> <div class="fl-name">',f+=e(a.nickname||"\u8fd8\u6ca1\u540d\u5b57"),f+="</div> ",1==a.is_vip&&(f+=' <div class="fl-vip">VIP</div> '),f+=" </li> "}),new String(f)});