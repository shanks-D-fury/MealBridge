document.addEventListener("DOMContentLoaded", function () {
	const packageElements = document.querySelectorAll(".package-item");
	packageElements.forEach((packageElement) => {
		const package = JSON.parse(packageElement.getAttribute("data-package"));
		const index = packageElement.getAttribute("data-index");
		mapboxgl.accessToken = mapToken;
		const map = new mapboxgl.Map({
			container: `map${index}`, // container ID
			center: package.geometry.coordinates, // starting position [lng, lat]
			zoom: 10, // starting zoom
		});

		const marker = new mapboxgl.Marker({ color: "red" })
			.setLngLat(package.geometry.coordinates)
			.addTo(map);
	});
});
