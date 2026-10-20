import { restaurants } from "./seedData.js";
import { Order } from "../order.js";
import { OrderItem } from "../orderItem.js";

/**
 * Gives the rest of the app access to the platform's data.
 * For now restaurants come from seedData.js, so these methods are static and can be used
 * without creating a DataStore (ex: DataStore.getRestaurant("r1")).
 *
 * Saving and loading orders and the cart (saveOrder, getOrder, getOrdersForRestaurant,
 * loadCart, saveCart) still need to be added by whoever works on those PBIs.
 * @author Jerwin C.
 */
export class DataStore {
    /**
     * Creates a DataStore using localStorage
     * @param {object} storage where orders are saved
     */
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    /**
     * @returns every restaurant on the platform
     */
    static getRestaurants() {
        return restaurants;
    }

    /**
     * @param {string} id Id of the restaurant to look for
     * @returns the matching Restaurant, or undefined if there is no restaurant with that id
     */
    static getRestaurant(id) {
        return restaurants.find((restaurant) => restaurant.id === id);
    }

    /**
     * Finds an order using its ID
     * @param {string} id Id of the order to look for
     * @returns the matching Order, or undefined if ther order does not exist
     */
    getOrder(id) {
        // Get the saved orders from localStorage
        const savedOrders = this.storage.getItem("orders");

        // Check if there are any saved orders
        if(!savedOrders) {
            return undefined;
        }

        // Convert the saved orders into an array
        const orders = JSON.parse(savedOrders);

        // Find the order using its id
        const orderData = orders.find((order) => order.id === id);

        // Check if the order exists
        if(!orderData) {
            return undefined;
        }

        // Rereate each item as an OrderItem object
        const items = orderData.items.map((item) => {
            return new OrderItem(
                item.menuItemId,
                item.name,
                item.unitPrice,
                item.quantity
            );
        })

        // Recreate the Order object (give them access to methods in order.js)
        return new Order(
            orderData.id,
            orderData.restaurantId,
            orderData.customerName,
            items,
            new Date(orderData.pickupTime),
            orderData.status,
            new Date(orderData.createdAt),
            orderData.seenByStaff
        );
    }

    /**
     * Saves an order to the list of orders
     * @param {Order} order Order to save
     */
    saveOrder(order) {
        // Get the saved orders from localStorage
        const savedOrders = this.storage.getItem("orders");

        // Create an empty asrray
        let orders = [];

        // Load the saved orders if there are any
        if(savedOrders) {
            orders = JSON.parse(savedOrders);
        }

        // Find the order's position in the array
        const index = orders.findIndex((item) => item.id === order.id);

        if(index !== -1) {
            // Replace the existing order
            orders[index] = order;
        } else {
            // Add a new order
            orders.push(order);
        }

        // Save the orders to localStorage
        this.storage.setItem("orders", JSON.stringify(orders));
    }
}

export default DataStore;