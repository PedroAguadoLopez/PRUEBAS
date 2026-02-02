import { Product } from '../tProduct.js';
import { ProductCategory } from '../types/ProductCategory.js';

export class ProductDatabase {
    static async getAllData() {
        try {
            const response = await fetch('./data.json');
            const data = await response.json();
            
            return data.map(catData => {
                const category = new ProductCategory(catData.categoryName);
                
                catData.items.forEach(item => {
                    const newProduct = new Product(
                        item.id,
                        item.name,
                        item.price,
                        item.description,
                        catData.categoryName,
                        item.featured
                    );
                    category.addProduct(newProduct);
                });
                
                return category;
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}