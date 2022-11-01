$(document).ready(function () {
    if ($('.file-content-whole-page-flag').length === 0) return;
    if (GLOBAL_FILE_COMMENT_CURRENT_COUNT === 0) return;  // 没有评论，则不需要加载
    let no_comments = false;
    let is_rendering_files = false;
    let $pull_message = $('.file-whole-field-comment-pull-message');

    let render_comments = (comments) => {
        $pull_message.find('div').text("");
        for (let comment of comments) {
            $pull_message.before($(comment));
        }
    };

    $(window).scroll(function(e) {
        if (no_comments) return true;  // 如果没有新评论，则退出
        if (is_rendering_files) e.preventDefault();

        if(!is_rendering_files && $(window).scrollTop() + $(window).height() > $(document).height() - 20) {
            is_rendering_files = true;
            $pull_message.find('div').text("正在加载...");

            let highlight_comment_id = 0;  // 打开通知时，高亮显示的评论可能已经被提前加载，此时不要重复加载
            if (typeof GLOBAL_FILE_COMMENT_HIGHLIGHT_COMMENT_ID !== 'undefined') {
                highlight_comment_id = GLOBAL_FILE_COMMENT_HIGHLIGHT_COMMENT_ID;
            }
            $.ajax({
                url: GLOBAL_FILE_COMMENT_PULL_URL,
                type: "GET",
                data: {
                    type: "pull_more_comments",
                    file_id: GLOBAL_FILE_COMMENT_FILE_ID,
                    current_comments_count: GLOBAL_FILE_COMMENT_CURRENT_COUNT,
                    highlight_comment_id: highlight_comment_id,
                },
                dataType: "json",
                success: resp => {
                    if (resp.error_message === "success") {
                        render_comments(resp.comments);
                        no_comments = resp.no_comments;
                        GLOBAL_FILE_COMMENT_CURRENT_COUNT += resp.comment_group_count;
                        if (no_comments) {
                            $pull_message.find('div').text("没有更多评论");
                        } else {
                            $pull_message.find('div').text("");
                        }
                    } else {
                        no_comments = true;
                        $pull_message.find('div').text("没有更多评论");
                    }

                    is_rendering_files = false;
                }
            });
        }
    });
});