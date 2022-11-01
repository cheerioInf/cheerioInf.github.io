$(function () {
    let process_submit = false;
    $('form.form_favorte').on("submit", function (e) {
        e.preventDefault();

        if (process_submit) return;
        process_submit = true;
        $('.fs-file-operation-btn').css('cursor', 'not-allowed');

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
                let $span = $('span.' + $id);
                let $span_cnt = $('span.' + $id + '_favorite');
                if (resp.error_message === "add_success"){
                    $span.addClass('favorite');
                    $span_cnt.addClass('favorite_number');
                    $span_cnt.text(resp.favoritecnt);
                } else if (resp.error_message === 'remove_success'){
                    $span.removeClass('favorite');
                    $span_cnt.removeClass('favorite_number');
                    $span_cnt.text(resp.favoritecnt > 0 ? resp.favoritecnt : '');
                } else if (resp.error_message === "未绑定手机号") {
                    $modal.modal('show');
                }
                process_submit = false;
                $('.fs-file-operation-btn').css('cursor', 'pointer');
            },
            error: function(){
                process_submit = false;
                $('.fs-file-operation-btn').css('cursor', 'pointer');
            }
        });

        return false;
    });
});