$(function() {

    $('.search').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#searchThing').val();
        getRecommends(searchTerm);
        //$('#searchThing').val('')
        $('.search').get(0).reset()


    });

    $('.sampleLink').on('click', function(event) {
        event.preventDefault();
        var searchTerm = $(this).data('term')
        getRecommends(searchTerm)
    })
})

var getRecommends = function(searchTerm) {
    showLoader();
    var recommends = {
        q: (searchTerm),
        // type: 'books',
        k: '257250-unBored-FZ3AMLVS',
        info: 1,
        limit: 10
    };
    /*var url = 'https://www.tastekid.com/api/similar?q={searchTerm}&type={type}&k={k}&info={info}&limit={limit}'
        .replace('{searchTerm}', recommends.q)
        .replace('{type}', recommends.type)
        .replace('{k}', recommends.k)
        .replace('{info}', recommends.info)
        .replace('{limit}', recommends.limit)*/

    var url = 'https://www.tastekid.com/api/similar'

    $.ajax({
        url: url,
        dataType: 'jsonp',
        data: recommends,
        type: 'GET',
        success: function(response) {
            console.log(response)
            showResults(response.Similar.Results);
            hideLoader();
        },
        error: function(response) {
            console.error(response)
            hideLoader();



        }

    })





    function showResults(results) {
        var html = "";
        $.each(results, function(index, value) {
            html += '<div class = resultItem>'

            html += '<h2>' + value.Name + '</h2>';
            html += '<p>' + value.wTeaser + '</p>'
            html += '<a href ="' + value.wUrl + '">' + value.wUrl + '</a>'
            html += '</div>'
        })
        $('#search-results').html(html);
    }



    function showLoader() {
        $('#loading').show()
    }

    function hideLoader() {
        $('#loading').hide()
    }





}
