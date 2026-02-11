import { ProductDatabase } from './database/ProductDatabase.js';
import { HeaderView } from './Views/HeaderView.js';
import { ProductView } from './Views/ProductView.js';
import { Cart } from './types/cart.js';
import { CartView } from './Views/CartView.js';

class Main {
    constructor() {
        this.categories = [];
        this.headerView = new HeaderView();
        this.productView = new ProductView();
        this.cart = new Cart();
        this.cartView = new CartView();
        this.init();
    }

    async init() {
        this.categories = await ProductDatabase.getAllData();
        this.headerView.render(this.categories, (target) => this.handleNavigation(target));
        this.handleNavigation('home');
        this.updateCartDisplay();
    }

    handleNavigation(target) {
        let productsToShow = [];

        if (target === 'home') {
            this.categories.forEach(cat => {
                const featured = cat.getProducts().filter(p => p.featured);
                productsToShow = [...productsToShow, ...featured];
            });
        } else {
            const selectedCategory = this.categories.find(c => c.name === target);
            if (selectedCategory) {
                productsToShow = selectedCategory.getProducts();
            }
        }

        this.productView.render(productsToShow, (product) => this.addToCart(product));
    }

    addToCart(product) {
        this.cart.addItem(product);
        this.updateCartDisplay();
    }

    removeFromCart(productId) {
        this.cart.removeItem(productId);
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        this.cartView.render(
            this.cart.getItems(),
            this.cart.getTotal(),
            (id) => this.removeFromCart(id)
        );
    }
}

new Main();