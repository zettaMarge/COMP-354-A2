import { restaurants } from "./seedData.js";

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
}

export default DataStore;
