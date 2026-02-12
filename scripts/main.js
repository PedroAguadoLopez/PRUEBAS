import { ProductDatabase } from './database/ProductDatabase.js';
import { HeaderView } from './Views/HeaderView.js';
import { ProductView } from './Views/ProductView.js';
import { Cart } from './types/cart.js';
import { CartView } from './Views/CartView.js';
import { Order } from './types/order.js';
import { OrderView } from './Views/OrderView.js';

class Main {
    constructor() {
        this.categories = [];
        this.orders = [];
        this.orderIdCounter = 1001; 
        
        this.headerView = new HeaderView();
        this.productView = new ProductView();
        this.cart = new Cart();
        this.cartView = new CartView();
        this.orderView = new OrderView();
        
        this.init();
    }

    async init() {
        this.categories = await ProductDatabase.getAllData();
        this.headerView.render(this.categories, (target) => this.handleNavigation(target));
        this.handleNavigation('home');
        this.updateCartDisplay();
    }

    handleNavigation(target) {
        const productList = document.getElementById('product-list');
        
        if (target === 'orders') {
            productList.style.display = 'none';
            this.orderView.show();
            this.orderView.render(this.orders);
        } else {
            this.orderView.hide();
            productList.style.display = 'grid';
            
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
    }

    addToCart(product) {
        this.cart.addItem(product);
        this.updateCartDisplay();
    }

    removeFromCart(productId) {
        this.cart.removeItem(productId);
        this.updateCartDisplay();
    }

    handleCheckout() {
        if (this.cart.getItems().length === 0) return;

        const newOrder = new Order(
            this.orderIdCounter++,
            this.cart.getItems(),
            this.cart.getTotal()
        );

        this.orders.push(newOrder);
        this.cart.clear();
        this.updateCartDisplay();
        
        document.querySelector('[data-target="orders"]').click();
    }

    updateCartDisplay() {
        this.cartView.render(
            this.cart.getItems(),
            this.cart.getTotal(),
            (id) => this.removeFromCart(id),
            () => this.handleCheckout()
        );
    }
}

new Main();