document.addEventListener("DOMContentLoaded", function () {
	const packageElement = document.querySelector(".package-item ");
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

document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("mapModal");
	const mainContent = document.querySelector("body"); // Adjust selector to target the main content area.
	const openButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
	const closeButton = modal.querySelector('[data-bs-dismiss="modal"]');

	openButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// Show modal
			modal.removeAttribute("aria-hidden");
			modal.removeAttribute("inert");
			mainContent.setAttribute("aria-hidden", "true");
			mainContent.setAttribute("inert", "");

			// Move focus to modal
			const focusable = modal.querySelector("button, a, input, [tabindex='0']");
			if (focusable) focusable.focus();
		});
	});

	closeButton.addEventListener("click", () => {
		// Hide modal
		modal.setAttribute("aria-hidden", "true");
		modal.setAttribute("inert", "");
		mainContent.removeAttribute("aria-hidden");
		mainContent.removeAttribute("inert");

		// Return focus to the triggering button
		const lastTrigger = document.activeElement;
		if (lastTrigger) lastTrigger.focus();
	});
});
