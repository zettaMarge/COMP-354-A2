// import
import { Order } from "./js/order.js";
import { OrderItem } from "./js/orderItem.js";

// order array
const orders = [];

const order1 = new Order (
    1, 10, "Rob", 
    [
        new OrderItem(23, "Fried Chicken", 15.00 ,1),
        new OrderItem(50, "Cola", 3.00, 2)
    ],
    "5:00PM", "PREPARING", "2026.10.18", false
);
// add to order array
orders.push(order1);


const order2 = new Order (
    2, 15, "Robbie", 
    [
        new OrderItem(2, "Latte", 3.00, 1)
    ],
    "3:00PM", "RECEIVED", "2026.10.19",false
);
// add to order array
orders.push(order2);
    


// find container from html
const ordersContainer = document.getElementById("orders-container");

// for each order
orders.forEach(function (order) {

    // create html section
    const orderElement = document.createElement("section");

    // get total of the order
    const total = order.getTotal();

    // get food list items
    const itemsForHTML = order.items.map(function(item) {
        return `<li>${item.name} x ${item.quantity} --- ${item.unitPrice}$</li>`
    }).join("");
    
    // put info inside
    orderElement.innerHTML = `
    <div class="order">
        <h2>Order #${order.orderId}</h2>
        <p>Restaurant: ${order.restaurantId}</p>
        <p>Date: ${order.createdAt}</p>
        <p>Pickup Time: ${order.pickupTime}</p>

        <h4>Items</h4>
        <ul>
            ${itemsForHTML}
        </ul>
        <br>

        <p>Total: ${total}$</p>
        <p>Status: ${order.status}</p>
    </div>
    `

    // add it to HTML container
    ordersContainer.appendChild(orderElement);
})



