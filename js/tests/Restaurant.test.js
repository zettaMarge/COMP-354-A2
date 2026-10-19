import { Restaurant } from "../models/Restaurant.js";
import { MenuItem } from "../models/MenuItem.js";

let restaurant;
let available1;
let available2;
let unavailable;

beforeEach(()=>{
    available1 = new MenuItem("i1", "r1", "Salmon Maki", ["Salmon"], 8.5);
    available2 = new MenuItem("i2", "r1", "Miso Soup", ["Miso"], 3.5);
    unavailable = new MenuItem("i3", "r1", "Dragon Roll", ["Eel"], 16, "", false);

    restaurant = new Restaurant(
        "r1", "Sakura Sushi", "Japanese", "Fresh sushi", "", "123 Street", "11:00 to 21:00",
        [available1, unavailable, available2]
    );
});


test("constructor keeps every field", ()=>{
    expect(restaurant.id).toBe("r1");
    expect(restaurant.name).toBe("Sakura Sushi");
    expect(restaurant.type).toBe("Japanese");
    expect(restaurant.description).toBe("Fresh sushi");
    expect(restaurant.bannerUrl).toBe("");
    expect(restaurant.address).toBe("123 Street");
    expect(restaurant.hours).toBe("11:00 to 21:00");
    expect(restaurant.menuItems.length).toBe(3);
});


test("getAvailableItems only returns available items, in menu order", ()=>{
    expect(restaurant.getAvailableItems()).toEqual([available1, available2]);
});


test("getAvailableItems on an empty menu", ()=>{
    const empty = new Restaurant("r2", "Empty", "Cafe", "", "", "", "");
    expect(empty.getAvailableItems()).toEqual([]);
});


test("findItem", ()=>{
    expect(restaurant.findItem("i2")).toBe(available2);
    expect(restaurant.findItem("i3")).toBe(unavailable);
    expect(restaurant.findItem("fakeID")).toBeUndefined();
});


test("hasBanner", ()=>{
    expect(restaurant.hasBanner()).toBe(false);
    restaurant.bannerUrl = "img/banner.jpg";
    expect(restaurant.hasBanner()).toBe(true);
});
