export class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const existing = this.items.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ product, quantity: 1 });
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    getItems() {
        return this.items;
    }
}