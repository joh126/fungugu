define(function(){"use strict";var e=e||{getHouseDetail:function(e){return $.ajax({type:"get",url:"/api/v1/communityDetails/comDetails/"+encodeURIComponent(e.city)+"/"+encodeURIComponent(e.comName)})}};return e});