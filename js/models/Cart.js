/**
 * Customer's cart
 * @property {string || null} restaurantId (private) Which restaurant the customer wants to place an order to
 * @property {Map<string, number>} items (private) Dictionary mapping MenuItems Ids to the quantity of it being ordered
 * @author Marjorie D.
 */
class Cart {
    #restaurantId;
    #items;

    constructor() {
        this.#restaurantId = "";
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
     * Adds a new item to the cart, if the cart is empty OR that item is from the same restaurant as the other items in the cart
     * @param {MenuItem} menuItem Menu item to be added
     * @param {number} qty How many of that item is added to the cart
     * @returns if the item was successfully added
     */
    addItem(menuItem, qty) {
        if (this.#restaurantId != null && this.#restaurantId !== "" && this.#restaurantId !== menuItem.restaurantId) {
            return false;
        }
        else if (this.#restaurantId == null || this.#restaurantId === "") {
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
        if (this.#items.get(menuItemId) !== undefined) {
            this.#items.delete(menuItemId);

            if (this.#items.size === 0) {
                this.#restaurantId = "";
            }

            return true;
        }

        return false;
    }

    /**
     * Increases the quantity of an item in the cart
     * @param {string} menuItemId Which menu item to increase the quantity of
     * @param {number} qty by how much (min: 1)
     * @returns if the quantity was successfully increased
     */
    increaseItemQuantity(menuItemId, qty = 1) {
        if (qty < 1) {
            return false;
        }

        let oldQty = this.#items.get(menuItemId);

        if (oldQty !== undefined) {
            this.#items.set(menuItemId, parseInt(oldQty) + qty)
            return true;
        }

        return false;
    }

    /**
     * Decreases the quantity of an item in the cart
     * @param {string} menuItemId Which menu item to decrease the quantity of
     * @param {number} qty by how much (min: 1)
     * @returns if the quantity was successfully decreased
     */
    decreaseItemQuantity(menuItemId, qty) {
        if (qty < 1) {
            return false;
        }

        let oldQty = this.#items.get(menuItemId);
        
        if (oldQty !== undefined && (parseInt(oldQty) === 1 || qty >= parseInt(oldQty))) {  
            return removeItem(menuItemId);
        }
        else if (oldQty !== undefined) {
            this.#items.set(menuItemId, parseInt(oldQty) - qty);
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
     * @returns if the cart is empty
     */
    isEmpty() {
        return this.#items.size === 0;
    }

    /**
     * Empties the cart & clears the restaurantId tracker
     */
    clear() {
        this.#items.clear();
        this.#restaurantId = "";
    }
}