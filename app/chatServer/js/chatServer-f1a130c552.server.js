define(function(){"use strict";var e=e||{sendMsg:function(e){var t={cityName:yf.getItem("userInfo").city,bussinessId:e.bussinessId,msgType:e.msgType,sendTime:e.sendTime,msgContent:e.msgContent};return $.ajax({type:"post",data:t,dataType:"json",url:"/api/v1/artificialNuclearValence/msgSend"})},queryMsgLogs:function(e){var t={positionNo:e.positionNo,rqNums:e.rqNums};return $.ajax({type:"get",data:t,dataType:"json",url:"/api/v1/artificialNuclearValence/"+yf.getItem("userInfo").city+"/"+e.sessionId+"/mqmRecordsGet"})},getOjbectList:function(){return $.ajax({type:"get",dataType:"json",async:!1,url:"/api/v1/artificialNuclearValence/"+yf.getItem("userInfo").city+"/mqRecordsByDay"})},isExistLog:function(e){return $.ajax({type:"get",dataType:"json",url:"/api/v1/artificialNuclearValence/mqRecordsDetail/"+yf.getItem("userInfo").city+"/"+e.sessionId})},wsAppKeyGet:function(){return $.ajax({type:"get",dataType:"json",async:!1,url:"/api/v1/artificialNuclearValence/"+yf.getItem("userInfo").city+"/wsAppKeyGet"})},activationRecord:function(e){var t={bussinessId:e.bussinessId,cityName:yf.getItem("userInfo").city};return $.ajax({type:"post",data:t,dataType:"json",async:!1,url:"/api/v1/artificialNuclearValence/activationRecord"})}};return e});