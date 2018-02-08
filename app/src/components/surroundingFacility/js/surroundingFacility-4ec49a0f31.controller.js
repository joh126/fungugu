require(["src/components/surroundingFacility/js/surroundingFacility-a569bc06c9.server.js"],function(a){"use strict";({init:function(){this.rimMap,this.detailMap,this.coordinate={},this.searchName="公交",this.placeSearch,this.changeMapFn(),this.initMapFn(),this.obtainLocationFn(),this.searchDetailFn(),yf.scroll({elmId:"#result_grounbs",height:"270px"})},initMapFn:function(){this.retractFn("#basic_facts"),this.retractFn("#detail_facts"),this.rimMap=new AMap.Map("rimMap",{resizeEnable:!0}),this.detailMap=new AMap.Map("detailMap",{resizeEnable:!0}),$("#rimMap,#peripheralDetails").hover(function(){yf.stopMainScroll()},function(){yf.updateMainScroll()})},retractFn:function(a){$(a).find(".switch-btn").off("click").click(function(){var t=$(this);"收起"==$(this).text()?$(a).stop(!0,!1).animate({right:"-34%"},500,function(){t.text("展开")}):$(a).stop(!0,!1).animate({right:"0"},500,function(){t.text("收起")})})},obtainLocationFn:function(){var t=this,i={districtName:yf.$params().istrative,comName:yf.$params().housingName};yf.loading("#peripheralFactss"),a.getComLocation(i).success(function(a){if(200!=a.code)return $("#basisc_transit,#basisc_rail,#basisc_medical,#basisc_educate").text("暂无数据"),void yf.removeLoading("#peripheralFactss");t.coordinate={longitude:a.data.xAmap,latitude:a.data.yAmap},new AMap.Marker({position:[a.data.xAmap,a.data.yAmap],map:t.rimMap}),t.rimMap.setFitView(),t.obtainInfoFn(t.coordinate),t.surDetailFn()})},obtainInfoFn:function(t){var i=this;a.getSurvey(t).success(function(a){yf.removeLoading("#peripheralFactss"),200==a.code?(i.loopDataFn("#basisc_transit",a.data.busStop),i.loopDataFn("#basisc_rail",a.data.metroStation),i.loopDataFn("#basisc_medical",a.data.hospital),i.loopDataFn("#basisc_educate",a.data.school)):$("#basisc_transit,#basisc_rail,#basisc_medical,#basisc_educate").text("暂无数据")})},loopDataFn:function(a,t){if(t.length){for(var i="",e=2*Math.ceil($(a).width()/14),n=0;n<t.length;n++)i+=t[n].name+";";$(a).attr("title",i),i.length>e?$(a).html(i.substring(0,e)+"..."):$(a).html(i)}else $(a).text("附近暂无该设施")},changeMapFn:function(){$("#surf_map_btn").click(function(){"查看周边详情"==$(this).text()?($(this).text("返回周边概况"),$("#surf_caption").text("小区周边详情"),$("#peripheralFactss").hide()):($(this).text("查看周边详情"),$("#surf_caption").text("小区周边概况"),$("#peripheralFactss").show())})},surDetailFn:function(){$("#result_gather").html("");var a=this;a.detailMap.clearMap(),a.placeSearch?(a.placeSearch.clear(),a.placeSearch.O.pageIndex=1,a.placeSearch.searchNearBy(a.searchName,[a.coordinate.longitude,a.coordinate.latitude],1e3,function(a,t){})):AMap.service(["AMap.PlaceSearch"],function(){a.placeSearch=new AMap.PlaceSearch({pageSize:5,pageIndex:1,map:a.detailMap,panel:"result_gather"}),a.placeSearch.searchNearBy(a.searchName,[a.coordinate.longitude,a.coordinate.latitude],1e3,function(a,t){})})},searchDetailFn:function(){var a=this,t=$("#detailMenu").find(".item");$("#result_come").html(yf.$params().housingName+"周边配套"),t.each(function(t,i){$(i).off("click").on("click",function(){a.searchName=$(this).find("a>p.name").text(),a.surDetailFn(),a.showReaultFn()})})},showReaultFn:function(){$("#result_map").css("right","0"),$("#back_map_result").off("click").click(function(){$("#result_gather").html(""),$("#result_map").css("right","-100%")})}}).init()});