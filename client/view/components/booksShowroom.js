Template.booksShowroom.helpers({
    books: function(){
        return [
            {img: '/img/1.jpg'},
            {img: '/img/2.jpg'},
            {img: '/img/3.jpg'},
            {img: '/img/4.jpg'},
            {img: '/img/5.jpg'},
            {img: '/img/6.jpg'} 
        ]
    }
});

Template.booksShowroom.rendered = function(){
    $(function () {
        $('.estante li').on('mouseenter', function () {
            $(this).addClass('pulse')
        }).on('mouseleave', function () {
            $(this).removeClass('pulse')
        });
        setTimeout(function () {
            $('.estante li').removeClass('fadeInLeft')
        }, 1001)
    });
}