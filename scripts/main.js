import { ProductDatabase } from './database/ProductDatabase.js';
import { HeaderView } from './VHeaderView.js';
import { ProductView } from './VProductView.js';

class Main {
    constructor() {
        this.categories = [];
        this.headerView = new HeaderView();
        this.productView = new ProductView();
        this.init();
    }

    async init() {
        this.categories = await ProductDatabase.getAllData();
        this.headerView.render(this.categories, (target) => this.handleNavigation(target));
        this.handleNavigation('home');
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

        this.productView.render(productsToShow);
    }
}

new Main();