require(["src/moduleAuthority/moduleExplain/js/moduleExplain-48d4494a0a.server.js","src/moduleAuthority/moduleExplain/js/moduleDescription-6464c68da8.js"],function(t,a){({init:function(){this.abilityType="全部功能",this.showListFn()},showListFn:function(){var e=this;this.marketList=$("#market_list"),yf.loading("#market_list"),t.getModuleExplain().success(function(t){if(yf.removeLoading("#market_list"),t.success){for(var i="",s=0;s<t.data.length;s++)i+='<li data-type="'+t.data[s].moduleType+'" data-open="'+t.data[s].isOpen+'"><p class="market-title">'+t.data[s].moduleName+'</p><p class="market-describe">'+a[t.data[s].moduleName]+"</p>",t.data[s].isOpen?i+='<p class="market-fd"><span class="fl c-light-blue">已开通  有效期至'+yf.filterStr(t.data[s].termOfValidity)+'</span><a class="fr c-blue" href="javascript:;" data-name="'+t.data[s].moduleName+'" data-state="续费">续费延期</a></p></li>':i+='<p><a class="layui-btn layui-btn-warm" data-name="'+t.data[s].moduleName+'" data-state="开通">立即开通</a></p></li>';e.marketList.html(i),e.openAuthorityFn("#market_list"),e.showTbaleFn(t.data),layui.use("form",function(){var t=layui.form;t.render("select"),t.on("select(ability-type)",function(t){if(t.value!=e.abilityType){switch($("#no_market").addClass("hide"),t.value){case"全部功能":e.marketList.find("li").fadeIn();break;case"基础功能":for(var a=e.marketList.find("li"),i=0;i<a.length;i++)"extend"==a.eq(i).data().type?a.eq(i).fadeOut():a.eq(i).fadeIn();break;case"扩展功能":for(var a=e.marketList.find("li"),i=0;i<a.length;i++)"basics"==a.eq(i).data().type?a.eq(i).fadeOut():a.eq(i).fadeIn();break;case"已开通功能":for(var a=e.marketList.find("li"),s=0,i=0;i<a.length;i++)a.eq(i).data().open?a.eq(i).fadeIn():(s++,a.eq(i).fadeOut());s==a.length&&$("#no_market").removeClass("hide")}e.abilityType=t.value}})})}else layer.msg(t.msg)})},showTbaleFn:function(t){for(var a="",e=0;e<t.length;e++)a+="<tr><td>"+t[e].moduleName+"</td>","basics"==t[e].moduleType?a+='<td class="fgg-icon">&#xe621;</td><td><p class="line"></p></td>':a+='<td><p class="line"></p></td><td class="fgg-icon">&#xe621;</td>',t[e].isOpen?a+='<td class="c-blue">已开通</td></tr>':a+='<td><a class="layui-btn layui-btn-warm" href="javascript:;" data-name="'+t[e].moduleName+'" data-state="开通">立即开通</a></td></tr>';$("#market_table").html(a),$("#market_table tr:odd").css("background","#F9F9F9"),this.openAuthorityFn("#market_table")},openAuthorityFn:function(t){$(t).find("a").off("click").click(function(){var t=$(this).data().name,a=$(this).data().state;layer.open({type:"1",area:["auto","auto"],title:!1,closeBtn:!1,shadeClose:!1,content:$("#open_authority"),success:function(){$("#authority_pop_name").text(t),$("#authority_pop_state").text(a)},end:function(){$("#open_authority").hide()}})})}}).init()});