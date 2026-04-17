

document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.querySelectorAll(".remove-item-button");
    const checkOutBtn = document.querySelector(".checkout-btn");
    const cartForms = document.querySelectorAll(".cart-quantity-form");
    const deleteProductButton = document.querySelector(".delete-product");
    const editProduct = document.querySelector(".edit-product-btn");
    const reviewForm = document.getElementById('review-form');
    const detailForm = document.querySelector('.buy-form');

    removeButtons.forEach((btn) => {
        btn.addEventListener("click", async () => {
            try {
                const itemId = btn.dataset.item_id;
                const res = await axios.delete(`/cart/item/${itemId}`);

                if (res.status === 200) {
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        });
    });

    if (checkOutBtn) {
        checkOutBtn.addEventListener("click", async (e) => {
            try {
                const res = await axios.post("/payment/create-payment");
                window.location.href = res.data.url
            } catch (e) {
                console.log(e);
            }
        });
    }

    cartForms.forEach((form) => {
        const input = form.querySelector("input");

        input.addEventListener("change", async (e) => {
            const quantity = e.target.value;
            const cartItemId = form.dataset.cartItemId;

            try {
                const res = await axios.patch(`/cart/item/${cartItemId}`, {
                    quantity: quantity,
                });
                console.log("Updated:", res.data);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        });
    });

    if (deleteProductButton) {
        deleteProductButton.addEventListener("click", async (e) => {
            const productId = deleteProductButton.dataset.productId;
            if (!productId) return;

            const confirmed = window.confirm("Are you sure you want to delete this product?");
            if (!confirmed) return;

            try {
                const res = await axios.delete(`/product/${productId}`);
                if (res.status === 200 || res.status === 204) {
                    window.location.href = "/product";
                } else {
                    alert("Unable to delete product.");
                }
            } catch (error) {
                console.error(error);
                alert("Unable to delete product right now.");
            }
        });
    }



    if (detailForm) {
        detailForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const productId = detailForm.querySelector('[name="productId"]').value;
            const quantity = detailForm.querySelector('[name="quantity"]').value;

            try {
                const response = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({ productId, quantity }),
                });
                const result = await response.json();
                alert(result.message || 'Added to cart');
            } catch (error) {
                alert('Unable to add to cart right now.');
            }
        });
    }


    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(reviewForm);
            const payload = {
                rating: formData.get('rating'),
                comment: formData.get('comment'),
            };
            const productId = reviewForm.dataset.productId;

            try {
                const response = await fetch(`/review/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message || 'Review submitted');
                    window.location.reload();
                } else {
                    alert(result.message || 'Unable to submit review');
                }
            } catch (error) {
                alert('Unable to submit review right now.');
            }
        });
    }

});






