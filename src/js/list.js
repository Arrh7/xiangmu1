

 var flag = true;
 var list2 = [];
  // 1. 请求数据
  getList()
  function getList() {
    $.ajax({
      url: '../lib/list.json',
      dataType: 'json',
      success: function (res) {
        // console.log(res)
        // 一共 102 条数据, 数组.length
        // 一页显示多少条(假定一页显示 12 条), 一共 9 页

        // 2. 渲染分页器
        var res=res[0].list;
        $('.pagi').pagination({
          pageCount: Math.ceil(res.length / 20), // 总页数
          current: 1, // 当前页
          jump: true,
          coping: true,
          homePage: '首页', // 首页按钮的文本
          endPage: '末页', // 末页按钮的文本
          prevContent: '上页',
          nextContent: '下页',
          callback: function (api) { // 当你切换页面的时候会触发
            // api.getCurrent() 获取当前是第几页
           
            let curr = api.getCurrent()

            // console.log(curr)
            // 根据是第几页, 从我的总数组里面筛选出一部分数据
            //   slice 方法包前不包后
            if(curr * 20>=res.length){
                var list = res.slice((curr - 1)*20)
            }else{
            var list = res.slice((curr - 1) * 20, curr * 20)
            }
            // console.log(list)
            // slice 不改变原始数组, 只是从数组里面拿到一些内容
            // splice 方法才是改变原始数组, 从原始数组里面删除

            // 3-2. 每次使用分页器切换的时候渲染一次
            bindHtml(list)
          }
        })

        // 3. 先把第一页的数据渲染一次
        bindHtml(res.slice(0, 20))
       // 2-2. 给全局变量赋值
       list2 = res
      }
    })
  }

  function bindHtml(list) {
  
    // 根据 list 数组渲染页面就可以了

    let str = ''

    list.forEach(item => {
      str += `
        <li>
        <img src=${item["list-img"]}>
          <p>${ item["list-title"]}</p>
          <p>${ item["list-price"] }</p>
        </li>
      `
    })

    $('.n-bot > ul').html(str);
  };
 
  var btn = document.querySelector('.sort')
    btn.onclick = function () {
      // 让准备好的变量改变
      flag = !flag
     
     
      // 不管是什么都要把数组重组
      list2.sort(function (a, b) {
        if (flag === true) {
          return a["list-price"]-b["list-price"]
        } else {
          return b["list-price"]-a["list-price"]
        }
      })
      $('.pagi').pagination({
        pageCount: Math.ceil(list2.length / 20), // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
          // api.getCurrent() 获取当前是第几页
          console.log(api.getCurrent())
          let curr = api.getCurrent()

          // console.log(curr)
          // 根据是第几页, 从我的总数组里面筛选出一部分数据
          //   slice 方法包前不包后
          if(curr * 20>=list2.length){
              var list= list2.slice((curr - 1)*20)
          }else{
          var list = list2.slice((curr - 1) * 20, curr * 20)
          }
          // console.log(list)
          // slice 不改变原始数组, 只是从数组里面拿到一些内容
          // splice 方法才是改变原始数组, 从原始数组里面删除

          // 3-2. 每次使用分页器切换的时候渲染一次
          bindHtml(list)
        }
      })

      // 3. 先把第一页的数据渲染一次
      bindHtml(list2.slice(0, 20))

    }

    $('.n-bot > ul').on('click', 'li', function () {
      const id= $(this).data('list-price')
      // console.log('我应该找到 list2 这个数组中 id 为 ' + id + ' 的那一条数据')

      // 从总的数据里面找到 id 配套的哪一个数据
      let data = {}

      for (let i = 0; i < list2.length; i++) {
        if (list2[i].id === id) {
          data = list2[i]
          break
        }
      }

      // 4. 要把这一条数据拿到 detail.html 页面去渲染一下
      //    跨页面通讯
      //    在这个页面存储起来这个数据, 要在 detail.html 里面也能拿到
      //    cookie  ->  存储起来的数据会在发送请求的时候自动携带
      //    localStorage -> 存储起来的数据不会自动携带
      // 就把我找到的这个数据存储在 localStorage 里面
      //   当你到达 detail 页面的时候, 在拿出来就可以了
      localStorage.setItem('goods_info', JSON.stringify(data))

      // 存储好了以后就跳转页面
      window.location.href = '../pages/datails.html'
    })