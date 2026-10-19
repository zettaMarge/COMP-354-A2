import { escapeHtml, formatPrice, buildMenuItemHtml, buildMenuHtml, buildNotFoundHtml } from "../views/menuView.js";
import { Restaurant } from "../models/Restaurant.js";
import { MenuItem } from "../models/MenuItem.js";

let restaurant;

beforeEach(()=>{
    restaurant = new Restaurant(
        "r1", "Sakura Sushi", "Japanese", "Fresh sushi", "", "123 Street", "11:00 to 21:00",
        [
            new MenuItem("i1", "r1", "Salmon Maki", ["Salmon", "Rice", "Nori"], 8.5),
            new MenuItem("i2", "r1", "Dragon Roll", ["Eel"], 16, "", false),
        ]
    );
});


test("escapeHtml", ()=>{
    expect(escapeHtml("Mac & Cheese")).toBe("Mac &amp; Cheese");
    expect(escapeHtml("<b>\"hi\"</b>")).toBe("&lt;b&gt;&quot;hi&quot;&lt;/b&gt;");
    expect(escapeHtml("Nonna's")).toBe("Nonna&#39;s");
});


test("formatPrice", ()=>{
    expect(formatPrice(12.5)).toBe("$12.50");
    expect(formatPrice(9)).toBe("$9.00");
    expect(formatPrice(0)).toBe("$0.00");
});


test("menu header shows name, banner, type, description, hours and address", ()=>{
    const html = buildMenuHtml(restaurant);

    expect(html).toContain("Sakura Sushi");
    expect(html).toContain("banner-placeholder");
    expect(html).toContain("Japanese");
    expect(html).toContain("Fresh sushi");
    expect(html).toContain("11:00 to 21:00");
    expect(html).toContain("123 Street");
});


test("menu uses the banner image when there is one", ()=>{
    restaurant.bannerUrl = "img/banner.jpg";
    const html = buildMenuHtml(restaurant);

    expect(html).toContain('src="img/banner.jpg"');
    expect(html).not.toContain("banner-placeholder");
});


test("menu lists available items and hides unavailable ones", ()=>{
    const html = buildMenuHtml(restaurant);

    expect(html).toContain("Salmon Maki");
    expect(html).toContain("Salmon, Rice, Nori");
    expect(html).toContain("$8.50");
    expect(html).not.toContain("Dragon Roll");
});


test("menu shows a message when nothing is available", ()=>{
    restaurant.menuItems = [new MenuItem("i2", "r1", "Dragon Roll", ["Eel"], 16, "", false)];
    expect(buildMenuHtml(restaurant)).toContain("no items available");
});


test("menu item image is optional", ()=>{
    const noImage = new MenuItem("i1", "r1", "Maki", ["Rice"], 5);
    const withImage = new MenuItem("i1", "r1", "Maki", ["Rice"], 5, "img/maki.jpg");

    expect(buildMenuItemHtml(noImage)).not.toContain("<img");
    expect(buildMenuItemHtml(withImage)).toContain('src="img/maki.jpg"');
});


test("menu item keeps its id for the cart to use", ()=>{
    expect(buildMenuItemHtml(new MenuItem("i1", "r1", "Maki", ["Rice"], 5))).toContain('data-item-id="i1"');
});


test("not found message", ()=>{
    expect(buildNotFoundHtml()).toContain("couldn't find that restaurant");
});
