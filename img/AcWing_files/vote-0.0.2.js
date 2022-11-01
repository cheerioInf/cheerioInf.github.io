$(function () {
    let process_submit = false;

    $('form.form_vote').on("submit", function (e) {
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
                let $span_votecnt = $('span.' + $id + '_votecnt');
                if (resp.error_message === "add_success"){
                    $span.addClass('vote_active');
                    $span_votecnt.text(resp.votecnt);
                    $id_anti = $id.replace('voteup', 'votedown');
                    if ($id.indexOf('votedown') !== -1){
                        $id_anti = $id.replace('votedown', 'voteup');
                    }
                    $span_anti = $('span.' + $id_anti);
                    $span_anti.removeClass('vote_active');
                } else if (resp.error_message === 'remove_success'){
                    $span.removeClass('vote_active');
                    $span_votecnt.text(resp.votecnt);
                } else if (resp.error_message === "未绑定手机号") {
                    $modal.modal('show');
                }
                if ($id.indexOf('answer') > -1){
                    let $span_ok = $('span.' + $id + '_ok');
                    if (resp.is_accepted){
                        $span_ok.show();
                    }
                    else{
                        $span_ok.hide();
                    }
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