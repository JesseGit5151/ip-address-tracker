let main = document.querySelector("main");
let headerInput = document.querySelector("header div input");
let form = document.querySelector('form')
let apiKey = `at_MWEu3AJfD39uMlqoddaxjZI7ZlbAv`;

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main.innerHTML = `<p class="loader">Loading...</p>`;
  let apiURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${headerInput.value}`;
  gatherData(apiURL)
})
main.innerHTML = `<p class="loader">Loading...</p>`;

let map = L.map('map', {
  center: [0, 0],
  zoom: 2
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let marker = L.marker([0, 0],{
  draggable: true,
  autoPan: true,
  icon: blackIcon
}).addTo(map);

let popup = L.popup({className:'test'});
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("This marker is at: " + 'Lat: ' + e.latlng.lat.toString() + '   ' + 'Lng: ' + e.latlng.lng.toString())
        .openOn(map);
}

marker.on('click', onMapClick);

let gatherData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  marker.setLatLng([data.location.lat, data.location.lng])
  main.innerHTML = `<div class="content-container">
                        <div>
                        <h2>IP Address</h2>
                        <p>${data.ip}</p>
                        </div>
                        <div>
                        <h2>Location</h2>
                        <p>${data.location.city}, ${data.location.region}</p>
                        <p>${data.location.postalCode}</p>
                        </div>
                        <div>
                        <h2>Timezone</h2>
                        <p><span>UTC</span> ${data.location.timezone}</p>
                        </div>
                        <div>
                        <h2>ISP</h2>
                        <p>${data.isp}</p>
                        </div>
                        </div>`;
};
gatherData(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${headerInput.value}`)