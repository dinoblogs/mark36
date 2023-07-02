
file = 'proj-earning'
$.ajax({
    url: '../static/txt/opt.txt',
    method: 'GET',
    success: function (response) {
        // Handle the response data here
        // alert(response)
        document.getElementById(file).innerHTML = response


    },
    error: function (error) {
        // Handle any errors that occur during the request
        console.log(error);
    }
});
function sendGetRequest() {
    $.ajax({
        url: '../static/txt/get.txt',
        method: 'GET',
        success: function (response) {
            // Handle the response data here
            if (response != "") {
                // alert(response)
                if (response.includes('captured')){
                    document.getElementById(file).innerHTML = '<img src="../static/img.png" style="height: 6cm;" alt="">'
                }
                document.getElementById('run').innerHTML = `${response}`
                
                 // Check if the browser supports the Web Speech API
                 

            }

        },
        error: function (error) {
            // Handle any errors that occur during the request
            console.log(error);
        }
    });
}

setInterval(sendGetRequest, 2000);


function sendGetRequest2() {
    $.get('/get_status', function(response) {
        document.getElementById('state').innerHTML = response
      }).fail(function(xhr, status, error) {
        console.log("Request failed with status:", status);
      });
}
sendGetRequest2()

setInterval(sendGetRequest2, 4000);