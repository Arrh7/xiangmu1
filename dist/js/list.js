"use strict";var flag=!0,list2=[];function getList(){$.ajax({url:"../lib/list.json",dataType:"json",success:function(l){l=l[0].list;$(".pagi").pagination({pageCount:Math.ceil(l.length/20),current:1,jump:!0,coping:!0,homePage:"首页",endPage:"末页",prevContent:"上页",nextContent:"下页",callback:function(t){var i=t.getCurrent();if(20*i>=l.length)var n=l.slice(20*(i-1));else n=l.slice(20*(i-1),20*i);bindHtml(n)}}),bindHtml(l.slice(0,20)),list2=l}})}function bindHtml(t){var i="";t.forEach(function(t){i+='\n        <li data-id="'.concat(t.list_id,'"> \n\n        <img src=').concat(t.list_img,">\n          <p>").concat(t.list_title,"</p>\n          <p>").concat(t.list_price,"</p>\n        </li>\n      ")}),$(".n-bot > ul").html(i)}getList();var btn=document.querySelector(".sort");btn.onclick=function(){flag=!flag,list2.sort(function(t,i){return!0===flag?t.list_price-i.list_price:i.list_price-t.list_price}),bindHtml(list2.slice(0,20))},$(".n-bot > ul").on("click","li",function(){for(var t=$(this).data("id"),i={},n=0;n<list2.length;n++)if(list2[n].list_id===t){i=list2[n];break}console.log(t),localStorage.setItem("goods_info",JSON.stringify(i)),window.location.href="../pages/datails.html"});