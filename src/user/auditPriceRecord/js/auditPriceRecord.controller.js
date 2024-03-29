require([
	'src/user/auditPriceRecord/js/auditPriceRecord.server.js',
], function (server) {
	'use strict';

    /**
	 * 核价记录模块
     */
	var main = ({
		init: function () {
			this.startDate = "";
			this.endDate = "";
			this.resTabelFn();//加载核价记录
			this.searchFn();  //查询
			this.resetFn();   //重置
			this.dateInitFn(); //操作日期
			this.buildPriceFn();//新建核价
			this.areaDisPoseFn(); //面积的限制
			layer.closeAll();
			yf.scroll({
				elmId: '#his_evaluate'
			});
			return this;
		},
		/*加载历史数据*/
		resTabelFn: function (cur) {
			var _self = this;
			var params = {
				curCity: yf.userInfo.city,
				queryCity: yf.replaceHtml($('#local_city').val()),
				comName: yf.replaceHtml($('#com_name').val()),
				minArea: $('#min_area').val(),
				maxArea: $('#max_area').val(),
				minDate: yf.replaceHtml($('#begin_date').val()),
				maxDate: yf.replaceHtml($('#end_date').val()),
				pageNo: cur || 1,//当前页
				pageSize: 10  //每页10条
			};
			var iTip = layer.load(2, { shade: [0.1, '#000'] });
			server.getTableList(params).success(function (data) {
				layer.close(iTip);
				if (data.code == 200) {
					var str = "";
					if (data.data.list.length > 0) {
						for (var i = 0; i < data.data.list.length; i++) {
							str += '<tr>\
								 <td width="80" class="text-center">'+ yf.filterStr(data.data.list[i].guJiaChengShi) + '</td>\
								 <td width="260">\
									 <p>'+ yf.filterStr(data.data.list[i].guJiaDuiXiang) + '</p>\
									 <p>'+ yf.filterStr(data.data.list[i].tiJiaoShiJian) + '</p>\
								 </td>\
								 <td width="160">\
									 <p>审核总价：<span class="c-red">'+ yf.filterStr(data.data.list[i].shenHeZongJia) + '</span>万元</p>\
									 <p>审核单价：<span class="c-red">'+ yf.filterStr(data.data.list[i].shenHeDanJia) + '</span>元/㎡</p>\
								 </td>\
								 <td width="120">\
									 <p>面积：<span class="c-red">'+ yf.filterStr(data.data.list[i].jianZhuMianJi) + '</span>㎡</p>\
									 <p>朝向：<span>'+ yf.filterStr(data.data.list[i].fangWuChaoXiang) + '</span></p>\
								 </td>\
								 <td width="120">\
									 <p>总楼层：'+ yf.filterStr(data.data.list[i].zongLouCeng) + '层</p>\
									 <p>所在层：'+ yf.filterStr(data.data.list[i].suoZaiLouCeng) + '层</p>\
								 </td>\
								 <td width="80"><a class="c-blue" href="./chatServer.html?bussinessID='+ data.data.list[i].bussinessID + '&recordID=' + data.data.list[i].id + '&type=logs" target="_blank">'
							str += data.data.list[i].weiDuXiaoXiTiaoShu > 0 ? '新消息<span class="msg-red-point">' + (data.data.list[i].weiDuXiaoXiTiaoShu > 99 ? '99+' : data.data.list[i].weiDuXiaoXiTiaoShu) + '</span>' : '消息记录';
							str += '</a></td></tr>';
						}
						$('#his_detatil').html(str);
						$("#his_detatil tr:odd").css("background", "#f9f9f9");
						_self.detailsFn();
						_self.pageFn('queryLogsPage', data.data.pageNum, data.data.total, "resTabelFn");

					} else {
						$('#his_detatil').html('<tr class="text-center"><td colspan="6">暂无数据</td></tr>');
					}

				} else {
					$('#queryLogsPage').html('');
					$('#his_detatil').html('<tr class="text-center"><td colspan="6">暂无数据</td></tr>');
					if (data.code == 403) {
						$('#detail_search,#detail_reset,#built_price').addClass('layui-btn-disabled');
						layer.msg(data.msg, { time: 3000 }, function () {
							window.location.href = "#/layout?page=intelligentSearch";
						});
					}

				}
			}).error(function (e) {
				layer.close(iTip);
			})

		},
		/*查看消息记录*/
		detailsFn: function () {
			var _this = this;
			$('#his_detatil tr td').find('a').unbind('click').bind('click', function () {
				if ($(this).text().indexOf('新消息') != -1) {
					$(this).text('消息记录');
				};

			})
		},
		/*条件查询*/
		searchFn: function () {
			var _this = this;
			var specilReg = /[~#^$@%&！!*]/;
			$('#detail_search').click(function () {
				if ($('#detail_search').hasClass('layui-btn-disabled')) return;
				var flag1 = true, flag2 = true;
				var minArea = $('#min_area').val();
				var maxArea = $('#max_area').val();
				if ($('#com_name').val() != '' && specilReg.test($('#com_name').val())) {
					layer.tips('核价对象不能有特殊符号', '#com_name', { tips: [2, '#666'] });
					return;
				}
				if ($('#local_city').val() != '' && specilReg.test($('#local_city').val())) {
					layer.tips('城市不能有特殊符号', '#local_city', { tips: [2, '#666'] });
					return;
				}

				if (minArea != '') {
					flag1 = _this.limitAreaFn('#min_area');
				};
				if (maxArea != '') {
					flag2 = _this.limitAreaFn('#max_area');
				};
				if (flag1 && flag2) {
					if (minArea != '' && maxArea != '') {
						if (Number(minArea) > Number(maxArea)) {
							//当小面积大于大面积的时候
							$('#min_area').val(maxArea);
							$('#max_area').val(minArea);
						}
					}
					_this.resTabelFn();
				}
			});
		},
		/*重置*/
		resetFn: function () {
			var _this = this;
			$('#detail_reset').click(function () {
				if ($('#detail_reset').hasClass('layui-btn-disabled')) return;
				$('#detail_record').find('input').val('');
				_this.endDate.config.min.year = _this.startDate.config.min.year;
				_this.endDate.config.min.month = _this.startDate.config.min.month;
				_this.endDate.config.min.date = _this.startDate.config.min.date;
				_this.startDate.config.max.year = _this.endDate.config.max.year;
				_this.startDate.config.max.month = _this.endDate.config.max.month;
				_this.startDate.config.max.date = _this.endDate.config.max.date;
				// 重置完重新请求数据
				_this.resTabelFn();
				yf.placeholder();
			});
		},
        /**分页(params)
         *id:当前分页的容器
         *curr:当前页码
         *total:总数
         *callback:回掉函数
         **/
		pageFn: function (id, curr, total, callBack) {
			var _self = this;
			if (!this.layPage) {
				layui.use(['laypage'], function () {
					_self.layPage = layui.laypage;
					_self.page(id, curr, total, callBack);
				});
			} else {
				_self.page(id, curr, total, callBack);
			}
		},
		page: function (id, curr, total, callBack) {
			var _self = this;
			this.layPage.render({
				elem: id, //注意，这里的 test1 是 ID，不用加 # 号
				curr: curr || 1,
				count: total,
				limit: 10,            //每页显示的条数
				layout: ['prev', 'page', 'next', 'skip', 'count'],
				jump: function (obj, first) {
					if (!first) {
						//_self[callBack].apply(_self,[obj.curr]);
						_self[callBack](obj.curr);
					}
				}
			});
		},
		/*日期操作*/
		dateInitFn: function () {
			var _this = this;
			layui.use(['laydate'], function () {
				//开始日期 结束日期
				_this.startDate = layui.laydate.render({
					elem: '#begin_date',
					max: 0,
					done: function (value, date) {
						if (value !== '') {
							_this.endDate.config.min.year = date.year;
							_this.endDate.config.min.month = date.month - 1;
							_this.endDate.config.min.date = date.date;
						} else {
							_this.endDate.config.min.year = _this.startDate.config.min.year;
							_this.endDate.config.min.month = _this.startDate.config.min.month;
							_this.endDate.config.min.date = _this.startDate.config.min.date;
						}
					}
				});
				_this.endDate = layui.laydate.render({
					elem: '#end_date',
					max: 0,
					done: function (value, date) {
						if (value !== '') {
							_this.startDate.config.max.year = date.year;
							_this.startDate.config.max.month = date.month - 1;
							_this.startDate.config.max.date = date.date;
						} else {
							//选择清空按钮
							_this.startDate.config.max.year = _this.endDate.config.max.year;
							_this.startDate.config.max.month = _this.endDate.config.max.month;
							_this.startDate.config.max.date = _this.endDate.config.max.date;
						}
					}

				});

			})
		},
		/*新建核价*/
		buildPriceFn: function () {
			$('#built_price').unbind('click').bind('click', function () {
				if ($('#built_price').hasClass('layui-btn-disabled')) return;
				yf.path.load("#auditPriceRecord", {
					controllerUrl: 'src/components/artificialNuclearValence/js/artificialNuclearValence.controller.js',
					templateUrl: 'src/components/artificialNuclearValence/artificialNuclearValence.html',
					reload: true
				});
			})

		},
		/*面积的限制*/
		areaDisPoseFn: function () {
			var _this = this;
			$('#min_area').keyup(function () {
				_this.limitAreaFn('#min_area');
			});
			$('#max_area').keyup(function () {
				_this.limitAreaFn('#max_area');
			});
		},
		limitAreaFn: function (id) {
			var area = $(id).val().replace(/\s+/g, '');
			var flag = true;
			if (area == '') return flag;
			if (!/^(([1-9]\d{0,3}(\.\d{0,2})?)|9999)$/.test(area) || area > 9998.99) {
				$(id).val(area.length >= 4 ? area.substr(0, 4) : area.substr(area.length - 1));
				layer.tips("请输入面积为1~9998.99，只留两位小数！", id, { tips: [2, '#666'] });
				flag = false;
				return flag;
			}
			return flag;
		}
	}).init();




});
