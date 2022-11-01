$(document).ready(function () {

    let handle_effect = $anchor => {
        let elOffset = $anchor.offset().top;
        let elHeight = $anchor.height();
        let windowHeight = $(window).height();
        let offset;

        if (elHeight < windowHeight) {
        offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
        }
        else {
        offset = elOffset;
        }
        $('html').animate({scrollTop:offset}, 500, function () {
            $anchor.effect('pulsate', 'slow');
        });
    };

    function highlight(href){
        let anchor_pos = href.indexOf("#");
        if (anchor_pos !== -1) {
            let anchor_id = href.substr(anchor_pos + 1);
            if (anchor_id.length > 0){
                let $anchor = $('#' + anchor_id);
                if ($anchor.length === 0) {

                    if (anchor_id.startsWith('comment_')) {  // 如果是高亮评论，且评论未加载出来，则尝试加载评论
                        let comment_id = parseInt(anchor_id.replace('comment_', ''));
                        if (typeof GLOBAL_FILE_COMMENT_PULL_URL !== "undefined") {
                            $.ajax({
                                url: GLOBAL_FILE_COMMENT_PULL_URL,
                                type: "GET",
                                data: {
                                    type: "pull_highlight_comment",
                                    comment_id: comment_id,
                                },
                                dataType: "json",
                                success: resp => {
                                    if (resp.error_message === "success") {
                                        for (let comment of resp.comments) {
                                            $('.file-whole-field-comment-pull-message').before($(comment));
                                        }
                                        window.GLOBAL_FILE_COMMENT_HIGHLIGHT_COMMENT_ID = resp.root_comment_id;  // 加载的是根评论，不一定是当前评论
                                        handle_effect($('#' + anchor_id));
                                    }
                                }
                            })
                        }
                    }
                    return false;
                }
                handle_effect($anchor);
            }
        }
    }

    // 最开始js负载较大，画面会卡
    setTimeout(function () {
        highlight(location.href);
    }, 0);

    $('a.comment_link').click(function(){
        let href = $(this).attr('href');
        highlight(href);
        return false;
    });
});