$(function() {
    Controls = function() {
        return {
            getParameterByName: function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            },
            removeParam: function(key, sourceURL) {
                var rtn = sourceURL.split("?")[0],
                    param,
                    params_arr = [],
                    queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
                if (queryString !== "") {
                    params_arr = queryString.split("&");
                    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                        param = params_arr[i].split("=")[0];
                        if (param === key) {
                            params_arr.splice(i, 1);
                        }
                    }
                    rtn = rtn + "?" + params_arr.join("&");
                }
                return rtn;
            },
            getFirst: function() {
              return 1;
            },
            getPrevious: function(page) {
                page = parseInt(page);
                page = page - 1;
                return page;
            },
            getNext: function(page) {
                page = parseInt(page);
                page = page + 1;
                return page;
            },
            getLast: function() {
                var maxPages = $("#paginationMaxPages").val().trim() || 0;
                if (maxPages > 0) {
                    return maxPages;
                }
                return 1;
            }
        }
    }

    $(".pagination li").click(function(e) {
        e.preventDefault();        
        var currentPage = Controls().getParameterByName("page") || 1,
            clazz = $(this).attr("class"),
            page = $(this).find("a").text() ||  1,
            url = window.location.href;

        if (url.indexOf("page") > -1) {
            url = Controls().removeParam("page", url);
        }

        if (clazz === "off") return false;

        if (clazz !== undefined) {
            switch(clazz) {
                case "first":
                    page = Controls().getFirst();
                    break;
                case "last":
                    url = $(".last a").attr('href');
                    if (url)
                        window.location.href = url;
                    return false;
                    break;
                case "next":
                    page = Controls().getNext(currentPage);
                    break;
                case "previous":
                    page = Controls().getPrevious(currentPage);
                    break;
                default:
                    page = currentPage;
                    break;
            }
        }

        url.indexOf("?") > -1 ? url = url + "&page=" + page : url = url + "?page=" + page;
        window.location.href = url;
    });
});