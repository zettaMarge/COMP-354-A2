import { DataStore } from "../data/DataStore.js";
import { Restaurant } from "../models/Restaurant.js";
import { MenuItem } from "../models/MenuItem.js";

test("getRestaurants returns the seeded restaurants as Restaurant objects", ()=>{
    const restaurants = DataStore.getRestaurants();

    expect(restaurants.length).toBeGreaterThan(0);
    restaurants.forEach((restaurant) => {
        expect(restaurant).toBeInstanceOf(Restaurant);
        restaurant.menuItems.forEach((item) => expect(item).toBeInstanceOf(MenuItem));
    });
});


test("getRestaurant", ()=>{
    expect(DataStore.getRestaurant("r1").name).toBe("Sakura Sushi");
    expect(DataStore.getRestaurant("fakeID")).toBeUndefined();
    expect(DataStore.getRestaurant(null)).toBeUndefined();
});


test("seed data: ids are unique and items point back to their restaurant", ()=>{
    const restaurants = DataStore.getRestaurants();
    const restaurantIds = restaurants.map((r) => r.id);
    expect(new Set(restaurantIds).size).toBe(restaurantIds.length);

    const itemIds = [];
    restaurants.forEach((restaurant) => {
        restaurant.menuItems.forEach((item) => {
            expect(item.restaurantId).toBe(restaurant.id);
            itemIds.push(item.id);
        });
    });
    expect(new Set(itemIds).size).toBe(itemIds.length);
});
