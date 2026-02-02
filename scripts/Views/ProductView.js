export class ProductView {
    constructor() {
        this.container = document.getElementById('product-list');
    }

    render(products) {
        this.container.innerHTML = '';

        if (products.length === 0) {
            this.container.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-info">
                    <div style="display:flex; justify-content:space-between">
                        <span class="product-category">${p.category}</span>
                        ${p.featured ? '<span class="featured-badge">Destacado</span>' : ''}
                    </div>
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${p.price.toFixed(2)} €</span>
                        <button class="add-btn">Añadir</button>
                    </div>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
}