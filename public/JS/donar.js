document.addEventListener("DOMContentLoaded", () => {
	const numProductsInput = document.getElementById("numProducts");
	const productRowsContainer = document.getElementById("productRows");

	// Function to create a product row
	function createProductRow(index) {
		return `
            <div class="row product-row" id="product-${index}">
                <hr />
                <div class="mb-3 col-md-4">
                    <label for="itemName-${index}" class="form-location">Item  ${index}</label>
                    <input
                        id="itemName-${index}"
                        name="itemName-${index}"
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
                        name="quantity-${index}"
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
                        name="expiresAt-${index}"
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
