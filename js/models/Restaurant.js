/**
 * A restaurant on the platform, along with its menu
 * @property {string} id Unique id of the restaurant
 * @property {string} name Name of the restaurant
 * @property {string} type What kind of restaurant it is (ex: "Sushi", "Pizza")
 * @property {string} description Short description shown under the name
 * @property {string} bannerUrl Optional banner picture, empty string if there is none
 * @property {string} address Where customers pick up their orders
 * @property {string} hours Working hours, as displayed to customers
 * @property {MenuItem[]} menuItems Every item on the menu, including unavailable ones
 * @author Jerwin C.
 */
export class Restaurant {
    constructor(id, name, type, description, bannerUrl, address, hours, menuItems = []) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.bannerUrl = bannerUrl;
        this.address = address;
        this.hours = hours;
        this.menuItems = menuItems;
    }

    /**
     * @returns the menu items customers can currently order
     */
    getAvailableItems() {
        return this.menuItems.filter((item) => item.available === true);
    }

    /**
     * Looks for an item on the menu, even if it's currently unavailable
     * @param {string} itemId Id of the menu item to look for
     * @returns the matching MenuItem, or undefined if there is no item with that id
     */
    findItem(itemId) {
        return this.menuItems.find((item) => item.id === itemId);
    }

    /**
     * @returns if the restaurant has a banner picture to show
     */
    hasBanner() {
        return typeof this.bannerUrl === "string" && this.bannerUrl.trim() !== "";
    }
}

export default Restaurant;