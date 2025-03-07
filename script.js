let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Clear existing items
    cartItems.innerHTML = '';
    
    // Add items to the cart list
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - RD$ ${item.price}`;
        
        // Add a remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeItem(index);
        li.appendChild(removeButton);
        
        cartItems.appendChild(li);
    });
    
    // Update total
    cartTotal.textContent = total;
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function resetCart() {
    cart = [];
    total = 0;
    updateCart();
}

function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    
    if (cart.length === 0) {
        alert('Por favor, agregue artículos al carrito antes de confirmar la orden.');
        return;
    }
    
    if (!name || !address) {
        alert('Por favor, ingrese su nombre y dirección.');
        return;
    }
    
    // Prepare the order details
    const orderDetails = cart.map(item => `${item.name} - RD$ ${item.price}`).join('%0A'); // %0A is a newline in URL encoding
    const message = `Hola, soy ${name}.%0A%0AMi dirección es: ${address}.%0A%0AMi pedido es:%0A${orderDetails}%0A%0ATotal: RD$ ${total}.%0A%0A¡Gracias!`;
    
    // WhatsApp API link
    const phoneNumber = "8292848385"; // Replace with your WhatsApp business number
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
    
    // Reset the cart and form
    resetCart();
    document.getElementById('order-form').reset();
}