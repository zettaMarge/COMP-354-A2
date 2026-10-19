class Order {

    constructor(orderId, restaurantId, customerName, items, pickupTime, status, createdAt, seenByStaff) {
        this.orderId = orderId;
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

    }


}