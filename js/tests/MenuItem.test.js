import { MenuItem } from "../models/MenuItem.js";

test("constructor keeps every field", ()=>{
    const item = new MenuItem("i1", "r1", "Salmon Maki", ["Salmon", "Rice"], 8.5, "img/maki.jpg", false);

    expect(item.id).toBe("i1");
    expect(item.restaurantId).toBe("r1");
    expect(item.name).toBe("Salmon Maki");
    expect(item.ingredients).toEqual(["Salmon", "Rice"]);
    expect(item.price).toBe(8.5);
    expect(item.imageUrl).toBe("img/maki.jpg");
    expect(item.available).toBe(false);
});


test("constructor defaults: no image and available", ()=>{
    const item = new MenuItem("i1", "r1", "Salmon Maki", ["Salmon"], 8.5);

    expect(item.imageUrl).toBe("");
    expect(item.available).toBe(true);
});


test("hasImage", ()=>{
    expect(new MenuItem("i1", "r1", "a", [], 1).hasImage()).toBe(false);
    expect(new MenuItem("i1", "r1", "a", [], 1, "   ").hasImage()).toBe(false);
    expect(new MenuItem("i1", "r1", "a", [], 1, null).hasImage()).toBe(false);
    expect(new MenuItem("i1", "r1", "a", [], 1, "img/a.jpg").hasImage()).toBe(true);
});
