define(function(){"use strict";var t=t||{getSurvey:function(t){return $.ajax({type:"get",url:"/api/v1/peripheralMatching/infoGet",dataType:"json",data:{cityName:yf.userInfo.city,longitude:t.longitude,latitude:t.latitude}})},getComLocation:function(t){return $.ajax({type:"get",url:"/api/v1/communityDetails/coordinateGet",dataType:"json",data:{cityName:yf.userInfo.city,districtName:t.districtName,comName:t.comName}})}};return t});