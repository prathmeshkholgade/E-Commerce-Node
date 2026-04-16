document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.querySelectorAll(".remove-item-button");
    const checkOutBtn = document.querySelector(".checkout-btn");
    const cartForms = document.querySelectorAll(".cart-quantity-form");


    removeButtons.forEach((btn) => {
        btn.addEventListener("click", async () => {
            try {
                const itemId = btn.dataset.item_id;
                const res = await axios.delete(`/cart/item/${itemId}`);
                console.log(res.data);
                if (res.status === 200) {
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        });
    });

    checkOutBtn.addEventListener("click", async (e) => {
        try {
            const res = await axios.post("/payment/create-payment");
            window.location.href = res.data.url
        } catch (e) {
            console.log(e);
        }
    });


    cartForms.forEach((form) => {
        const input = form.querySelector("input");

        input.addEventListener("change", async (e) => {

            // alert("change")
            const quantity = e.target.value;
            const cartItemId = form.dataset.cartItemId;
            //    alert(cartItemId);
            console.log(`cart id ${cartItemId}`);
            console.log(`qty id ${quantity}`);
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


});






