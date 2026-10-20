/**
 * One item on a restaurant's menu
 * @property {string} id Unique id of the item
 * @property {string} restaurantId Which restaurant offers this item
 * @property {string} name Name shown on the menu
 * @property {string[]} ingredients List of ingredients shown under the name
 * @property {number} price Price in dollars (ex: 12.5)
 * @property {string} imageUrl Optional picture of the item, empty string if there is none
 * @property {boolean} available If the restaurant currently offers this item
 * @author Jerwin C.
 */
export class MenuItem {
    constructor(id, restaurantId, name, ingredients = [], price = 0, imageUrl = "", available = true) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.name = name;
        this.ingredients = ingredients;
        this.price = price;
        this.imageUrl = imageUrl;
        this.available = available;
    }

    /**
     * @returns if the item has a picture to show
     */
    hasImage() {
        return typeof this.imageUrl === "string" && this.imageUrl.trim() !== "";
    }
}

export default MenuItem;