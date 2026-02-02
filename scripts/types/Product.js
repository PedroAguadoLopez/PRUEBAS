export class Product {
    constructor(id, name, price, description, category, featured = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.featured = featured;
    }
}