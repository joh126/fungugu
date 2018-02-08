require(["src/components/surroundingHouse/js/surroundingHouse-102a148556.server.js"],function(t){"use strict";({init:function(){return this.basicFn(),this},basicFn:function(){var e=this,a={city:yf.userInfo.city,comName:yf.param("housingName"),distance:2e3};yf.loading("#neighborhood"),t.getSurHouse(a).success(function(t){if(200==t.code){var a,n,i="",r=[];a=t.data.aroundPrice.length>=6?6:t.data.length;for(o=0;o<a;o++)r.push(Number(t.data.aroundPrice[o].unitPrice));r.push(t.data.additionalInfo.unitPriceSelf),n=Math.max.apply(null,r);for(var o=0;o<a;o++)i+='<tr>        \t\t\t\t\t\t<td class="sur-house-name" title="'+t.data.aroundPrice[o].residentialAreaName+'">'+t.data.aroundPrice[o].residentialAreaName+"</td>        \t\t\t\t\t\t<td>"+t.data.aroundPrice[o].distance+'</td>        \t\t\t\t\t\t<td><div class="layui-progress layui-progress-big" lay-showpercent="true">                           \t\t\t \t<div class="layui-progress-bar layui-bg-blue" lay-percent="100%"  style="width:'+Math.floor(Number(t.data.aroundPrice[o].unitPrice)/n*100)+'%" ></div>                   \t\t\t\t\t</div>                       \t\t\t</td>                       \t\t\t<td>'+t.data.aroundPrice[o].unitPrice+"</td>        \t\t\t\t\t</tr>";i+='<tr>        \t\t\t\t\t\t<td><p class="sur-house-name" title="'+yf.param("housingName")+'">'+yf.param("housingName")+'</p><p>(本小区)</p></td>        \t\t\t\t\t\t<td>--</td>        \t\t\t\t\t\t<td><div class="layui-progress layui-progress-big" lay-showpercent="true">                           \t\t\t \t<div class="layui-progress-bar layui-bg-red" lay-percent="100%"  style="width:'+Math.floor(Number(t.data.additionalInfo.unitPriceSelf)/n*100)+'%" ></div>                   \t\t\t\t\t</div>                       \t\t\t</td>                       \t\t\t<td>'+t.data.additionalInfo.unitPriceSelf+"</td>        \t\t\t\t\t</tr>",$("#surround_list").html(i),layui.use(["element"],function(){layui.element}),e.initMapFn(t.data.additionalInfo,t.data.aroundPrice,a)}else $("#surroundingMap").html('<div class="non-near-map">暂无临近小区分布地图</div>'),$("#surround_list").html('<tr><td colspan="4"><div class="non-near">暂无临近小区信息</div></td></tr>');yf.removeLoading("#neighborhood")}).error(function(t){})},initMapFn:function(t,e,a){for(var n=new AMap.Map("surroundingMap",{resizeEnable:!0}),i=new AMap.InfoWindow({offset:new AMap.Pixel(0,-30)}),r=0;r<a;r++){var o=new AMap.Marker({icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",position:[e[r].XLongitude,e[r].YLatitude],map:n});o.content=e[r].residentialAreaName,o.on("mouseover",function(t){i.setContent(t.target.content),i.open(n,t.target.getPosition())})}var s=new AMap.Marker({icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",position:[t.XLongitude,t.YLatitude],map:n});s.content=yf.param("housingName"),s.on("mouseover",function(t){i.setContent(t.target.content),i.open(n,t.target.getPosition())}),s.emit("mouseover",{target:s}),n.setFitView(),$("#surroundingMap").hover(function(){yf.stopMainScroll()},function(){yf.updateMainScroll()})}}).init()});