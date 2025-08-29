
var $Script = $Script || {}; 

//Ajax
(function () {


    function ajaxRequest(url) {
        this.url = url;
        this.type = "POST";
        this.data=null;
        this.headers = {};
        this.contentType = "application/json; charset=utf-8";
        this.dataType = "json";
        this.async = true;
        this.processData = true;
        this.success=null;
        this.error=null;
    }
    
    var ajax = {
        call: function (params) {
            var type = params.type || "POST";
            var ajx = $.ajax({
                type: type,
                timeout: 360000,
                url: params.url,
                data: type === "GET" ? params.data || {} : JSON.stringify(params.data) || {},
                contentType: params.contentType || "application/json; charset=utf-8",
                dataType: params.dataType || "json",
                async: params.async || true,
                headers: params.headers || {},
                processData: params.processData || true,
                success: function (d) {
                    if (params.success) params.success(d);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (params.error) params.error(jqXHR, textStatus, errorThrown);
                }
            });
            return ajx;
        },
        getRequest: function (url) {
            return new ajaxRequest(url);
        }
    };

    Object.freeze(ajax);
    Object.defineProperty($Script, "ajax", {
        value: ajax,
        writable: false
    });

}());