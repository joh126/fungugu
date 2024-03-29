require([
    'chatServer/js/chatServer.server.js',
    'chatServer/js/ajaxfileupload.js',
], function (chatServer) {
    'use strict';

    //消息闪烁提醒
    ; (function ($) {
        $.extend({
            /**
             * 调用方法： var timerArr = $.blinkTitle.show();
            * $.blinkTitle.clear(timerArr);
            */
            blinkTitle: {
                show: function () { //有新消息时在title处闪烁提示
                    var step = 0, _title = document.title;
                    var timer = setInterval(function () {
                        step++;
                        if (step == 3) {
                            step = 1
                        }
                        if (step == 1) {
                            document.title = '【　　　】' + _title
                        }
                        if (step == 2) {
                            document.title = '【新消息】' + _title
                        }
                    }, 500);
                    return [timer, _title];
                },
                /**
                 * @param timerArr[0], timer标记
                *  @param timerArr[1], 初始的title文本内容
                */
                clear: function (timerArr) {
                    //去除闪烁提示，恢复初始title文本
                    if (timerArr) {
                        clearInterval(timerArr[0]);
                        document.title = timerArr[1];
                    }

                }
            }
        });
    })(jQuery);

    window.yf = {
        setItem: function (key, value) {
            return localStorage.setItem(key, encodeURIComponent(typeof value == "object" ? JSON.stringify(value) : String(value)));
        },
        getItem: function (key) {
            if (typeof decodeURIComponent(localStorage.getItem(key)).match(/\{/)) {
                return JSON.parse(decodeURIComponent(localStorage.getItem(key)));
            }
            return decodeURIComponent(localStorage.getItem(key));
        },
        removeItem: function (key) {
            if (!localStorage.getItem(key)) {
                return false;
            }
            return !localStorage.removeItem(key);
        },
        /**
         * 获取url参数的值
         */
        param: function (name, str) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(str || window.location.href);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        },
        getTime: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            day = day < 10 ? '0' + day : day;
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        },
        /**
         * 截取字符数
         */
        subStr: function (strs, len) {
            return strs != null ? (strs.length <= len ? strs : strs.substring(0, len) + "...") : '';
        }
    };

    var main = ({
        init: function () {
            this.entryCount = true;
            this.oMsgResponse = $('#msgResponse');
            this.aResponseTtems = this.oMsgResponse.find('.response-item');
            this.oMsgTextArea = $('#msgTextArea');
            this.oEnquiry = $('#enquiryList');
            this.oEnquiryList = $('#enquiryList').find('.list').eq(0);
            this.oRequestBtns = $('#requestBtns');
            this.oTextNull = this.oRequestBtns.find('.text-null').eq(0);
            this.oSendBtn = this.oRequestBtns.find('.send').eq(0);
            this.oChangeSendBtn = this.oRequestBtns.find('.send-btn').eq(0);
            this.oSendType = this.oRequestBtns.find('.send-type').eq(0);

            this.showResponseObj = this.oMsgResponse.children('.response-item').not(':hidden');
            // 聊天记录初始分页
            this.positionSize = 1;

            // 根据历史记录中的数据更新当前记录数据信息排序
            this.getCurrentData();
            // 获取核价列表
            this.getDataList();

            // appKey
            this.wsAppKeyGet();

            this.getSetSendMethod();

            this.editMsg();

            this.bindEvents();

            this.scrollBar();

            this.uploadInit();

            // 有消息回复
            this.responseMsg();
        },
        wsAppKeyGet: function () {
            var _this = this;
            chatServer.wsAppKeyGet().success(function (data) {
                var data = data.data;
                _this.appKey = yf.param('appKey', data);
                _this.appUser = yf.param('user', data);
                // console.log(_this.ws)
                _this.ws && _this.ws.close();
                _this.ws = new WebSocket(data);
                // 处理离线状态
                _this.ws.onclose = function () {
                    console.log('连接已段开！');
                    var offLine = $('#offLine').removeClass('hide'),
                        reLink = offLine.find('.move-link');
                    reLink.unbind().bind('click', function () {
                        _this.wsAppKeyGet();
                        offLine.addClass('hide');
                    });
                }
            }).error(function (e) { });
        },
        getCurrentData: function () {
            // 是否从历史记录里过来
            if (!yf.param('type')) return;
            var rData = {
                bussinessId: yf.param('bussinessID')
            }
            chatServer.activationRecord(rData).success(function (data) {
                console.log(data)
            }).error(function (e) { });
        },
        /**
         * 拉取数据(核价列表、聊天记录、核价对象详情)
         */
        getDataList: function () {
            // 核价列表(假装拿到了数据)
            var _this = this,
                sHtml = '',
                aEnquiryListItem = '';
            chatServer.getOjbectList().success(function (data) {
                if (data.code != '200') {
                    return;
                }
                var data = data.data;
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    var info = JSON.stringify(d);
                    // console.log(info)
                    sHtml += '<li data-id=fgg' + d.bussinessID + ' data-info="' + JSON.stringify(d).replace(/\"/g, '\'') + '" class="item">\
                        <div class="item-head"><b class="icon"></b></div>\
                        <div class="item-info" title="'+ d.guJiaDuiXiang + '">\
                            <p class="address">'+ d.guJiaDuiXiang + '</p>\
                            <p class="other">\
                            <span class="j-area">'+ d.jianZhuMianJi + '㎡</span>\
                            <span>'+ (d.suoZaiLouCeng ? d.suoZaiLouCeng : '--') + '/' + (d.zongLouCeng ? d.zongLouCeng : '--') + '层</span>\
                            <span>'+ (d.fangWuChaoXiang ? d.fangWuChaoXiang : '--') + '</span>\
                            <span>'+ (d.wuYeLeiXing ? d.wuYeLeiXing : '--') + '</span>\
                            </p>\
                        </div>';
                    if (d.weiDuXiaoXiTiaoShu > 0) {
                        sHtml += '<b class="tag new">news</b>';
                    }
                    sHtml += '</li>';
                }
                // <b class="tag new">news</b>\
                // 添加数据列表
                aEnquiryListItem = _this.oEnquiryList.append(sHtml).find('.item');
                // 绑定初始数据和状态
                _this.aResponseTtems.eq(0).attr('data-id', aEnquiryListItem.eq(0).attr('data-id'));
                // 默认的详细信息数据
                _this.objectDetails(aEnquiryListItem.eq(0).attr('data-info'));
                // 默认选中第一条
                aEnquiryListItem.eq(0).addClass('active').find('.tag.new').remove();
                _this.bussinessId = aEnquiryListItem.eq(0).attr('data-id').replace('fgg', '');
                // 第一次进入时先取聊天记录消息
                // console.log(22222222222222)
                if (_this.entryCount) {
                    // console.log(11111111111111)
                    var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + aEnquiryListItem.eq(0).attr('data-id') + '"]');
                    _this.queryMsgLog(responsePanel, _this.bussinessId);
                }
                // 循环EnquiryList对象
                _this.eachEnquiryList(aEnquiryListItem);
            }).error(function (e) { });
        },
        /**
         * 循环EnquiryList对象，防止找不到最新的dom对象
         */
        eachEnquiryList: function (aEnquiryListItem) {
            var _this = this;
            // 绑定列表点击事件
            aEnquiryListItem.each(function (idx, elm) {
                $(elm).unbind('click').bind('click', function () {
                    if ($(this).hasClass('active')) return;


                    if ($(this).find('.tag.new').length) {
                        $(this).find('.tag.new').remove();
                    }
                    // 拿到data-id属性查找data-id是否存在，不存在则添加窗口，存在则显示对应的聊天信息窗口
                    var dataId = $(this).attr('data-id');
                    _this.bussinessId = dataId.replace('fgg', '');
                    var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + dataId + '"]');
                    // console.log(responsePanel.length)
                    if (responsePanel.length) {
                        responsePanel.removeClass('hide').siblings().addClass('hide');
                        // 改变滚动条位置
                        _this.changeScrollOffset();
                    } else {
                        // 通过点击检测，表示第一次进入的状态已使用
                        _this.entryCount = false;
                        // 创建聊天窗口
                        var html = '<div class="response-item" data-id="' + dataId + '"></div>';
                        _this.oMsgResponse.append(html).find('.response-item[data-id="' + dataId + '"]').siblings().addClass('hide');
                        var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + dataId + '"]');
                        // 重置页码，用于判断和是否显示更多
                        _this.positionSize = 1;
                        // 根据核价对象查询聊天记录
                        _this.queryMsgLog(responsePanel, _this.bussinessId);
                    }
                    $(this).addClass('active').siblings().removeClass('active');
                    // 绑定详细信息
                    _this.objectDetails($(this).attr('data-info'));
                });
            });
        },
        /**
         * 点击对象的详细信息
         */
        objectDetails: function (data) {
            var data = JSON.parse(data.replace(/\'/g, '\"'));
            this.oObjectDetails = $('#objectDetails');
            var sHtml = '<thead>\
                <tr><th colspan="2" class="name"><h1>'+ yf.subStr(data.guJiaDuiXiang, 25) + '</h1></th></tr>\
            </thead>\
            <tbody>\
                <tr><td class="hd">建筑面积</td><td>'+ (data.jianZhuMianJi ? data.jianZhuMianJi : '--') + '㎡</td></tr>\
                <tr><td class="hd">物业类型</td><td>'+ (data.wuYeLeiXing ? data.wuYeLeiXing : '--') + '</td></tr>\
                <tr><td class="hd">房屋朝向</td><td>'+ (data.fangWuChaoXiang ? data.fangWuChaoXiang : '--') + '</td></tr>\
                <tr><td class="hd">建成年代</td><td>'+ (data.jianChengNianDai ? data.jianChengNianDai : '--') + '年</td></tr>\
                <tr><td class="hd">所在楼层</td><td>'+ (data.suoZaiLouCeng ? data.suoZaiLouCeng : '--') + '层</td></tr>\
                <tr><td class="hd">总楼层</td><td>'+ (data.zongLouCeng ? data.zongLouCeng : '--') + '层</td></tr>\
                <tr><td class="hd">特殊因素</td><td>'+ (data.teShuYinSu ? data.teShuYinSu : '--') + '</td></tr>\
                <tr><td class="hd c-yellow">反馈单价</td><td>'+ (data.fanKuiDanJia ? data.fanKuiDanJia : '--') + '（元）</td></tr>\
                <tr><td class="hd c-yellow">反馈总价</td><td>'+ (data.fanKuiZongJia ? data.fanKuiZongJia : '--') + '（万元）</td></tr>\
                <tr><td class="hd c-blue">核实单价</td><td class="unit-price">'+ (data.shenHeDanJia ? data.shenHeDanJia : '--') + '（元）</td></tr>\
                <tr><td class="hd c-blue">核实总价</td><td class="total-price">'+ (data.shenHeZongJia ? data.shenHeZongJia : '--') + '（万元）</td></tr>\
            </tbody>';
            this.oObjectDetails.html(sHtml);
        },
        /**
         * 查询聊天记录
         * 1.第一次进入时查询记录
         * 2.切换聊天对象的时候，验证当前聊天窗口是否存在，若不存在，则需要创建新的聊天窗口，再根据sessionId查询聊天记录
         * elm: 点击的聊天对象
         * sid: 聊天对象的id，统一标识
         * pageNo: 第几页
         */
        queryMsgLog: function (elm, sid, pageNo) {
            // 存储对象本身
            this.currentElm = elm;
            this.currentSid = sid;

            // 假装已经请求完成 ajax
            var _this = this, html = '';
            var rData = {
                sessionId: _this.currentSid,
                positionNo: pageNo || 1,
                rqNums: 10
            }
            chatServer.queryMsgLogs(rData).success(function (data) {
                if (data.code == '404' || data.code == '500') {
                    return;
                }
                // 总页数
                var positionSize = data.data.positionSize;
                // 数据长度
                var data = data.data.list;
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    // 客服响应数据
                    if (d.faSongFang == '客服') {
                        html += '<div class="msg-time"><span>' + d.faSongShiJian + '</span></div>';
                        html += '<div class="msg-server">\
                            <div class="msg-server-hd"></div>\
                            <div class="msg-server-info">\
                                <b class="icon i"></b>';
                        if (d.xiaoXiLeiXing == 'text') {
                            html += '<p>' + d.xiaoXiNeiRong + '</p>';
                        } else {
                            html += '<p><img src="' + d.xiaoXiNeiRong + '"></p>';
                        }
                        html += '</div>\
                        </div>';

                    }
                    // 客人发送数据
                    if (d.faSongFang == '客户') {
                        html += '<div class="msg-time"><span>' + d.faSongShiJian + '</span></div>';
                        html += '<div class="msg-guest">\
                            <div class="msg-server-info">\
                                <b class="icon i"></b>';
                        if (d.xiaoXiLeiXing == 'text') {
                            html += '<p>' + d.xiaoXiNeiRong + '</p>';
                        } else {
                            html += '<p><img src="' + d.xiaoXiNeiRong + '"></p>';
                        }
                        html += '</div>\
                            <div class="msg-server-hd"></div>\
                        </div>';

                    }
                }

                _this.currentElm.prepend(html);
                _this.currentElm.find('.move').remove();
                // 比较页数
                if (positionSize != _this.positionSize) {
                    if (_this.currentElm.find('.move').length) {
                        return _this.currentElm.find('.move').show();
                    }
                    _this.currentElm.prepend('<div class="move"><b class="icon"></b><a href="javascript:;" class="move-link">查看更多消息</a></div>');
                } else {
                    _this.currentElm.prepend('<div class="move"><span class="null-msg">没有更多消息记录了</span></div>');
                }
                // 查看更多消息
                _this.showMoveMsg();
                if (!_this.isMoveClick) {
                    // 改变滚动条位置
                    _this.changeScrollOffset();
                }
            }).error(function (e) { });
        },
        /**
         * 查看更多消息
         */
        showMoveMsg: function () {
            var _this = this, isMoveClick = false, oMoveLink = this.oMsgResponse.find('.move-link').eq(0);
            oMoveLink.unbind('click').bind('click', function () {
                // 增加当前对象的页码
                _this.positionSize += 1;
                _this.isMoveClick = true;
                _this.queryMsgLog(_this.currentElm, _this.currentSid, _this.positionSize);
            });
        },
        /**
         * 往服务器发送消息并生成聊天记录
         */
        sendMsg: function (msg, type) {
            var _this = this, html = '', timer = null;
            // 验证是否处于离线状态
            if ($('#offLine').is(':visible')) return;
            // 这里应该获取对应的核价对象.not(':hidden')暂时性的取法
            this.showResponseObj = this.oMsgResponse.children('.response-item').not(':hidden');
            if (msg == '') {
                //html = '<div>输出内容再发...</div>';
                this.oTextNull.show();
                // 在3秒内如果还处于显示状态则自动隐藏
                timer = setTimeout(function () {
                    if (_this.oTextNull.is(':visible')) {
                        _this.oTextNull.hide();
                    }
                    clearTimeout(timer);
                }, 3000);
                return;
            } else {
                /**
                 * 保存发送的消息
                 */
                var rData = {
                    bussinessId: _this.bussinessId,
                    msgType: type,
                    sendTime: yf.getTime(),
                    msgContent: msg
                }
                chatServer.sendMsg(rData).success(function (data) {
                    // console.log(data);
                }).error(function (e) { });

                var sb = {
                    "message": {
                        "content": msg,
                        "type": type
                    },
                    sessionId: _this.bussinessId
                };
                this.ws.send(JSON.stringify(sb));

                // 发送消息dom
                html = '<div class="msg-time"><span>' + yf.getTime() + '</span></div>\
	               		<div class="msg-guest">\
	                    <div class="msg-server-info">\
	                        <b class="icon i"></b>';
                if (type == 'pic') {
                    html += '<p><img src=' + msg + ' /></p>';
                } else {
                    html += '<p>' + msg + '</p>';
                }
                html += '</div>\
	                    <div class="msg-server-hd"></div>\
	                </div>';
            }
            // 清空已发送的数据
            this.oMsgTextArea.val('');
            // 找到对应核价对象dom生成
            this.showResponseObj.append(html);
            // 改变滚动条位置
            _this.changeScrollOffset();
        },
        /**
         * 接收响应消息
         */
        responseMsg: function () {
            var _this = this;
            _this.isActiveWindow = true;

            document.addEventListener("visibilitychange", function () {
                // console.log(document.hidden)
                if (document.hidden) {
                    _this.isActiveWindow = false;
                } else {
                    _this.isActiveWindow = true;
                    $.blinkTitle.clear(_this.timerArr);
                }
            }, false);

            this.ws.onmessage = function (message) {
                var data = JSON.parse(message.data);
                // console.log(data);
                var msg = JSON.parse(data.message);
                // 添加时间字段到msg对象
                msg.createTime = data.createTime;
                // console.log( data );
                /**
                 * 所有信息不相同，
                 * data.user: 回复的消息用户(客服)
                 * _this.appUser: 发送消息的用户
                 * yf.param('bussinessID'): 当前会话订单
                 * data.sessionId: 回复消息订单的id
                 */
                if (data.sessionId != _this.bussinessId && data.appKey != _this.appKey && data.user != _this.appUser) {
                    // 1.先去本地查找核价记录是否存在
                    var isExist = _this.oEnquiryList.find('.item[data-id="fgg' + data.sessionId + '"]');
                    // console.log(isExist.length)
                    if (isExist.length) {
                        // 1.存在这条记录
                        // 2.验证是否是当前这条记录(是否处于激活聊天)

                        if (isExist.hasClass('active')) {
                            // _this.showResponseObj = _this.oMsgResponse.children('.response-item').not(':hidden');

                            var oOther = _this.oEnquiryList.find('.item[data-id="fgg' + data.sessionId + '"]').append('<b class="tag new">news</b>');
                            var dataId = oOther.attr('data-id');
                            // 找到对应的聊天框，添加消息内容
                            var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + dataId + '"]');

                            _this.addNewsMsg(msg, responsePanel);

                        } else {
                            // 1.没有在当前聊天界面，应该添加提示信息到核价对象的右侧
                            // 2.找到对应的核价对象
                            // 3.添加未读消息提示图标
                            var oOther = _this.oEnquiryList.find('.item[data-id="fgg' + data.sessionId + '"]').append('<b class="tag new">news</b>');
                            var dataId = oOther.attr('data-id');
                            // 找到对应的聊天框，添加消息内容
                            var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + dataId + '"]');
                            if (responsePanel.length) {
                                // responsePanel.removeClass('hide').siblings().addClass('hide');
                                _this.addNewsMsg(msg, responsePanel);
                            } else {
                                // 找不到对应的聊天窗口，创建聊天窗口
                                var newResponsePanel = _this.oMsgResponse.append('<div class="response-item hide" data-id="' + dataId + '"></div>').find('.response-item[data-id="' + dataId + '"]');
                                // var newResponsePanel = _this.oMsgResponse.find('.response-item[data-id="'+dataId+'"]');
                                _this.addNewsMsg(msg, newResponsePanel);
                            }
                        }
                    } else {
                        // 通过sessionId查找核价记录
                        var rData = {
                            sessionId: data.sessionId
                        }
                        chatServer.isExistLog(rData).success(function (data) {
                            // console.log(data);
                            if (data.code == '500') {
                                console.log('登录过期')
                                return;
                            }
                            // 存在这条记录
                            if (data.code == '200') {
                                var d = data.data;
                                var sHtml = '<li data-id=fgg' + d.bussinessID + ' data-info="' + JSON.stringify(d).replace(/\"/g, '\'') + '" class="item">\
                                    <div class="item-head"><b class="icon"></b></div>\
                                    <div class="item-info" title="'+ d.guJiaDuiXiang + '">\
                                        <p class="address">'+ d.guJiaDuiXiang + '</p>\
                                        <p class="other">\
                                        <span class="j-area">'+ d.jianZhuMianJi + '㎡</span>\
                                        <span>'+ (d.suoZaiLouCeng ? d.suoZaiLouCeng : '--') + '/' + (d.zongLouCeng ? d.zongLouCeng : '--') + '层</span>\
                                        <span>'+ (d.fangWuChaoXiang ? d.fangWuChaoXiang : '--') + '</span>\
                                        <span>'+ (d.wuYeLeiXing ? d.wuYeLeiXing : '--') + '</span>\
                                        </p>\
                                    </div>\
                                    <b class="tag new">news</b>\
                                </li>';
                                // 添加数据列表
                                var aEnquiryListItem = _this.oEnquiryList.append(sHtml).find('.item');

                                /* // 绑定初始数据和状态
                                _this.aResponseTtems.eq(0).attr('data-id',aEnquiryListItem.eq(0).attr('data-id'));
                                // 默认的详细信息数据
                                _this.objectDetails( aEnquiryListItem.eq(0).attr('data-info') );
                                // 默认选中第一条
                                aEnquiryListItem.eq(0).addClass('active');
                                _this.bussinessId = aEnquiryListItem.eq(0).attr('data-id').replace('fgg','');
                                // 第一次进入时先取聊天记录消息
                                // console.log(22222222222222)
                                if( _this.entryCount ) {
                                    // console.log(11111111111111)
                                    var responsePanel = _this.oMsgResponse.find('.response-item[data-id="'+aEnquiryListItem.eq(0).attr('data-id')+'"]');
                                    _this.queryMsgLog(responsePanel,_this.bussinessId);
                                } */

                                // 遍历对象，绑定事件
                                _this.eachEnquiryList(aEnquiryListItem);
                            }
                        }).error(function (e) { });
                    }
                } else if (data.sessionId == _this.bussinessId && data.to == _this.appUser) {
                    // sessionId相同，回复的用户相同，表示回复了当前打开窗口的消息
                    // 验证用户是否切换了聊天窗口，根据sessionId匹配

                    var oOther = _this.oEnquiryList.find('.item[data-id="fgg' + data.sessionId + '"]');
                    var dataId = oOther.attr('data-id');

                    if (oOther.hasClass('active')) {
                        // 找到对应的聊天框，添加消息内容
                        var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + dataId + '"]');
                        _this.addNewsMsg(msg, responsePanel);
                    } else {
                        oOther.append('<b class="tag new">news</b>');
                        // 找到对应的聊天框，添加消息内容
                        var responsePanel = _this.oMsgResponse.find('.response-item[data-id="' + dataId + '"]');
                        if (responsePanel.length) {
                            // responsePanel.removeClass('hide').siblings().addClass('hide');
                            _this.addNewsMsg(msg, responsePanel);
                        } else {
                            // 找不到对应的聊天窗口，创建聊天窗口
                            var newResponsePanel = _this.oMsgResponse.append('<div class="response-item hide" data-id="' + dataId + '"></div>').find('.response-item[data-id="' + dataId + '"]');
                            // var newResponsePanel = _this.oMsgResponse.find('.response-item[data-id="'+dataId+'"]');
                            _this.addNewsMsg(msg, newResponsePanel);
                        }
                    }
                }

                // 表示客户自己发送的消息，不添加消息列表
                /* if( data.appKey == _this.appKey && data.user == _this.appUser ) return;
                // 添加新消息
                _this.addNewsMsg(msg); */
            };
        },
        /**
         * 添加新消息
         * existElm: 是否存在该对象
         */
        addNewsMsg: function (msg, existElm) {
            var _this = this, timer = null;
            // 浏览器窗口是否是当前激活状态
            if (!_this.isActiveWindow) {
                $.blinkTitle.clear(_this.timerArr);
                _this.timerArr = $.blinkTitle.show();
            };
            //  核时单价，核时总价
            if (msg.type == 'inquiry') {
                var inquiryContent = JSON.parse(msg.content);
                this.oObjectDetails.find('.unit-price').eq(0).html(inquiryContent.inquiryPrice + '（元）');
                this.oObjectDetails.find('.total-price').eq(0).html(inquiryContent.inquiryResult + '（万元）');
                msg.content = '系统消息：您好，价格已回复~';
            }
            // 消息记录回显
            var html = '<div class="msg-time"><span>' + msg.createTime + '</span></div>\
            <div class="msg-server">\
                <div class="msg-server-hd"></div>\
                <div class="msg-server-info">\
                    <b class="icon i"></b>';
            if (msg.type == 'pic') {
                html += '<p><img src=' + msg.content + ' /></p>';
            } else {
                html += '<p>' + msg.content + '</p>';
            }
            html += '</div>\
                </div>';
            // 找到对应核价对象返回客服消息
            existElm ? existElm.append(html) : this.showResponseObj.append(html);
            // 改变滚动条位置
            if (msg.type == 'pic') {
                var oImg = new Image();
                oImg.src = msg.content;
                oImg.onload = function () {
                    return _this.changeScrollOffset();
                }
            }
            _this.changeScrollOffset();
        },
        /**
         * 编辑消息，按键检测
         */
        editMsg: function () {
            var _this = this;
            this.oMsgTextArea.unbind('keydown').bind('keydown', function (e) {
                var e = e || window.event;
                var chatSendType = sessionStorage.getItem('fggChatSendType'),
                    sVal = _this.oMsgTextArea.val();
                if (chatSendType == '0') {
                    // 按ctrl+enter 换行，Enter发送消息
                    if (e.ctrlKey && e.which == 13) {
                        // console.log('ctrl+enter 换行');
                        if (_this.oMsgTextArea.val().length > 0) {
                            _this.oMsgTextArea.val(_this.oMsgTextArea.val() + " \r");
                        } else {
                            _this.oMsgTextArea.val(" \r");
                        }
                    } else if (!e.ctrlKey && e.which == 13) {
                        // enter发消息
                        e.preventDefault();
                        // console.log( 'enter 发消息' );
                        _this.sendMsg(sVal, 'text');
                    } else {
                        _this.oTextNull.hide();
                    }
                } else if (chatSendType == '1') {
                    // 按Ctrl+Enter发消息，Enter键换行
                    if (!e.ctrlKey && e.which == 13) {
                        // console.log('enter 换行');
                        _this.oTextNull.hide();
                    } else if (e.ctrlKey && e.which == 13) {
                        e.preventDefault();
                        // console.log( 'Ctrl+Enter 发消息' );
                        _this.sendMsg(sVal, 'text');
                    } else {
                        _this.oTextNull.hide();
                    }
                }
            });
        },
        /**
         * 发送消息按钮，切换发送消息功能键
         */
        bindEvents: function () {
            var _this = this;
            // 发送消息
            this.oSendBtn.unbind('click').bind('click', function () {
                _this.sendMsg(_this.oMsgTextArea.val(), 'text');
            });
            // 显示隐藏改变发送消息的方式
            this.oChangeSendBtn.unbind('click').bind('click', function (e) {
                e.stopPropagation();
                _this.oSendType.toggle();
                $(document).bind('click', function () {
                    if (_this.oSendType.is(':visible')) {
                        _this.oSendType.hide();
                        $(document).unbind('click');
                    }
                });
            });
        },
        /**
         * 切换在送消息功能按键
         */
        getSetSendMethod: function () {
            var _this = this,
                aChilds = _this.oSendType.find('.list').eq(0).find('.item');
            // 设置默认发送消息的方式
            if (!sessionStorage.getItem('fggChatSendType')) {
                sessionStorage.setItem('fggChatSendType', 0);
                aChilds.eq(0).addClass('active');
            } else {
                aChilds.eq(sessionStorage.getItem('fggChatSendType')).addClass('active').siblings().removeClass('active');
            }
            aChilds.each(function (idx, elm) {
                $(elm).unbind('click').bind('click', function () {
                    sessionStorage.setItem('fggChatSendType', idx);
                    // 改变发送消息的方式
                    $(this).addClass('active').siblings().removeClass('active');
                    // 隐藏发送消息切换列表
                    _this.oSendType.hide();
                    // 改变发送按键类型
                    _this.editMsg();
                    // 解除document事件绑定
                    $(document).unbind('click');
                });
            });
        },
        /**
         * 添加滚动条
         */
        scrollBar: function () {
            this.oEnquiry.mCustomScrollbar({
                scrollInertia: 180,
                theme: "inset-3",
                axis: "y"
            });
            $('.msg-response-scroll').mCustomScrollbar({
                alwaysShowScrollbar: 0,
                scrollInertia: 100,
                theme: "inset-3",
                axis: "y"
            });
        },
        /**
         * 改变滚动条位置
         * offset: (top,bottom)
         */
        changeScrollOffset: function (offset) {
            var t = setTimeout(function () {
                // 改变滚动条位置
                $('.msg-response-scroll').mCustomScrollbar("scrollTo", offset || "bottom");
                clearTimeout(t);
            }, 100);
        },
        /**
        * 上传图片初始化传入集合数据
        */
        uploadInit: function (lis) {
            var _this = this;
            $('#picUpload').on('change', function () {
                _this.startUpload($(this));
            });
            return this;
        },
        /**
         * 开始上传图片文件并回显到dom中显示（方法自动调用）
         * @param  {[type]} fileId 指定上传的input file id
         */
        startUpload: function (obj) {
            var _this = this;
            obj.attr("count", new Date().getTime());
            var fileId = obj.attr('id');
            var lastIndex = obj.val().toLowerCase().lastIndexOf('.');
            var str = obj.val().substr(lastIndex);
            var fileType = [".jpg", ".png", ".jpeg"];
            // 过滤文件类型
            if (fileType.indexOf(str) < 0) {
                $("#" + fileId).val("");
                return layer.msg('请上传' + fileType.join(',') + '类型的图片');
            } else {
                var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
                if (isIE && !$("#" + fileId)[0].files) {

                } else {
                    var size = $("#" + fileId)[0].files[0].size;
                    if (size / 1024 / 1024 > 2) {
                        return layer.msg("请上传2M以下的文件");
                    }
                }
            }
            $.ajaxFileUpload({
                url: '/api/v1/imageUpload', //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: fileId, //文件上传域的ID
                type: "post",
                data: {
                    bussinessId: _this.bussinessId
                },
                dataType: 'json', //返回值类型 一般设置为json
                success: function (data) {
                    var data = JSON.parse(data);
                    $("#" + fileId).val("");
                    if (!data.data) {
                        return layer.msg('图片发送失败');
                    }
                    var pic = data.data;
                    _this.sendMsg(pic, 'pic');
                },
                error: function (data, status, e) {
                    //服务器响应失败处理函数
                    // console.log(JSON.stringify(data)+'===='+JSON.stringify(status)+'==='+e);
                    console.log(data);
                    console.log(status);
                    console.log(e);
                }
            });
        }
    }).init();
});
