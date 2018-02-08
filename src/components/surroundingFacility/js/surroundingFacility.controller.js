require([
	'src/components/surroundingFacility/js/surroundingFacility.server.js',
], function(server) {
	'use strict';
	var main = ({
		init: function() {
			this.rimMap; //周边概况地图
			this.detailMap; //周边详情地图
			this.coordinate = {}; //当前小区坐标
			this.searchName='公交'; //周边详情地图默认展示公交线路
			this.placeSearch;
			this.changeMapFn();
			this.initMapFn();
			this.obtainLocationFn();
			this.searchDetailFn();
			yf.scroll({
				elmId: '#result_grounbs',
				'height': '270px'
			});
		},
		initMapFn: function() {
			this.retractFn('#basic_facts');
			this.retractFn('#detail_facts');
			this.rimMap = new AMap.Map('rimMap', {
				resizeEnable: true
			});
			this.detailMap = new AMap.Map('detailMap', {
				resizeEnable: true
			});
			$('#peripheralFactss,#peripheralDetails').hover(function() {
				yf.stopMainScroll();
			}, function() {
				yf.updateMainScroll();
			});
		},
		/*展开收起*/
		retractFn: function(id) {
			var elem = $(id).find('.switch-btn');
			elem.off('click').click(function() {
				var _sel = $(this);
				if($(this).text() == '收起') {
					$(id).stop(true, false).animate({
						'right': '-34%'
					}, 500, function(){
						_sel.text('展开');
					});
				} else {
					$(id).stop(true, false).animate({
						'right': '0'
					}, 500, function(){
						_sel.text('收起');
					});
				}
			});
		},
		/*获取坐标*/
		obtainLocationFn: function() {
			var _this = this;
			var params = {
				districtName: yf.$params().istrative,
				comName: yf.$params().housingName
			};
			yf.loading('#peripheralFactss');
			server.getComLocation(params).success(function(data) {
				if(data.code != 200) {
					$('#basisc_transit,#basisc_rail,#basisc_medical,#basisc_educate').text('暂无数据');
					yf.removeLoading('#peripheralFactss');
					return;
				};
				_this.coordinate = {
					longitude: data.data.xAmap,
					latitude: data.data.yAmap
				};
				new AMap.Marker({
					position: [data.data.xAmap, data.data.yAmap],
					map: _this.rimMap
				});
				_this.rimMap.setFitView();
				_this.obtainInfoFn(_this.coordinate);
				_this.surDetailFn();

			})
		},
		/*获取概况右边信息*/
		obtainInfoFn: function(params) {
			var _this = this;
			server.getSurvey(params).success(function(data) {
				yf.removeLoading('#peripheralFactss');
				if(data.code != 200) {
					$('#basisc_transit,#basisc_rail,#basisc_medical,#basisc_educate').text('暂无数据');
					return;
				};
				_this.loopDataFn('#basisc_transit', data.data.busStop);
				_this.loopDataFn('#basisc_rail', data.data.metroStation);
				_this.loopDataFn('#basisc_medical', data.data.hospital);
				_this.loopDataFn('#basisc_educate', data.data.school);

			})
		},
		loopDataFn: function(id, arr) {
			if(!arr.length){
				$(id).text('附近暂无该设施');
				return;
			}
			var str = '';
			var num = Math.ceil($(id).width() / 14) * 2;
			for(var i = 0; i < arr.length; i++) {
				str += arr[i].name + ';'
			};
			$(id).attr('title', str);
			if(str.length > num) {
				$(id).html(str.substring(0, num) + '...');
			} else {
				$(id).html(str);
			}

		},
		/*切换地图*/
		changeMapFn: function() {
			$('#surf_map_btn').click(function() {
				if($(this).text() == "查看周边详情") {
					$(this).text('返回周边概况')
					$('#surf_caption').text('小区周边详情');
					$('#peripheralFactss').hide();
				} else {
					$(this).text('查看周边详情');
					$('#surf_caption').text('小区周边概况');
					$('#peripheralFactss').show();
				}
			})
		},
		/*周边详情地图操作*/
		surDetailFn: function() {
			$('#result_gather').html('');
			var _this = this;
			_this.detailMap.clearMap();//清除地图上的覆盖物
			//this.detailMap.setCity(yf.userInfo.city);
			if(_this.placeSearch) {
				_this.placeSearch.clear();
				_this.placeSearch.O.pageIndex = 1;
				_this.placeSearch.searchNearBy(_this.searchName, [_this.coordinate.longitude, _this.coordinate.latitude], 1000, function(status, result) {
						
				});
				//console.log(_this.searchName)
			}else{
				AMap.service(["AMap.PlaceSearch"], function() {
					_this.placeSearch = new AMap.PlaceSearch({
						pageSize: 5,
						pageIndex: 1,
						map: _this.detailMap,
						panel: 'result_gather'
					});
					_this.placeSearch.searchNearBy(_this.searchName, [_this.coordinate.longitude, _this.coordinate.latitude], 1000, function(status, result) {
	
					});
				})
			}
		},
		/*周边详情地图上的操作*/
		searchDetailFn: function() {
			var _this = this;
			var aLis = $('#detailMenu').find('.item');
			$('#result_come').html(yf.$params().housingName + '周边配套');
			aLis.each(function(idx, elms) {
				$(elms).off('click').on('click', function() {
					_this.searchName = $(this).find('a>p.name').text();
					_this.surDetailFn();
					_this.showReaultFn();
				});
			});
		},
		showReaultFn: function() {
			$('#result_map').css('right', '0');
			$('#back_map_result').off('click').click(function() {
				//需要清空结果集
				$('#result_gather').html('');
				$('#result_map').css('right', '-100%');
			})
		}
	}).init()
})