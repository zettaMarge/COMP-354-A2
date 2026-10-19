import { Restaurant } from "../models/Restaurant.js";
import { MenuItem } from "../models/MenuItem.js";

/**
 * Sample restaurants used until we have a real backend.
 * Each restaurant has at least one unavailable item so we can check that it gets hidden.
 * @author Jerwin C.
 */
export const restaurants = [
    new Restaurant(
        "r1",
        "Sakura Sushi",
        "Japanese",
        "Fresh sushi and bento boxes made to order.",
        "",
        "1455 De Maisonneuve Blvd W, Montreal, QC",
        "Mon to Sat, 11:00 to 21:00",
        [
            new MenuItem("r1-1", "r1", "Salmon Maki", ["Salmon", "Rice", "Nori"], 8.5),
            new MenuItem("r1-2", "r1", "California Roll", ["Crab", "Avocado", "Cucumber", "Rice", "Nori"], 9),
            new MenuItem("r1-3", "r1", "Chicken Teriyaki Bento", ["Chicken", "Teriyaki sauce", "Rice", "Salad"], 14.25),
            new MenuItem("r1-4", "r1", "Miso Soup", ["Miso", "Tofu", "Green onion", "Seaweed"], 3.5),
            new MenuItem("r1-5", "r1", "Dragon Roll", ["Eel", "Avocado", "Shrimp tempura", "Rice"], 16, "", false),
        ]
    ),
    new Restaurant(
        "r2",
        "Nonna's Pizzeria",
        "Italian",
        "Wood fired pizza and homemade pasta.",
        "",
        "2020 Crescent St, Montreal, QC",
        "Every day, 12:00 to 23:00",
        [
            new MenuItem("r2-1", "r2", "Margherita Pizza", ["Tomato sauce", "Mozzarella", "Basil"], 13),
            new MenuItem("r2-2", "r2", "Pepperoni Pizza", ["Tomato sauce", "Mozzarella", "Pepperoni"], 15),
            new MenuItem("r2-3", "r2", "Spaghetti Bolognese", ["Spaghetti", "Beef", "Tomato sauce", "Parmesan"], 16.5),
            new MenuItem("r2-4", "r2", "Tiramisu", ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa"], 7, "", false),
        ]
    ),
    new Restaurant(
        "r3",
        "Green Bowl",
        "Vegan",
        "Plant based bowls, wraps and smoothies.",
        "",
        "1500 Guy St, Montreal, QC",
        "Mon to Fri, 08:00 to 19:00",
        [
            new MenuItem("r3-1", "r3", "Buddha Bowl", ["Quinoa", "Chickpeas", "Sweet potato", "Kale", "Tahini"], 12.75),
            new MenuItem("r3-2", "r3", "Falafel Wrap", ["Falafel", "Hummus", "Lettuce", "Tomato", "Tortilla"], 10.5),
            new MenuItem("r3-3", "r3", "Mango Smoothie", ["Mango", "Banana", "Oat milk"], 6.25),
            new MenuItem("r3-4", "r3", "Acai Bowl", ["Acai", "Granola", "Berries", "Coconut"], 11, "", false),
        ]
    ),
];

export default restaurants;
