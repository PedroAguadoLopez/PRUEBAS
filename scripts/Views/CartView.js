export class CartView {
    constructor() {
        this.container = document.getElementById('cart-items');
        this.totalContainer = document.getElementById('cart-total');
        this.checkoutBtn = document.querySelector('.checkout-btn');
    }

    render(items, total, onRemove, onCheckout) {
        this.container.innerHTML = '';
        
        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.product.name}</strong>
                    <span>x${item.quantity} - ${(item.product.price * item.quantity).toFixed(2)} €</span>
                </div>
                <button class="remove-btn" data-id="${item.product.id}">×</button>
            `;

            row.querySelector('.remove-btn').onclick = () => onRemove(item.product.id);
            this.container.appendChild(row);
        });

        this.totalContainer.textContent = `${total.toFixed(2)} €`;
        
        const newBtn = this.checkoutBtn.cloneNode(true);
        this.checkoutBtn.parentNode.replaceChild(newBtn, this.checkoutBtn);
        this.checkoutBtn = newBtn;

        this.checkoutBtn.onclick = () => onCheckout();
        
        this.checkoutBtn.disabled = items.length === 0;
        this.checkoutBtn.style.opacity = items.length === 0 ? '0.5' : '1';
        this.checkoutBtn.style.cursor = items.length === 0 ? 'not-allowed' : 'pointer';
    }
}