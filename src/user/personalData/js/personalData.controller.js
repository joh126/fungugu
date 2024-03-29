require([
	'src/user/personalData/js/personalData.server.js',
], function (server) {
	'use strict';
	var main = ({
		init: function () {
			this.gainDataFn(); //页面上文本框中的值
			this.gainInfoFn(); //获取个人信息
			this.updatePopFn(); //修改密码弹窗
			this.subUserInfoFn(); //提交个人信息
			this.updatePwdFn(); //修改密码
			this.cityListArr = []; //缓存城市、行政区

			this.gainPhoneFn(); //手机验证
			this.havePhoneNum = false; //是否有手机号码
			this.oldPhone = ''; //旧号码
			this.moreOutfitFn();//更多的操作
			this.gainShareNumFn(1);//获取共享机构条数
			return this;
		},
		/*获取个人信息*/
		gainInfoFn: function () {
			var _this = this;
			server.getPersonalInfo().success(function (data) {
				if (!yf.msg(data)) return;
				if (data.success) {
					var userInfo = data.data.userInfo;
					var maxNum = _this.countMax(data.data.trend.counts); //询价最大值
					$('#userct_name').text(userInfo.userAccount);
					$('#person_surplus').html(yf.filterStr(data.data.valuationStatistics.personalUseTimes) + '条'); //个人剩余估值
					//如果是包年的用户，机构剩余条数不显示
					if (data.data.valuationStatistics.mechanismSurplusTimes !== '') $('#mechanism_count').removeClass('hide');
					$('#mechanism_surplus').html(yf.filterStr(data.data.valuationStatistics.mechanismSurplusTimes) + '条'); //机构剩余估值
					_this.inquiryFn(data.data.trend.months, data.data.trend.counts, maxNum); //询价走势图

					_this.userName.val(userInfo.userName); //姓名
					_this.userLoginName.val(userInfo.userAccount); //用户名
					userInfo.userSex != '' ? $("input[name='sex'][value='" + userInfo.userSex + "']").attr("checked", true) :
						$("input[name='sex'][value='男']").attr("checked", true) //性别
					_this.email.val(userInfo.userMail); //邮箱
					_this.phone.val(userInfo.userPhone); //手机
					_this.oldPhone = userInfo.userPhone;
					_this.outFit.val(userInfo.userMechanism); //机构
					_this.branch.val(userInfo.userDepartment); //部门
					_this.job.val(userInfo.jobPosition); //职业
					_this.addr.val(userInfo.userAddress); //地址
					$('#user_expire').html(yf.filterStr(userInfo.accountExpirationDate));//到期日期
					//性别的处理
					$('#sex_man').addClass('visib');
					if (userInfo.userSex == '女') {
						$('#sex_man').hide();
						$('#sex_woman').removeClass('hide').addClass('visib');
					};
					//客户所在城市、行政区的处理
					_this.cityLinkageFn(data.data.cityList, userInfo.ubietyCity, userInfo.ubietyDistrict);
					//客户是否有手机号
					//userInfo.userPhone != '' ? $('#prov_phone').text('更改手机号') : _this.havePhoneNum = true;
					if (userInfo.userPhone != '') {
						$('#prov_phone').text('更改手机号');
						$('#user_uPhone').attr('disabled', 'disabled');
					} else {
						_this.havePhoneNum = true;
					}
				}

			}).error(function () { })
		},
		/*修改密码弹窗*/
		updatePopFn: function () {
			$('#updatePass').off('click').click(function () {
				layer.open({
					area: ['auto', 'auto'],
					type: 1,
					closeBtn: false,
					title: false,
					shade: [.6, '#000'],
					resize: false,
					content: $("#update_major"),
					success: function () {
						//清空输入框中的值
						$("#update_major input").val('');
					},
					end: function () {
						$("#update_major").hide();
					}

				})
			})
		},
		/*折线图数据较小的时候的处理*/
		countMax: function (arr) {
			var max = Math.max.apply(null, arr);
			if (max == 0 || max < 10) {
				max = 20
			} else {
				max = null
			}
			return max;
		},
		/*价格走势图表
		 *params(x:横坐标;月份，data:询价量，max：y轴的最大值，防止没数据的时候图表难看)
		 * */
		inquiryFn: function (x, data, max) {
			var zsChart = echarts.init(document.getElementById('inquiry_line'));
			var option = {
				tooltip: {
					trigger: 'axis',
					formatter: "{b}<br/>{a}：{c}"
				},
				grid: {
					y: 30,
					height: 180,
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: x
				},
				yAxis: {
					type: "value",
					max: max
				},
				series: {
					itemStyle: {
						normal: {
							color: "#92b8ce"
						}
					},
					name: '询价',
					type: "line",
					areaStyle: {
						normal: {}
					},
					data: data
				}
			};
			zsChart.setOption(option);
			$(window).resize(function () {
				zsChart.resize();
			});
		},
		/*提交信息*/
		subUserInfoFn: function () {
			var _this = this;
			$("#subInfo").off('click').click(function () {
				if (_this.checkRegFn()) {
					//var i=layer.load(2, {shade: [0.1,'#000']});
					yf.loading('#updateUserInfo');
					var params = {
						userName: _this.userName.val(),
						userSex: $('input:radio[name="sex"]:checked').val(),
						userDepartment: _this.branch.val(),
						jobPosition: _this.job.val(),
						ubietyCity: $('#user_cur_city').siblings('.layui-form-select').find('.layui-unselect').val() || '', //当前城市
						ubietyDistrict: $('#user_cur_district').siblings('.layui-form-select').find('.layui-unselect').val() || '', //当前行政区
						userAddress: _this.addr.val(),
						userPhone: _this.phone.val(),
						smsCode: $('#phoneYzm').val(),
						userMail: _this.email.val(),
						cityName: yf.userInfo.city
					};
					//判断是否是修改过了的号码
					if (!$('#phone_step3').hasClass('hide')) {
						params.userPhone = $('#newPhone').val();
					}
					server.subUserInfo(params).success(function (data) {
						if (data.success) {
							layer.msg('修改个人信息成功');
							//重置信息
							$('#phone_step3,#phone_step2').addClass('hide');
							$('#phone_step1').show();
							$('#newPhone,#phoneYzm,#yzm_code').val('');
							if ($('input:radio[name="sex"]:checked').val() == '女') {
								$('#sex_man').hide();
								$('#sex_woman').show().removeClass('hide').addClass('visib');
							} else {
								$('#sex_woman').hide();
								$('#sex_man').show().removeClass('hide').addClass('visib');
							};
							$('#changenImgCode').trigger('click');
							_this.gainInfoFn();

						} else {
							layer.msg(data.msg);
						}
						yf.removeLoading('#updateUserInfo');
					})
				}
			});
		},
		/*正则验证需要修改的信息*/
		checkRegFn: function () {
			var flag = true;
			var _this = this;
			if (this.userName.val() == "" || $.trim(_this.userName.val()) == '') {
				layer.tips('姓名不能为空', _this.userName, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			};
			if (_this.regs.sepReg.test(_this.userName.val())) {
				layer.tips('姓名不能有特殊字符', _this.userName, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (this.email.val() != '' && !_this.regs.email.test(_this.email.val())) {
				layer.tips('请输入正确的邮箱地址', _this.email, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (this.phone.val() == '' || $.trim(_this.phone.val()) == '') {
				layer.tips('请输入手机号码', _this.phone, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			};
			if (!_this.regs.phone.test(_this.phone.val())) {
				layer.tips('请输入正确的手机号码', _this.phone, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			};
			if (this.oldPhone != '' && this.oldPhone != this.phone.val()) {
				layer.tips('请先验证手机号码', _this.phone, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}

			if (this.branch.val() != '' && _this.regs.sepReg.test(_this.branch.val())) {
				layer.tips('部门不能有特殊字符', _this.branch, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (this.job.val() != '' && _this.regs.sepReg.test(_this.job.val())) {
				layer.tips('职业不能有特殊字符', _this.job, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (!$('#phone_step2').hasClass('hide')) {
				if ($('#yzm_code').val() == '' || $.trim($('#yzm_code').val()) == '') {
					layer.tips('请输入图片验证码', '#yzm_code', {
						tips: [1, '#666']
					});
					flag = false;
					return;
				}
			}
			if (!$('#phone_step3').hasClass('hide')) {
				if ($('#phoneYzm').val() == '' || $.trim($('#phoneYzm').val()) == '') {
					layer.tips('短信验证码不能为空', '#phoneYzm', {
						tips: [1, '#666']
					});
					flag = false;
					return;
				}
			}

			if (this.addr.val() != '' && _this.regs.sepReg.test(_this.addr.val())) {
				layer.tips('地址不能有特殊字符', _this.addr, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			return flag;
		},
		/*获取当前页面文本域的值*/
		gainDataFn: function () {
			//$('input:radio[name="sex"]:checked').val();性别
			this.regs = {
				sepReg: /[~#^$@%&！!*]/, //特殊字符
				emptyReg: /\s+/g, //空格
				phone: /^1[3|4|5|7|8][0-9]\d{8}$/, // 手机号码
				email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, // 邮箱地址
				pwd: /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,16}$/ //验证密码                      
			};
			this.userName = $('#user_uName'); //姓名
			this.userLoginName = $('#user_uLoginName'); //用户名
			this.email = $('#user_uEmail'); //邮箱
			this.branch = $('#user_uBranch'); //部门
			this.job = $('#user_uJob'); //职业
			this.addr = $('#user_uAddr'); //地址
			this.outFit = $('#user_uOutfit'); //机构
			this.phone = $('#user_uPhone'); //手机

			this.pwd = $('#oldPwd'); //旧密码
			this.newPwd = $('#newPwd'); //新密码
			this.newPwdAgain = $('#newPwdAgain'); //再次输入的密码
		},
		/*修改密码*/
		updatePwdFn: function () {
			var _this = this;
			$('#doUpdate').off('click').click(function () {
				yf.loadFile('src/content/js/third/md5/md5.js', function () {
					if (_this.checkPwdRegFn()) {
						var params = {
							passwdOld: hex_md5(_this.pwd.val()),
							passwdNew: hex_md5(_this.newPwd.val())
						};
						server.updatePwd(params).success(function (data) {
							if (data.success) {
								layer.closeAll();
								layer.msg('密码修改成功！您已修改您的登录密码，请牢记新的密码，以便正常登陆房估估。如有疑问请致电：010-60845501', {
									time: 0,
									btn: ['知道了']
								});
							} else {
								layer.tips(data.msg, _this.pwd, {
									tips: [1, '#666']
								});
							}
						});

					}
				})

			})
		},
		/*密码的验证*/
		checkPwdRegFn: function () {
			var flag = true,
				_this = this;
			if (this.pwd.val() == '' || $.trim(_this.pwd.val()) == '') {
				layer.tips('密码不能为空', _this.pwd, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (this.newPwd.val() == '' || $.trim(_this.newPwd.val()) == '') {
				layer.tips('新密码不能为空', _this.newPwd, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (!yf.REGS.PASS_WORLD.test(_this.newPwd.val())) {
				layer.tips('密码长度为8~16位，须为字母、数字和符号两种及以上的组合', _this.newPwd, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (this.newPwdAgain.val() == '' || $.trim(_this.newPwdAgain.val()) == '') {
				layer.tips('确认新密码不能为空', _this.newPwdAgain, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (!yf.REGS.PASS_WORLD.test(_this.newPwdAgain.val())) {
				layer.tips('密码长度为8~16位，须为字母、数字和字符任意两种及以上的组合', _this.newPwdAgain, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			if (this.newPwd.val() != this.newPwdAgain.val()) {
				layer.tips('您两次输入的新密码不一致，请再次确认！', _this.newPwdAgain, {
					tips: [1, '#666']
				});
				flag = false;
				return;
			}
			return flag;
		},
		/*城市、行政区的处理
		 *params(arr:城市列表；curCity：当前城市；curDistrict：当前行政区)
		 * */
		cityLinkageFn: function (arr, curCity, curDistrict) {
			var str = '',
				params = {},
				_this = this;
			this.form;
			for (var i = 0; i < arr.length; i++) {
				str += '<option data-id=' + arr[i].id + ' value=' + arr[i].MingCheng + '>' + arr[i].MingCheng + '</option>'
			};
			$('#user_cur_city').html(str);
			if (curCity) $('#user_cur_city').find("option[value='" + curCity + "']").attr("selected", true);
			//$('#user_cur_district').append('<option selected="selected">'+curDistrict+'</option>');
			//console.log(str);
			//获取当前城市id				
			params.cityId = $("#user_cur_city").find("option:selected").attr('data-id');
			//第一次进入页面的时候，传入行政区
			this.gainDistrictsFn(params, curDistrict);
			layui.use(['form'], function () {
				_this.form = layui.form;
				//form.render('select'); //刷新select选择框渲染
				_this.form.render();
				_this.form.on('select(curCity)', function (data) {
					//得到select原始DOM对象
					params.cityId = $('#user_cur_city').find("option[value='" + data.value + "']").attr('data-id');
					_this.gainDistrictsFn(params);
					//console.log(data.value); //得到被选中的值

				});
			});
		},
		/*获取行政区*/
		gainDistrictsFn: function (params, curDistrict) {
			var str = '';
			var html = '';
			var _this = this;
			//先判断缓存中是否有需要的数据，没有的话在请求
			if (this.cityListArr.length > 0) {
				for (var j = 0; j < this.cityListArr.length; j++) {
					//console.log(this.cityListArr[j]);
					if (params.cityId == this.cityListArr[j].cityId) {
						for (var y = 0; y < this.cityListArr[j].districtList.length; y++) {
							html += '<option value=' + this.cityListArr[j].districtList[y] + '>' + this.cityListArr[j].districtList[y] + '</option>';
						};
						$('#user_cur_district').html(html);
						if (curDistrict) $('#user_cur_district').find("option[value='" + curDistrict + "']").attr("selected", true);
						_this.form.render('select');
						//美化滚动条
						setTimeout(function () {
							_this.glorifyFn();
						}, 50);
						return;
					}
				}

			}

			server.getDistricts(params).success(function (data) {
				if (!yf.msg(data)) return;
				var obj = {
					cityId: '',
					districtList: ''
				}; //缓存数据
				var districtsArr = [];
				for (var i = 0; i < data.data.length; i++) {
					str += '<option value=' + data.data[i] + '>' + data.data[i] + '</option>';
					districtsArr.push(data.data[i]);
				};

				//缓存数据
				obj.cityId = params.cityId;
				obj.districtList = districtsArr;
				_this.cityListArr.push(obj);
				$('#user_cur_district').html(str);
				//第一次进来 如果有行政区 默认选中此项
				if (curDistrict) $('#user_cur_district').find("option[value='" + curDistrict + "']").attr("selected", true);
				_this.form.render('select');
				//美化滚动条
				_this.glorifyFn();
			})
		},
		/*手机验证*/
		gainPhoneFn: function () {
			var _this = this;
			this.resCode;
			$('#changenImgCode').click(function () {
				_this.changeImageCodeFn(); //图片验证码
			});
			$('#prov_phone').off('click').click(function () {
				if (_this.phone.val() == "" || $.trim(_this.phone.val()) == '') {
					layer.tips('请输入手机号码', _this.phone, {
						tips: [1, '#666']
					});
					return;
				};
				if (!_this.regs.phone.test(_this.phone.val())) {
					layer.tips('请输入正确的手机号码', _this.phone, {
						tips: [1, '#666']
					});
					return;
				};

				$('#phone_step1').hide();
				$('#phone_step2').removeClass('hide');
				_this.changeImageCodeFn(); //图片验证码

				$('#verityCode').off('click').click(function () {
					var code = $('#yzm_code').val();
					if ($('#yzm_code').val() == "" || $.trim($('#yzm_code').val()) == '') {
						layer.tips('请输入图片验证码', '#yzm_code', {
							tips: [1, '#666']
						});
						return;
					}

					if (_this.havePhoneNum) {
						//如果是新用户，则不需要输入新号码
						$('#newPhone').val(_this.phone.val());
						$('#newPhone').attr('disabled', 'disabled');
					};
					server.provYzm(code).success(function (data) {
						if (data.success) {
							_this.resCode = data.data;
							$('#phone_step2').hide();
							$('#phone_step3').removeClass('hide');
							_this.gainPhoneCodeFn(data.data);
						} else {
							layer.tips('图片验证码错误', '#yzm_code', {
								tips: [1, '#666']
							});
						}
					})
				})
			});
		},
		/*获取手机验证码*/
		gainPhoneCodeFn: function (keyCode) {
			var _this = this;

			$('#sendYzm').off('click').click(function () {
				if ($(this).hasClass('disable')) return;
				if ($('#newPhone').val() == '' || $.trim($('#newPhone').val()) == '') {
					layer.tips('请输入手机号码', '#newPhone', {
						tips: [1, '#666']
					});
					return;
				};
				if (!_this.regs.phone.test($('#newPhone').val())) {
					layer.tips('请输入正确的手机号码', '#newPhone', {
						tips: [1, '#666']
					});
					return;
				};
				//如果不是新用户则需要验证新旧号码是否一样
				if (!_this.havePhoneNum && _this.oldPhone == $('#newPhone').val()) {
					layer.tips('新手机号码不能与旧手机号码一致', '#newPhone', {
						tips: [1, '#666']
					});
					return;
				};
				var params = {
					phoneNum: $('#newPhone').val(),
					keyCode: keyCode
				};
				server.getPhoneCode(params).success(function (data) {
					if (data.success) {
						//倒计时
						yf._timer('#sendYzm', 60);
						/*$('#phone_step2').hide();
						$('#phone_step3').removeClass('hide');*/
					} else {
						layer.tips(data.msg, '#phoneYzm', {
							tips: [1, '#666']
						});
					}

				})
			})

		},
		/*换一张图片验证码*/
		changeImageCodeFn: function () {
			$('#img_code').attr('src', '/api/v1/imageCodeService/refreshPicCode?' + new Date().getTime());
		},
		/*禁止滚动*/
		banScrollFn: function (sId) {
			$(sId).hover(function () {
				yf.stopMainScroll();
			}, function () {
				yf.updateMainScroll();
			});
		},
		/*美化区域选项的滚动条*/
		glorifyFn: function () {
			var _this = this;
			var sId = $('#user_cur_city').siblings('.layui-unselect').find('.layui-anim');
			var sDist = $('#user_cur_district').siblings('.layui-unselect').find('.layui-anim');
			yf.scroll({ elmId: sId, 'height': 'auto' });
			yf.scroll({ elmId: sDist, 'height': 'auto' });
			this.autoHeightFn();
			$(window).resize(function () {
				_this.autoHeightFn();
			});
			//在选项滚动区域滚动的时候 禁止掉最外层的滚动
			this.banScrollFn(sId);
			this.banScrollFn(sDist);
		},
		/*解决大屏下select显示不全的情况*/
		autoHeightFn: function () {
			var oH = $(window).height();
			if (oH >= 800) $('#user_info').height(oH + 'px');
		},
		/*点击更多展示右边列表*/
		moreOutfitFn: function () {
			var _this = this;
			$('#more_outfit').click(function () {
				$('#inquiry_line').css({ marginTop: '-232px' });
				$(this).addClass('defalt');
			});
			$('#outfit_back').click(function () {
				$('#inquiry_line').css({ marginTop: '0' });
				$('#more_outfit').removeClass('defalt');
			})
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
				limit: 5,            //每页显示的条数
				layout: ['prev', 'page', 'next', 'count'],
				jump: function (obj, first) {
					if (!first) {
						//console.log(callBack);
						_self[callBack](obj.curr);
					}
				}
			});
		},
		gainShareNumFn: function (cur) {
			var param = {
				pageNo: cur || 1,
				pageSize: 5,
				cityName: yf.userInfo.city
			};
			var _this = this;
			server.getValuationSharing(param).success(function (data) {
				if (data.success) {
					var str = '';
					$('#more_outfit').removeClass('hide');
					if (data.data.list.length > 0) {
						for (var i = 0; i < data.data.list.length; i++) {
							str += '<li>共享给<span class="c-orange">' + data.data.list[i].mechaismName + '</span>附属机构<span class="c-orange">' + data.data.list[i].sharingConunt + '</span>条询价</li>'
						}
						$('#outfitList').html(str);
					}
					_this.pageFn('outfitPages', data.data.pageNum, data.data.total, "gainShareNumFn");
				}
			})
		}
	}).init();

})