// test
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";

// test w/ 1 item
describe("OrderItem tests", function() {

    test("calculates the subtotal correctly?", function() {
        const item = new OrderItem(23, "Fried Chicken", 15.00, 2);

        expect(item.getSubtotal()).toBe(30);
    });

});


// test w/ multiple items
describe("Order tests", function() {

    test("calculates the total of multiple items", function() {
        const order = new Order(
            1,
            10,
            "Rob",
            [
                new OrderItem(23, "Fried Chicken", 15.00, 1),
                new OrderItem(50, "Cola", 3.00, 2)
            ],
            "5:00PM",
            "PREPARING",
            "2026.10.18",
            false
        );

        expect(order.getTotal()).toBe(21);
    });

    test("returns zero for an order with no items", function() {
        const order = new Order(
            3, 10, "Sam", [],
            "6:00PM", "RECEIVED", "2026.10.20", false
        );

        expect(order.getTotal()).toBe(0);
    });

    test("calculates separate orders independently", function() {
        const order1 = new Order(
            1, 10, "Rob",
            [new OrderItem(23, "Chicken", 15.00, 1)],
            "5:00PM", "PREPARING", "2026.10.18", false
        );

        const order2 = new Order(
            2, 15, "Robbie",
            [new OrderItem(2, "Latte", 3.00, 1)],
            "3:00PM", "RECEIVED", "2026.10.19", false
        );

        expect(order1.getTotal()).toBe(15);
        expect(order2.getTotal()).toBe(3);
    });

});