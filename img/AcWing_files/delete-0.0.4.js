function setDeleteUrl(delete_url) {
    $('#modal_danger_delete_url').attr('action', delete_url);
}

$(document).ready(function () {
    let $btn = $('#modal_danger_delete_url_btn');

    $btn.on("click", function(){
        let $form = $('#modal_danger_delete_url');
        let postData = $form.serializeArray();
        let formUrl = $form.attr("action");

        if (formUrl.indexOf("comment") >= 0) return true;  // 解决与删除评论的冲突
        if (formUrl.indexOf("notification") >= 0) return true;  // 解决与删除通知的冲突

        $.ajax({
            url: formUrl,
            type: "POST",
            data: postData,
            dataType: "Json",
            cache: false,
            timeout: 60000,
            success: function(resp){
                if (resp.error_message === "success"){
                    if (typeof modal_danger_delete_callback_url !== "undefined") {
                        window.location.href = modal_danger_delete_callback_url;  // 如果有回调地址，则跳到回调地址上
                    } else {
                        window.location.href = '/';
                    }
                }
            },
            error: function(){
            }
        });

        return true;
    });
});