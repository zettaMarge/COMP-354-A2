import { Order } from "./order.js";
import { OrderItem } from "./orderItem.js";
import { OrderService } from "./services/OrderService.js";
import { DataStore } from "./data/DataStore.js";

// Create a DataStore and  an OrderService
const dataStore = new DataStore();
const orderService = new OrderService(dataStore);

// Reset sample orders when the restaurant page loads
localStorage.removeItem("orders");

// Store the orders that will be displayed
const orders = [];

// Set the restaurant's name
let restaurantName = "Best Restaurant";

// Create sample order #1
const order1 = new Order(
    "1",
    restaurantName,
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

// Save and add the first order
dataStore.saveOrder(order1);
orders.push(order1);

// Create sample order #2
const order2 = new Order(
    "2",
    restaurantName,
    "Bobby",
    [
        new OrderItem(2, "Americano", 2.00, 1)
    ],
    new Date("2026-10-19T08:00:00"),
    "RECEIVED",
    new Date("2026-10-19T07:30:00"),
    false
);

// Save and add the second order
dataStore.saveOrder(order2);
orders.push(order2);

// Find the HTML container
const ordersContainer = document.getElementById("orders-container");

// Display each order
orders.forEach(function(order) {

    // Create a section for the order
    const orderElement = document.createElement("section");

    // Calculate the total price
    const total = order.getTotal();

    // Create the list of items
    const itemsForHTML = order.items.map(function(item) {
        return `<li>${item.name} x ${item.quantity} --- ${item.unitPrice}$</li>`;
    }).join("");

    // Display the order information
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
            <p>Status: <span class="order-status">${order.status}</span></p>

            ${order.status !== "COMPLETED"
                ? '<button class="update-status">Update Status</button>'
                : ''}
        </div>
    `;

    // Add the order to the page
    ordersContainer.appendChild(orderElement);

    // Find the status text and Update Status button
    const statusText = orderElement.querySelector(".order-status");
    const updateButton = orderElement.querySelector(".update-status");

    // Update the order when the button is clicked
    if (updateButton) {
        updateButton.addEventListener("click", function() {

            // Update and save the order status
            const updatedOrder = orderService.updateStatus(order.id);

            // Display the new status
            statusText.textContent = updatedOrder.status;

            // Hide the button if the order is completed
            if (updatedOrder.status === "COMPLETED") {
                updateButton.remove();
            }
        });
    }
});
