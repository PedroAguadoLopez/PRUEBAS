export class ProductView {
    constructor() {
        this.container = document.getElementById('product-list');
    }

    getImageUrl(productName) {
        const images = {
            'Manzanas': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=60',
            'Salmón': 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=500&q=60',
            'Aguacates': 'https://images.unsplash.com/photo-1612506266679-606568a33215?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'Aceite': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=60',
            'Pasta': 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=500&q=60',
            'Arroz': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=60',
            'Refresco': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60',
            'Cerveza': 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=500&q=60',
            'Agua': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=60',
            'Detergente': 'https://plus.unsplash.com/premium_photo-1664372899356-3d9dc566fba2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'Lavavajillas': 'https://plus.unsplash.com/premium_photo-1661320883845-7136ac7ff7ca?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        };

        const key = Object.keys(images).find(k => productName.includes(k));
        return key ? images[key] : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60';
    }

    render(products, onAddClick) {
        this.container.innerHTML = '';

        if (products.length === 0) {
            this.container.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const imageUrl = this.getImageUrl(p.name);
            
            card.innerHTML = `
                <div class="product-img-container">
                    <img src="${imageUrl}" alt="${p.name}" class="product-img">
                    ${p.featured ? '<span class="featured-badge">Destacado</span>' : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${p.category}</span>
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${p.price.toFixed(2)} €</span>
                        <button class="add-btn">Añadir</button>
                    </div>
                </div>
            `;
            
            const btn = card.querySelector('.add-btn');
            btn.addEventListener('click', () => onAddClick(p));

            this.container.appendChild(card);
        });
    }
}