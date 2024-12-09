document.addEventListener("DOMContentLoaded", () => {
	const numProductsInput = document.getElementById("numProducts");
	const productRowsContainer = document.getElementById("productRows");

	// Function to create a product row
	function createProductRow(index) {
		return `
            <div class="row product-row">
                <div class="mb-3 col-md-4">
                    <label for="itemName-${index}" class="form-location">Item ${index}</label>
                    <input
                        id="itemName-${index}"
                        name="products[${index}][itemName]"
                        placeholder=""
                        type="text"
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-2 col-md-4">
                    <label for="quantity-${index}" class="form-country">Quantity</label>
                    <input
                        id="quantity-${index}"
                        name="products[${index}][quantity]"
                        placeholder=""
                        type="text"
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-2 col-md-4">
                    <label for="expiresAt-${index}" class="form-country">Expires At</label>
                    <input
                        id="expiresAt-${index}"
                        name="products[${index}][expireDate]"
                        type="date"
                        class="form-control"
                        required
                    />
                </div>
            </div>`;
	}

	// Event listener to generate rows based on the number input
	numProductsInput.addEventListener("input", () => {
		const numProducts = parseInt(numProductsInput.value, 10);

		// Clear existing rows
		productRowsContainer.innerHTML = "";

		if (numProducts > 0) {
			for (let i = 1; i <= numProducts; i++) {
				productRowsContainer.innerHTML += createProductRow(i);
			}
		}
	});
});
//choose location on map

// Initialize the map and set its view
const map = L.map("map").setView([12.9675794, 77.7139906], 13); // Default center (London)

// Add a draggable marker to the map
const marker = L.marker([77.7140693, 12.9677017], { draggable: true }).addTo(
	map
);
//  marker.setLatLng([77.7140693,  12.9677017]); // Move the marker
//  displayLocation(77.7140693,  12.9677017);

// Add a tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Display initial location
const displayLocation = (lat, lng) => {
	document.getElementById("latitude").value = lat;
	document.getElementById("longitude").value = lng;
};
displayLocation(77.7140693, 12.9677017);

// Update location details when the marker is dragged
marker.on("dragend", function () {
	const position = marker.getLatLng();
	displayLocation(position.lat, position.lng);
});

// Allow users to click on the map to update the marker's position
map.on("click", function (event) {
	const { lat, lng } = event.latlng;
	marker.setLatLng([lat, lng]); // Move the marker
	displayLocation(lat, lng); // Update location details
});
// Add the search control (Leaflet Control Geocoder)
L.Control.geocoder({
	defaultMarkGeocode: false, // Disable auto marker creation
})
	.on("markgeocode", function (e) {
		const latLng = e.geocode.center; // Get the selected location's coordinates
		marker.setLatLng(latLng); // Move the marker to the searched location
		map.setView(latLng, 13); // Center the map on the selected location
		displayLocation(latLng.lat, latLng.lng); // Update location details
	})
	.addTo(map);

// References to elements
const mapContainer = document.getElementById("map-container");
const chooseLocationBtn = document.getElementById("choose-location-btn");
const overlay = document.getElementById("overlay");

// Toggle map visibility on button click
chooseLocationBtn.addEventListener("click", (e) => {
	e.preventDefault();
	mapContainer.style.display = "block"; // Show the map
	map.invalidateSize(); // Ensure map renders correctly
	chooseLocationBtn.style.display = "none";
	overlay.style.display = "block"; // Show the overlay
});

// Hide map when clicking outside
document.addEventListener("click", (event) => {
	if (
		!mapContainer.contains(event.target) &&
		event.target !== chooseLocationBtn
	) {
		mapContainer.style.display = "none"; // Hide the map
		chooseLocationBtn.style.display = "block";
		overlay.style.display = "none";
	}
});
