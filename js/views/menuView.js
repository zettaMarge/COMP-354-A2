/**
 * Builds the HTML for the restaurant menu page (#5 View Restaurant Menu).
 * These functions only return strings so they can be tested without a browser.
 * @author Jerwin C.
 */

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

/**
 * @param {Restaurant} restaurant Restaurant to show at the top of the menu
 * @returns HTML for the banner, name, type, description, working hours and address
 */
export function buildRestaurantHeaderHtml(restaurant) {
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
            <div class="menu-item-actions"></div>
        </li>`;
}

/**
 * @param {Restaurant} restaurant Restaurant whose menu to show
 * @returns HTML for the whole menu page, only listing items that are available
 */
export function buildMenuHtml(restaurant) {
    const items = restaurant.getAvailableItems();
    const list = items.length > 0
        ? `<ul class="menu-items">${items.map(buildMenuItemHtml).join("")}</ul>`
        : `<p class="menu-empty">This restaurant has no items available right now.</p>`;

    return `
        ${buildRestaurantHeaderHtml(restaurant)}
        <section class="menu">
            <h2>Menu</h2>
            ${list}
        </section>`;
}

/**
 * @returns HTML shown when the restaurant in the URL doesn't exist
 */
export function buildNotFoundHtml() {
    return `<p class="menu-not-found">We couldn't find that restaurant.</p>`;
}
