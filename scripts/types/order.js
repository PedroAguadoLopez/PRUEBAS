export class Order {
    constructor(id, items, total) {
        this.id = id;
        this.items = [...items]; 
        this.total = total;
        this.date = new Date();
        this.status = 'Completado';
    }

    getFormattedDate() {
        return this.date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}