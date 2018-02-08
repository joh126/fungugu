define(function() {
    'use strict';
   	 var flowRateServer= flowRateServer||{
   	 	/*小区评级*/
   	 	getRateFn:function(data){
   	 		return $.ajax({
	   	 			type:"get",
	   	 			url:"/api/v1/CommunityRatingController/"+encodeURIComponent(data.city)+"/"+encodeURIComponent(data.distName)+"/"+encodeURIComponent(data.comName)
   	 		});
   	 	}
   	 }
   	 return flowRateServer;
});