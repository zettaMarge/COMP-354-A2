import { DataStore } from "../data/DataStore.js";
import { buildMenuHtml, buildNotFoundHtml } from "./menuView.js";

/**
 * Script for menu.html. Reads the restaurant id from the URL (ex: menu.html?id=r1)
 * and shows that restaurant's menu.
 * @author Jerwin C.
 */
const params = new URLSearchParams(window.location.search);
const restaurant = DataStore.getRestaurant(params.get("id"));
const container = document.getElementById("menu-page");

if (restaurant) {
    document.title = restaurant.name + " | QuickBite Pickup";
    container.innerHTML = buildMenuHtml(restaurant);
} else {
    container.innerHTML = buildNotFoundHtml();
}
