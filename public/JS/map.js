document.addEventListener("DOMContentLoaded", function () {
	const packageElement = document.querySelector(".package-item ");
	const package = JSON.parse(packageElement.getAttribute("data-package"));

	mapboxgl.accessToken = mapToken;
	const map = new mapboxgl.Map({
		container: "map", // container ID
		center: package.geometry.coordinates, // starting position [lng, lat]
		zoom: 10, // starting zoom
	});

	const marker = new mapboxgl.Marker({ color: "red" })
		.setLngLat(package.geometry.coordinates)
		.addTo(map);
});
