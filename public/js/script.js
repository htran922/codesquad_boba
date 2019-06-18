/***************************** Google Map ****************************/
function initMap() {
    var center = {lat: 42.3501, lng: -71.0624};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center
    });
    var marker = new google.maps.Marker({
        position: center,
        map: map
    });
}

/***************************** Log In ****************************/
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}