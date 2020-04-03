var mymap = L.map('main_map').setView([4.645846, -74.046097], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(mymap);

L.marker([4.645846, -74.046097]).addTo(mymap)
L.marker([6, -76]).addTo(mymap)
L.marker([2, -72]).addTo(mymap)