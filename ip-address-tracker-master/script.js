let main = document.querySelector("main");

let apiKey = `at_MWEu3AJfD39uMlqoddaxjZI7ZlbAv`;
let apiURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`;

let gatherData = async (url) => {
  main.innerHTML = `<p class="loader">Loading...</p>`;
  const res = await fetch(url);
  const data = await res.json();

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
gatherData(apiURL);
