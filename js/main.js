const ipAddress = document.querySelector('.current-ip');
const currentLocation = document.querySelector('.current-location');
const timeZone = document.querySelector('.current-timezone');
const isp = document.querySelector('.current-isp');
let inputIp = document.querySelector('.input-ip');
const btnSubmit = document.querySelector('.btn-ip');


let map = L.map('map').setView([0, 0], 3);
    
L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=zhJWGuQxWtY3V1Wx57Kf', {
attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

let locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',    
    iconSize: [35, 45],
    iconAnchor: [26.47, 54]
})


btnSubmit.addEventListener('click', (e) => {    
    e.preventDefault();
    loadIps();
    inputIp.value = '';
})


const loadIps = () => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_LvLlDfNQsvHSvq47EiYwDznBvikQT&ipAddress=${inputIp.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
      console.log(data.ip)
      console.log(data.location.country)    
      ipAddress.textContent = data.ip;
      currentLocation.textContent = data.location.city;
      timeZone.textContent = 'UTC' + data.location.timezone;
      isp.textContent = data.isp;

      const lat = data.location.lat;
      const lon = data.location.lng;

      map.setView([lat, lon], 10);
      const marker = L.marker([0, 0], {icon: locationIcon}).addTo(map);
      marker.setLatLng([lat, lon]);
    }).catch((err) => console.log(err))
}


loadIps();







