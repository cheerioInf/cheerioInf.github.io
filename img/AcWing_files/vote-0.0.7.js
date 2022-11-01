let FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = false;

const FILE_COMMENT_VOTE_UP_HANDLE_FUNCTION = function (e) {
    if (FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit) return false;

    FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = true;
    const $heart_up = $(this).find(".file-comment-vote-up-heart");
    const $heart_up_empty = $(this).find(".file-comment-vote-up-heart-empty");
    const $heart_down = $(this).parent().find(".file-comment-vote-down-heart");
    const $heart_down_empty = $(this).parent().find(".file-comment-vote-down-heart-empty");
    const $heart_gif = $(this).find(".file-comment-vote-up-heart-gif");
    const $count = $(this).find(".file-comment-vote-up-count");

    let $modal = $('#need-to-bandage-cell-phone-modal-warning');

    $.ajax({
        url: $(this).data("comment-vote-up-url"),
        type: "POST",
        dataType: "Json",
        cache: false,
        timeout: 60000,
        success: resp => {
            if (resp.error_message === "add_success"){
                const voteup = parseInt(resp.voteup);
                if (voteup === 0) {
                    $count.text("");
                } else {
                    $count.text(voteup);
                }

                $heart_down.hide();
                $heart_down_empty.show();
                $heart_gif.attr('src', $heart_gif.attr('src')  + parseInt(Math.random() * 10));
                $heart_gif.ready(() => {
                    $heart_up_empty.hide();
                    $heart_gif.show();
                    setTimeout(() => {
                        $heart_gif.hide();
                        $heart_up.show();

                        FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = false;

                    }, 1000);
                });
            } else if (resp.error_message === "remove_success"){
                $heart_up.hide();
                $heart_up_empty.show();
                const voteup = parseInt(resp.voteup);
                if (voteup === 0) {
                    $count.text("");
                } else {
                    $count.text(voteup);
                }

                FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = false;
            } else if (resp.error_message === "未绑定手机号") {
                $modal.modal('show');

                FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = false;
            }
        },
    });

    return false;
};

const FILE_COMMENT_VOTE_DOWN_HANDLE_FUNCTION = function (e) {
    if (FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit) return false;
    FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = true;

    const $heart_up = $(this).parent().find(".file-comment-vote-up-heart");
    const $heart_up_empty = $(this).parent().find(".file-comment-vote-up-heart-empty");
    const $heart_down = $(this).find(".file-comment-vote-down-heart");
    const $heart_down_empty = $(this).find(".file-comment-vote-down-heart-empty");
    const $count = $(this).parent().find(".file-comment-vote-up-count");

    let $modal = $('#need-to-bandage-cell-phone-modal-warning');

    $.ajax({
        url: $(this).data("comment-vote-down-url"),
        type: "POST",
        dataType: "Json",
        cache: false,
        timeout: 60000,
        success: resp => {
            if (resp.error_message === "add_success"){
                $heart_up.hide();
                $heart_up_empty.show();
                $heart_down_empty.hide();
                $heart_down.show();

                const voteup = parseInt(resp.voteup);
                if (voteup === 0) {
                    $count.text("");
                } else {
                    $count.text(voteup);
                }
            } else if (resp.error_message === "remove_success"){
                $heart_down.hide();
                $heart_down_empty.show();
            } else if (resp.error_message === "未绑定手机号") {
                $modal.modal('show');
            }

            FILE_COMMENT_VOTE_HANDLE_FUNCTION_process_submit = false;
        },
    });

    return false;
};