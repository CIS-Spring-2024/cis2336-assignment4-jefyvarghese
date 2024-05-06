function submitOrder(event) {
    event.preventDefault(); // Prevent form submission
   
    // Validate order inputs
    var inputs = document.querySelectorAll('#order-form input[type="number"]');
    var isValid = true; // Set isValid to true initially
   
    var orderSummary = ""; // Initialize the order summary
   
    inputs.forEach(function(input) {
        var quantity = parseInt(input.value);
        if (isNaN(quantity) || quantity < 0 || quantity > 10) {
            // If any input is invalid, mark it as invalid and set isValid to false
            isValid = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
            if (quantity > 0) {
                // If the quantity is greater than 0, add the item to the order summary
                var itemName = input.name.replace('_', ' ');
                orderSummary += quantity + " x " + itemName + "\n";
            }
        }
    });
   
    if (isValid) {
        // If the inputs are valid, ask for confirmation
        var confirmMessage = "You have selected the following items:\n\n" + orderSummary + "\nDo you want to confirm the order?";
        if (confirm(confirmMessage)) {
            // If the user confirms the order, submit it to the server
            submitOrderToServer(orderSummary);
        } else {
            // If the user cancels the order, display a message
            alert('Order canceled.');
        }
    } else {
        // If any input is invalid, show error message to the user
        alert('Please enter valid quantities (0-10) for each item.');
    }
}


function submitOrderToServer(orderSummary) {
    // Make a POST request to the server to submit the order
    fetch('/submitOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderSummary: orderSummary })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Failed to submit order');
        }
    })
    .then(data => {
        alert(data); // Display the response from the server
    })
    .catch(error => {
        console.error('Error:', error);
        alert('order submitted, Thank you!');
    });
}





