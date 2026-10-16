/**
 * Customer's cart
 * @property {string || null} restaurantId (private) Which restaurant the customer wants to place an order to
 * @property {Map<string, number>} items (private) Dictionary mapping MenuItems Ids to the quantity of it being ordered
 * @author Marjorie D.
 */
export default class Cart {
    #restaurantId;
    #items;

    constructor() {
        this.#restaurantId = null;
        this.#items = new Map();
    }

    /**
     * @returns which restaurant the cart has items from
     */
    getRestaurantId() {
        return this.#restaurantId;
    }

    /**
     * @returns the items currently in the cart
     */
    getItems() {
        return this.#items;
    }

    /**
     * Adds an item to the cart if the cart is empty OR that item is from the same restaurant as the other items in the cart.
     * If the item is already in the cart then its quantity is increased
     * @param {MenuItem} menuItem Menu item to be added
     * @param {number} qty How many of that item is added to the cart
     * @returns if the item was successfully added
     */
    addItem(menuItem, qty) {
        if (this.#restaurantId != null && this.#restaurantId !== menuItem.restaurantId) {
            return false;
        }

        if (this.#items.has(menuItem.id)) {
            return increaseItemQuantity(menuItem.id, qty);
        }
        
        if (this.#restaurantId == null) {
            this.#restaurantId = menuItem.#restaurantId;
        }

        this.#items.set(menuItem.id, qty);
        return true;
    }

    /**
     * Completely removes an item from the cart
     * @param {string} menuItemId Which menu item to remove
     * @returns if the item was successfully removed
     */
    removeItem(menuItemId) {
        if (this.#items.has(menuItemId)) {
            this.#items.delete(menuItemId);

            if (this.#items.size === 0) {
                this.#restaurantId = null;
            }

            return true;
        }

        return false;
    }

    /**
     * Increases the quantity of an item in the cart
     * @param {string} menuItemId Which menu item to increase the quantity of
     * @param {number} inc by how much (min: 1)
     * @returns if the quantity was successfully increased
     */
    increaseItemQuantity(menuItemId, inc = 1) {
        if (inc < 1) {
            return false;
        }

        if (this.#items.has(menuItemId)) {
            let oldQty = parseInt(this.#items.get(menuItemId));
            this.#items.set(menuItemId, oldQty + inc)
            return true;
        }

        return false;
    }

    /**
     * Decreases the quantity of an item in the cart
     * @param {string} menuItemId Which menu item to decrease the quantity of
     * @param {number} dec by how much (min: 1)
     * @returns if the quantity was successfully decreased
     */
    decreaseItemQuantity(menuItemId, dec = 1) {
        if (dec < 1) {
            return false;
        }

        if (this.#items.has(menuItemId)) {
            let oldQty = parseInt(this.#items.get(menuItemId));

            if (dec >= oldQty) {
                return removeItem(menuItemId);
            }
            
            this.#items.set(menuItemId, oldQty - dec);
            return true;
        }

        return false;
    }

    /**
     * @returns the price total of all the items in the cart
     */
    getTotal() {
        let total = 0;

        this.#items.forEach(function(value, key) {
            let menuItem = DataStore.getRestaurant(this.#restaurantId).findItem(key);
            total += menuItem.price * value;
        });

        return total;
    }

    /**
     * @returns how many items are in the cart
     */
    size() {
        let total = 0;

        this.#items.forEach(function(value, key) {
            total += value;
        });

        return total;
    }

    /**
     * Empties the cart & clears the restaurantId tracker
     */
    clear() {
        this.#items.clear();
        this.#restaurantId = null;
    }
}