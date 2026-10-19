class OrderItem {
    constructor(menuItemId, name, unitPrice, quantity) {
        this.menuItemId = menuItemId;
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    getSubtotal() {
        return this.quantity * this.unitPrice;
    }
}