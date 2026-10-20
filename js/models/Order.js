export class Order {

    constructor(id, restaurantId, customerName, items, pickupTime, status, createdAt, seenByStaff) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.customerName = customerName;
        this.items = items;
        this.pickupTime = pickupTime;
        this.status = status;
        this.createdAt = createdAt;
        this.seenByStaff = seenByStaff;
    }

    // methods
    getTotal() {

        let total = 0;

        this.items.forEach(function(item) {
            total += item.getSubtotal();
        });

        return total;
    }

    advanceStatus() {
        if(this.status === "RECEIVED") {
            this.status = "PREPARING";
        } else if (this.status === "PREPARING") {
            this.status = "READY_FOR_PICKUP";
        } else if (this.status === "READY_FOR_PICKUP") {
            this.status = "COMPLETED";
        } else if(this.status === "COMPLETED") {
            throw new Error("Order is already completed.");
        }
    }
}