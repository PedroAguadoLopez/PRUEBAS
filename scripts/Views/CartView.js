export class CartView {
    constructor() {
        this.container = document.getElementById('cart-items');
        this.totalContainer = document.getElementById('cart-total');
    }

    render(items, total, onRemove) {
        this.container.innerHTML = '';
        
        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.product.name}</strong>
                    <span>x${item.quantity} - ${(item.product.price * item.quantity).toFixed(2)} €</span>
                </div>
                <button class="remove-btn">Eliminar</button>
            `;

            row.querySelector('.remove-btn').onclick = () => onRemove(item.product.id);
            this.container.appendChild(row);
        });

        this.totalContainer.textContent = `${total.toFixed(2)} €`;
    }
}