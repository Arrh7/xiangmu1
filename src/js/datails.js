   /*
      我是详情页面
        1. 从 localStorage 里面获取数据
    */

    // 1. 获取 localStorage 里面的数据
    const info = JSON.parse(localStorage.getItem('goods_info'))
     console.log(info);
     




    $("#exzoom").exzoom({
     
        "autoPlay": false,//是否自动播放
     //    "autoPlayTimeout": 2000,//播放间隔时间
 });//方法调用，务必在加载完后执行

    // 判断一下数据
    if (goods_info === null) {
      alert('您查看的商品详情不存在了')
    } else {
      alert('我要渲染页面, 内容就是 ' + goods_info.name)
    }
    
      
    // 渲染页面
    bindHtml()
    function bindHtml() {
      $('.goods_info .img1').attr('src', info.list_img)
      $('.goods_info  .goodsName').text(info.list_title)
      $('.goods_info  .price').text('￥: ' + info.list_price)
    }

    // 4. 点击添加购物车
    // 4-1. 添加点击事件
    $('.buy_addCart').click(() => {
      const cartList = JSON.parse(localStorage.getItem('cartList')) || []
      let exits = cartList.some(item => {
        // 数组里面每一个的 id === 本页面的这条数据的 id
        return item.list_id === info.list_id
      })

      // console.log(exits)
      if (exits) {
        // 表示有这个信息了, 我们要让 number ++
        // console.log('已经存在 number ++')
        // 找到这个信息给他 number ++
        let data = null
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].list_id === info.list_id) {
            data = cartList[i]
            break
          }
        }
        // data 就是我找到的这个信息
        data.number++

        // 4-5. 数量添加的时候, 小计价格要改变
        data.xiaoji = data.number * data.list_price // 数量 * 单价
      } else {
        // 表示没有这个信息, 直接 push 就可以了
        // push 之前, 象里面添加一个 number 信息为 1
        info.number = 1

        // 4-5. 多添加一些信息
        info.xiaoji = info.list_price // 因为默认是第一个, 小计就是单价
        info.isSelect = false // 默认不选中
        cartList.push(info)
      }

      // 在存储到 localStorage 里面
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })

      // 商品加减
  var count = $('.buy-left > .count').html();
  $('.buy-left .one')
    .click(function(){
      count++;
      $('.buy-left > .count').html(count);
    })
    .next()
    .click(function(){
      count--;
      if(count<0){
        count = 0;
      }
      $('.buy-left > .count').html(count);
    })

 

   