import { Cart } from "../models/Cart.js"
import { MenuItem } from "../models/MenuItem.js"

let testCart;
let item1;
let item2;
let item3;

beforeAll(()=>{
    testCart = new Cart();
    item1 = new MenuItem("r1-1", "r1", "Salmon Maki", ["Salmon", "Rice", "Nori"], 8.5);
    item2 = new MenuItem("r2-1", "r2", "Margherita Pizza", ["Tomato sauce", "Mozzarella", "Basil"], 13);
    item3 = new MenuItem("r1-2", "r1", "California Roll", ["Crab", "Avocado", "Cucumber", "Rice", "Nori"], 9);
});

beforeEach(()=>{
    testCart.clear();
});


test('addItem', ()=>{
    expect(testCart.getRestaurantId()).toBe(null);
    expect(testCart.size()).toBe(0);

    expect(testCart.addItem(item1, 1)).toBe(true);
    expect(testCart.getRestaurantId()).toBe(item1.restaurantId);
    expect(testCart.size()).toBe(1);

    expect(testCart.addItem(item2, 1)).toBe(false);
    expect(testCart.size()).toBe(1);

    expect(testCart.addItem(item3, 1)).toBe(true);
    expect(testCart.getRestaurantId()).toBe(item3.restaurantId);
    expect(testCart.size()).toBe(2);

    expect(testCart.addItem(item3, 2)).toBe(true);
    expect(testCart.size()).toBe(4);
});


test('removeItem', ()=>{
    testCart.addItem(item1, 1);
    testCart.addItem(item3, 1);
    expect(testCart.getRestaurantId()).toBe(item1.restaurantId);
    expect(testCart.size()).toBe(2);  
    
    expect(testCart.removeItem(item1.id)).toBe(true);
    expect(testCart.getRestaurantId()).toBe(item1.restaurantId);
    expect(testCart.size()).toBe(1);

    expect(testCart.removeItem("fakeID")).toBe(false);

    expect(testCart.removeItem(item3.id)).toBe(true);
    expect(testCart.getRestaurantId()).toBe(null);
    expect(testCart.size()).toBe(0);
});


test('increaseItemQuantity', ()=>{
    testCart.addItem(item1, 1);
    expect(testCart.size()).toBe(1);

    expect(testCart.increaseItemQuantity(item1.id, -1)).toBe(false);
    expect(testCart.increaseItemQuantity("fakeID")).toBe(false);
    expect(testCart.size()).toBe(1);

    expect(testCart.increaseItemQuantity(item1.id, 2)).toBe(true);
    expect(testCart.size()).toBe(3);

    expect(testCart.increaseItemQuantity(item1.id)).toBe(true);
    expect(testCart.size()).toBe(4);
});


test('decreaseItemQuantity', ()=>{
    testCart.addItem(item1, 2);
    testCart.addItem(item3, 2);
    expect(testCart.getRestaurantId()).toBe(item1.restaurantId);
    expect(testCart.size()).toBe(4); 

    expect(testCart.decreaseItemQuantity(item1.id, -1)).toBe(false);
    expect(testCart.decreaseItemQuantity("fakeID")).toBe(false);
    expect(testCart.size()).toBe(4); 

    expect(testCart.decreaseItemQuantity(item3.id)).toBe(true);
    expect(testCart.size()).toBe(3); 

    expect(testCart.decreaseItemQuantity(item1.id, 2)).toBe(true);
    expect(testCart.size()).toBe(1);
    expect(testCart.getRestaurantId()).toBe(item1.restaurantId);

    expect(testCart.decreaseItemQuantity(item3.id, 2)).toBe(true);
    expect(testCart.size()).toBe(0);
    expect(testCart.getRestaurantId()).toBe(null);
});


test('getTotal', ()=>{
    expect(testCart.getTotal()).toBe(0);

    testCart.addItem(item1, 2);
    testCart.addItem(item3, 1);
    expect(testCart.getTotal()).toBe(26);
});


test('clear', ()=>{
    testCart.addItem(item1, 1);
    testCart.addItem(item3, 1);
    expect(testCart.getRestaurantId()).toBe(item1.restaurantId);
    expect(testCart.size()).toBe(2); 

    testCart.clear();
    expect(testCart.getRestaurantId()).toBe(null);
    expect(testCart.size()).toBe(0); 
});