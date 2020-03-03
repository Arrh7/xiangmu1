
getList()

function getList() {
    $.ajax({
        url: '../lib/data.json',
        dataType: 'json',
        success: function (res) {
            console.log(res)

            // 4-1. 准备一个空字符串
            let str = ''

            // 4-2. 渲染一级的 li
            res.forEach(item => {
                str += `<li>${item.menu}</li>`
            })

            // 4-3. 填充到 nav_top 里面的 ul 里面
            $('.nav-left > ul')
                .html(str)
                .on({
                    mouseenter: () => $('.nav-box').stop().slideDown(),
                    mouseleave: () => $('.nav-box').stop().slideUp()
                })
                .children('li') // 找到所有的一级菜单下的 li
                .on('mouseover', function () {
                    // 5-1. 知道自己移入的时哪一个 li
                    const index = $(this).index()
                    // 5-2. 找到要渲染的数组
                    const list = res[index].list;
                    console.log(list);
                    
                    // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
                    let str = ''

                    list.forEach(item => {
                        str += `
                        <li>
                            <p>${ item.title }</p>
                            <ol>
                        `
                        item.item.forEach(item2 => {
                            str += `<li>${item2.name}</li>`
                        })

                        str += `
                            </ol>
                          </li>
                        
                        `
                    })

                    /*
                        list 是一个数组开始循环
                          <li>
                            <p>女鞋1</p>
                            <ol>
                              <li>百丽1</li>
                              <li>百丽2</li>
                              <li>百丽3</li>
                            </ol>
                          </li>
                          <li>
                            <p>女鞋2</p>
                            <ol>
                              <li>百丽1</li>
                              <li>百丽2</li>
                              <li>百丽3</li>
                            </ol>
                          </li>
                            
                    */


                    // 5-5. 填充到页面里面
                    $('.nav-box > ul').html(str)
                })

            // 4-4. 给 nav_box 添加一个移入移出事件
            $('.nav-box')
                .on({
                    mouseover: function () { $(this).finish().show() },
                    mouseout: function () { $(this).finish().slideUp() }
                })
        }
    })
}