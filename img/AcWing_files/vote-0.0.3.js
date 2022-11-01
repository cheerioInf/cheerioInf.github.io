let GLOBAL_FILE_VOTE_UP_FUNCTION_PROCESS = false;

let GLOBAL_FILE_VOTE_UP_FUNCTION = function (e) {
    e.preventDefault();
    if (GLOBAL_FILE_VOTE_UP_FUNCTION_PROCESS) return;
    GLOBAL_FILE_VOTE_UP_FUNCTION_PROCESS = true;

    let $modal = $('#need-to-bandage-cell-phone-modal-warning');

    let $form = $(this);
    let hrefUrl = $form.attr('action');
    let postData = $form.serializeArray();
    let $id = $(this).attr('id');

    $.ajax({
        url: hrefUrl,
        type: "POST",
        data: postData,
        dataType: "Json",
        cache: false,
        timeout: 60000,
        success: function(resp){
            let $heart = $('span.' + $id + "_heart");
            let $votecnt = $('span.' + $id + '_votecnt');
            if (resp.error_message === "add_success"){
                $heart.removeClass('glyphicon-heart-empty').addClass('vote-active glyphicon-heart');
            } else if (resp.error_message === 'remove_success'){
               $heart.removeClass('glyphicon-heart').removeClass('vote-active').addClass('glyphicon-heart-empty');
            } else if (resp.error_message === "未绑定手机号") {
                $modal.modal('show');
            }
            if (resp.votecnt > 0)
                $votecnt.text(resp.votecnt);
            else
                $votecnt.text("赞");
            GLOBAL_FILE_VOTE_UP_FUNCTION_PROCESS = false;
        },
        error: function(){
            GLOBAL_FILE_VOTE_UP_FUNCTION_PROCESS = false;
        }
    });

    return false;
};