define(function(){"use strict";var e=e||{getTableList:function(e){return $.ajax({type:"get",url:"/api/v1/valuation/records?"+(new Date).getTime(),dataType:"json",data:e})},getLocalRecord:function(e){return $.ajax({type:"get",url:"/api/v1/valuation/records/detail/"+e,dataType:"json"})},getExcelExport:function(e){return $.ajax({type:"get",url:"/api/v1/valuation/records/export",data:e})},getMechanisms:function(e){return $.ajax({type:"get",url:"/api/v1/jurisdictionManagement/lowerLevelGet",data:{moduleName:e.moduleName,selectCity:e.selectCity||"",cityName:yf.userInfo.city}})}};return e});