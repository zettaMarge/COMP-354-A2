export class OrderService {

    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    updateStatus(orderId) {
        // Find the order
        const order = this.dataStore.getOrder(orderId);

        // Check if the order exists
        if(!order) {
            throw new Error("Order not found");
        }

        // Move to the next status
        order.advanceStatus();

        // Save the updated order
        this.dataStore.saveOrder(order);

        return order;
    }
}