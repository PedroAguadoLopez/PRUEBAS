export class OrderView {
    constructor() {
        this.container = document.getElementById('orders-container');
    }

    render(orders) {
        this.container.innerHTML = '';

        if (orders.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <h3>No tienes pedidos recientes</h3>
                    <p>Tus compras aparecerán aquí.</p>
                </div>`;
            return;
        }

        orders.slice().reverse().forEach(order => {
            const card = document.createElement('div');
            card.className = 'order-card';
            
            const itemsHtml = order.items.map(item => `
                <li class="order-item-row">
                    <span>${item.product.name} x${item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)} €</span>
                </li>
            `).join('');

            card.innerHTML = `
                <div class="order-header">
                    <div class="order-meta">
                        <span class="order-id">Pedido #${order.id}</span>
                        <span class="order-date">${order.getFormattedDate()}</span>
                    </div>
                    <div class="order-status ${order.status.toLowerCase()}">${order.status}</div>
                </div>
                <div class="order-body">
                    <ul class="order-items-list">
                        ${itemsHtml}
                    </ul>
                    <div class="order-total">
                        <span>Total Pagado</span>
                        <span class="total-amount">${order.total.toFixed(2)} €</span>
                    </div>
                </div>
            `;
            this.container.appendChild(card);
        });
    }

    show() {
        this.container.style.display = 'grid';
    }

    hide() {
        this.container.style.display = 'none';
    }
}