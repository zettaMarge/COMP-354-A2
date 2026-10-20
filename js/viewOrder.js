import { Order } from "./order.js";
import { OrderItem } from "./orderItem.js";
import { DataStore } from "./data/DataStore.js";

// Create a DataStore
const dataStore = new DataStore();

// Store the orders that will be displayed
const orders = [];

// Create a sample order #1
const order1 = new Order(
    "1",
    "Best Restaurant",
    "Rob",
    [
        new OrderItem(23, "Fried Chicken", 15.00, 1),
        new OrderItem(50, "Cola", 3.00, 2)
    ],
    new Date("2026-10-18T17:00:00"),
    "PREPARING",
    new Date("2026-10-18T12:00:00"),
    false
);

// Save the sample order only if it does not exist
if (!dataStore.getOrder(order1.id)) {
    dataStore.saveOrder(order1);
}

// Load the saved order
orders.push(dataStore.getOrder(order1.id));

// Create a sample order #2
const order2 = new Order(
    "2",
    "Best Restaurant",
    "Bobby",
    [
        new OrderItem(2, "Americano", 2.00, 1)
    ],
    new Date("2026-10-19T08:00:00"),
    "RECEIVED",
    new Date("2026-10-19T07:30:00"),
    false
);

// Save the sample order only if it does not exist
if (!dataStore.getOrder(order2.id)) {
    dataStore.saveOrder(order2);
}

// Load the saved order
orders.push(dataStore.getOrder(order2.id));

// Find the container from HTML
const ordersContainer = document.getElementById("orders-container");

// Display each order
orders.forEach(function(order) {

    // Create HTML section
    const orderElement = document.createElement("section");

    // Get total of the order
    const total = order.getTotal();

    // Get food list items
    const itemsForHTML = order.items.map(function(item) {
        return `<li>${item.name} x ${item.quantity} --- ${item.unitPrice}$</li>`;
    }).join("");

    // Put order information inside
    orderElement.innerHTML = `
        <div class="order">
            <h2>Order #${order.id}</h2>
            <p>Restaurant: ${order.restaurantId}</p>
            <p>Date: ${order.createdAt.toLocaleDateString()}</p>
            <p>Pickup Time: ${order.pickupTime.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            })}</p>

            <h4>Items</h4>
            <ul>
                ${itemsForHTML}
            </ul>
            <br>

            <p>Total: ${total}$</p>
            <p>Status: ${order.status}</p>
        </div>
    `;

    // Add it to the HTML container
    ordersContainer.appendChild(orderElement);
});
