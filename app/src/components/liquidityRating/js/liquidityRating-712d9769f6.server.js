define(function(){"use strict";var e=e||{getRateFn:function(e){return $.ajax({type:"get",url:"/api/v1/CommunityRatingController/"+encodeURIComponent(e.city)+"/"+encodeURIComponent(e.distName)+"/"+encodeURIComponent(e.comName)})}};return e});