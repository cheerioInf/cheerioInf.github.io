let GLOBAL_FILE_COLLECT_FUNCTION_PROCESS = false;

let GLOBAL_FILE_COLLECT_FUNCTION = function (e) {
    e.preventDefault();

    if (GLOBAL_FILE_COLLECT_FUNCTION_PROCESS) return;
    GLOBAL_FILE_COLLECT_FUNCTION_PROCESS = true;

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
            let $star = $('span.' + $id + "_star");
            let $cnt = $('span.' + $id + '_collectcnt');
            if (resp.error_message === "add_success"){
                $star.removeClass('glyphicon-star-empty').addClass('collect-active glyphicon-star');
            } else if (resp.error_message === 'remove_success'){
               $star.removeClass('glyphicon-star').removeClass('collect-active').addClass('glyphicon-star-empty');
            } else if (resp.error_message === "未绑定手机号") {
                $modal.modal('show');
            }
            if (resp.favoritecnt > 0)
                $cnt.text(resp.favoritecnt);
            else
                $cnt.text("收藏");
            GLOBAL_FILE_COLLECT_FUNCTION_PROCESS = false;
        },
        error: function(){
            GLOBAL_FILE_COLLECT_FUNCTION_PROCESS = false;
        }
    });

    return false;
};