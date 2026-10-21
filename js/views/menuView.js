/**
 * Builds the HTML for the restaurant menu page (#5 View Restaurant Menu).
 * These functions only return strings so they can be tested without a browser.
 * @author Jerwin C.
 */

import { Cart } from "../models/Cart.js";
const cart = new Cart();
const modalID = "modal";
let restaurant;

/**
 * Escapes text before putting it in HTML, so names like "Mac & Cheese" display correctly
 * @param {string} text Text to escape
 * @returns the escaped text
 */
export function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

/**
 * @param {number} price Price in dollars
 * @returns the price formatted for display (ex: 12.5 becomes "$12.50")
 */
export function formatPrice(price) {
    return "$" + Number(price).toFixed(2);
}

function addItem(item, qty = 1) {
    cart.addItem(item, qty);
    refreshCartModal()
}

function removeItem(itemId) {
    cart.removeItem(itemId)
    refreshCartModal();
}

function increaseQuantity(itemId, qty = 1) {
    cart.increaseItemQuantity(itemId, qty);
    refreshCartModal();
}

function decreaseQuantity(itemId, qty = 1) {
    cart.decreaseItemQuantity(itemId, qty)
    refreshCartModal();
}

function clearCart() {
    cart.clear();
    refreshCartModal();
}

function refreshCartModal() {
    const size = cart.size();
    const modalContents = size > 0 ? `<ul>${cart.items.forEach(function(value, key) {buildCartModalItem(key, value)})}</ul>` : "Cart is currently empty.";

    const content = `
    <dialog id="cart-modal">
        <button commandfor="cart-modal" command="close">X</button>
        <div class="modalContainer"> 
            ${modalContents}
        </div>
        <div class="modalFooter">
            <div>Total: ${formatPrice(cart.getTotal())}</div>
            <button onClick="clearCart" ${size == 0 ? "disabled": ""}>Clear Cart</button>
            <button onClick="" ${size == 0 ? "disabled": ""}>Place Order</button>
        </div>
    </dialog>
    `;

    const div = document.getElementById(modalID);
    if (div != null) {
        div.innerHTML = content;
    }
    
    return content;
}

function buildCartModalItem(itemId, qty) {
    const item = restaurant.findItem(itemId);
    
    return `
    <li>
        ${escapeHtml(item.name)} ... x${qty} : ${formatPrice(item.price * qty)}
        <button onClick="increaseQuantity(${item.id})">+</button>
        <button onClick="removeItem(${item.id})">Remove</button>
        <button onClick="decreaseQuantity(${item.id})">-</button>
    </li>
    `;
}

/**
 * @returns HTML for the banner, name, type, description, working hours and address
 */
export function buildRestaurantHeaderHtml() {
    const banner = restaurant.hasBanner()
        ? `<img class="banner" src="${escapeHtml(restaurant.bannerUrl)}" alt="${escapeHtml(restaurant.name)} banner">`
        : `<div class="banner banner-placeholder" aria-hidden="true">${escapeHtml(restaurant.name)}</div>`;

    return `
        <header class="restaurant-header">
            ${banner}
            <h1 class="restaurant-name">${escapeHtml(restaurant.name)}</h1>
            <p class="restaurant-type">${escapeHtml(restaurant.type)}</p>
            <p class="restaurant-description">${escapeHtml(restaurant.description)}</p>
            <p class="restaurant-hours"><strong>Hours:</strong> ${escapeHtml(restaurant.hours)}</p>
            <p class="restaurant-address"><strong>Address:</strong> ${escapeHtml(restaurant.address)}</p>
        </header>`;
}

/**
 * @param {MenuItem} item Item to show
 * @returns HTML for one menu item: optional image, name, ingredients and price
 */
export function buildMenuItemHtml(item) {
    const image = item.hasImage()
        ? `<img class="menu-item-image" src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}">`
        : "";

    return `
        <li class="menu-item" data-item-id="${escapeHtml(item.id)}">
            ${image}
            <div class="menu-item-info">
                <h3 class="menu-item-name">${escapeHtml(item.name)}</h3>
                <p class="menu-item-ingredients">${item.ingredients.map(escapeHtml).join(", ")}</p>
            </div>
            <p class="menu-item-price">${formatPrice(item.price)}</p>
            <div class="menu-item-actions">
                <button onClick="addItem(item)">+</button>
            </div>
        </li>`;
}

/**
 * @param {Restaurant} r Restaurant whose menu to show
 * @returns HTML for the whole menu page, only listing items that are available
 */
export function buildMenuHtml(r) {
    restaurant = r;
    const items = restaurant.getAvailableItems();
    const list = items.length > 0
        ? `<ul class="menu-items">${items.map(buildMenuItemHtml).join("")}</ul>`
        : `<p class="menu-empty">This restaurant has no items available right now.</p>`;

    return `
        ${buildRestaurantHeaderHtml()}
        <div id="${modalID}">${refreshCartModal()}</div>
        <section class="menu">
            <h2>Menu   |  <button command="show-modal" commandfor="cart-modal">View Cart</button></h2>
            ${list}
        </section>`;
}

/**
 * @returns HTML shown when the restaurant in the URL doesn't exist
 */
export function buildNotFoundHtml() {
    return `<p class="menu-not-found">We couldn't find that restaurant.</p>`;
}
