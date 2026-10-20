import { OrderService } from "../services/OrderService.js";
import { DataStore } from "../data/DataStore.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";

function createFakeStorage() {
    // Store the saved information
    const data = {};

    return {
        // Get saved information using its key
        getItem(key) {
            return data[key] || null;
        },

        setItem(key, value) {
            data[key] = value;
        }
    };
}

test("update an order to the next status", () => {
    // Create a DataStore using fake storage
    const dataStore = new DataStore(createFakeStorage());

    // Create an order 
    const order = new Order(
        "1",                                  // Order ID
        "r1",                                 // Restaurant ID
        "Josh",                               // Customer name
        [],                                   // Items in the order
        new Date("2026-10-25T17:00:00"),      // Pickup time
        "RECEIVED",                           // Current status
        new Date(),                           // Date created (current)
        false                                 // Staff has not seen it    
    );

    // Save the order
    dataStore.saveOrder(order);

    // Create the OrderService
    const service = new OrderService(dataStore);

    // Update the order status
    const updatedOrder = service.updateStatus("1");

    // Check if the status was updated
    expect(updatedOrder.status).toBe("PREPARING");
});

test("cannot update an order that does not exist", () => {
    // Create a DataStore using fake storage
    const dataStore = new DataStore(createFakeStorage());

    // Create the OrderService
    const service = new OrderService(dataStore);

    // Check if an error has occur
    expect(() => service.updateStatus("99")).toThrow("Order not found");
})

test("update an order through all statuses", () => {
    // Create a DataStore
    const dataStore = new DataStore(createFakeStorage());

    // Create an order
    const order = new Order(
        "2",
        "r1",
        "Josh",
        [],
        new Date("2026-10-30T17:00:00"),
        "RECEIVED",
        new Date(),
        false
    );

    // Save the order
    dataStore.saveOrder(order);

    // Create the OrderService
    const service = new OrderService(dataStore);

    // First update
    let updatedOrder = service.updateStatus("2");
    expect(updatedOrder.status).toBe("PREPARING");

    // Second update
    updatedOrder = service.updateStatus("2");
    expect(updatedOrder.status).toBe("READY_FOR_PICKUP");

    // Third update
    updatedOrder = service.updateStatus("2");
    expect(updatedOrder.status).toBe("COMPLETED");
});

test("cannot update a completed order", () => {
    // Create a DataStore
    const dataStore = new DataStore(createFakeStorage());

    // Create a completed order
    const order = new Order(
        "3",
        "r1",
        "Josh",
        [],
        new Date("2026-10-30T17:00:00"),
        "COMPLETED",
        new Date(),
        false
    );

    // Save the order
    dataStore.saveOrder(order);

    // Create the OrderService
    const service = new OrderService(dataStore);

    // Check if an error has occured
    expect(() => service.updateStatus("3")).toThrow("Order is already completed");
})

test("restore order items from storage", () => {
    // Create a DataStore using fake storage
    const dataStore = new DataStore(createFakeStorage());

    // Create an order item
    const item = new OrderItem("burger1", "Burger", 10, 2);

    // Create an order containing the item
    const order = new Order(
        "4",
        "r1",
        "Cadence",
        [item],
        new Date("2026-11-11T12:00:00"),
        "RECEIVED",
        new Date(),
        false
    );

    // Save the order
    dataStore.saveOrder(order);

    // Retrieve the order from storage
    const savedOrder = dataStore.getOrder("4");

    // Check that the item is restored correctly
    expect(savedOrder.items[0]).toBeInstanceOf(OrderItem);

    // Check that the total is calculated correctly
    expect(savedOrder.getTotal()).toBe(20);
});