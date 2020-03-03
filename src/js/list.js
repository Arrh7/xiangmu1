
$('.liu-ul >.liu-li ').click(function () {
    // 点击的时候, 自己有 active 类名, 并且自己的子元素的 ol slideDown()
    //            兄弟元素取消 active 类名, 并且兄弟元素下的 ol slideUp()
    $(this)
        .toggleClass('active')
        .children('ol')
        .slideToggle()
        .parent()
        .siblings()
        .removeClass('active')
        .children('ol')
        .slideUp()
})
