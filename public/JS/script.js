(() => {
	"use strict";

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false
		);
	});
})();

function toggleWidget(widget) {
	// Get the content and image inside the clicked widget
	var content = widget.querySelector(".content");
	var toggleimg = widget.querySelector(".toggleimg");

	// Check if content is collapsed or expanded
	if (content.style.height === "" || content.style.height === "0px") {
		content.style.height = content.scrollHeight + "px"; // Expand
		toggleimg.src = "/images/cross.svg"; // Change image to cross when expanded
	} else {
		content.style.height = "0px"; // Collapse
		toggleimg.src = "/images/plus.svg"; // Change image to plus when collapsed
	}
}
