# QuickBite class diagram (Sprint 1)

This file defines the shared classes for Sprint 1, including their names, methods and expected behaviour. Some tasks depend on these classes, so use the definitions below while their implementation is still in progress.

If you need to change a method signature, discuss it with the team first and update this file in your pull request.

```mermaid
classDiagram
    class Restaurant {
        +id: string
        +name: string
        +type: string
        +description: string
        +bannerUrl: string
        +address: string
        +hours: string
        +menuItems: MenuItem[]
        +getAvailableItems() MenuItem[]
        +findItem(itemId) MenuItem or undefined
        +hasBanner() boolean
    }
    class MenuItem {
        +id: string
        +restaurantId: string
        +name: string
        +ingredients: string[]
        +price: number
        +imageUrl: string
        +available: boolean
        +hasImage() boolean
    }
    class Cart {
        -restaurantId: string or null
        -items: Map~string, number~
        +getRestaurantId() string or null
        +getItems() Map~string, number~
        +addItem(menuItem, qty) boolean
        +removeItem(menuItemId) boolean
        +increaseItemQuantity(menuItemId, inc) boolean
        +decreaseItemQuantity(menuItemId, dec) boolean
        +getTotal() number
        +size() number
        +clear()
    }
    class Order {
        +orderId: string
        +restaurantId: string
        +customerName: string
        +items: OrderItem[]
        +pickupTime: Date
        +status: OrderStatus
        +createdAt: Date
        +seenByStaff: boolean
        +getTotal() number
        +advanceStatus()
    }
    class OrderItem {
        +menuItemId: string
        +name: string
        +unitPrice: number
        +quantity: number
        +getSubtotal() number
    }
    class OrderStatus {
        <<enumeration>>
        RECEIVED
        PREPARING
        READY_FOR_PICKUP
        COMPLETED
        +next(status) OrderStatus
    }
    class DataStore {
        +getRestaurants()$ Restaurant[]
        +getRestaurant(id)$ Restaurant or undefined
        +saveOrder(order)
        +getOrder(id) Order
        +getOrdersForRestaurant(id) Order[]
        +loadCart() Cart
        +saveCart(cart)
    }
    class OrderService {
        +constructor(dataStore)
        +placeOrder(cart, customerName, pickupTime, payment) Order
        +updateStatus(orderId) Order
    }
    Restaurant "1" --> "*" MenuItem
    Cart "1" ..> "*" MenuItem : stores ids and quantities
    Order "1" --> "*" OrderItem
    Order --> OrderStatus
    OrderService --> DataStore
    OrderService --> Cart
    OrderService --> Order
```

## Where each class goes

| Class | File | Issue |
|---|---|---|
| Restaurant | `js/models/Restaurant.js` | #5 View Restaurant Menu |
| MenuItem | `js/models/MenuItem.js` | #5 View Restaurant Menu |
| Seed data (restaurants and menus) | `js/data/seedData.js` | #5 View Restaurant Menu |
| OrderItem | `js/models/OrderItem.js` | #6 View Order's Details |
| Order | `js/models/Order.js` | #6 View Order's Details |
| OrderStatus | `js/models/OrderStatus.js` | #6 View Order's Details |
| Cart | `js/models/Cart.js` | #10 Customer Order Placement |
| OrderService.placeOrder | `js/services/OrderService.js` | #10 Customer Order Placement |
| OrderService.updateStatus | `js/services/OrderService.js` | #7 Update Order Status |
| DataStore | `js/data/DataStore.js` | Shared; included in the initial project structure |

The pages are `index.html` (list of restaurants), `menu.html`, `cart.html`, `order.html` and `staff.html`. Each page gets its own script in `js/views/`.

Tests go in `js/tests/` and are named after the class they test, for example `Cart.test.js`.

## How each class should behave

Use these behaviours as the basis for your tests.

### Restaurant

1. `getAvailableItems()` only returns items where `available` is `true`.
2. `findItem(itemId)` returns `undefined` if there's no item with that ID.

### OrderItem

1. When an item is added, it keeps its own copy of the name and price. That way, if a restaurant changes a price later, old orders still show what the customer actually paid.
2. `getSubtotal()` returns `unitPrice` multiplied by `quantity`.

### Cart

1. The cart stores a map of menu item id to quantity. It doesn't store copies of the items.
2. `addItem(menuItem, qty)` takes the restaurant from `menuItem.restaurantId`. Adding an item that's already in the cart increases its quantity instead of adding a second line.
3. Adding an item from a different restaurant than the one already in the cart returns `false` and changes nothing.
4. An empty cart has `restaurantId` set to `null`. The first item added sets it.
5. `increaseItemQuantity` and `decreaseItemQuantity` return `false` if the amount is below 1 or the item isn't in the cart. Decreasing to 0 or less removes the item.
6. `removeItem(menuItemId)` removes the whole line. If that leaves the cart empty, `restaurantId` goes back to `null`.
7. `getTotal()` looks up each item's current price with `DataStore.getRestaurant(restaurantId).findItem(id)`.
8. `size()` is the total number of units in the cart, so 2 maki and 1 soup is 3.
9. `clear()` empties the cart and resets `restaurantId` to `null`.

### Order

1. A new order starts with `status` set to `RECEIVED` and `seenByStaff` set to `false`.
2. `advanceStatus()` moves the order one step forward: `RECEIVED`, then `PREPARING`, then `READY_FOR_PICKUP`, then `COMPLETED`.
3. Calling `advanceStatus()` on a completed order throws an error.
4. `getTotal()` adds up the subtotals of all the items.

### OrderService

1. `placeOrder()` throws an error if the cart is empty, the customer name is blank, the pickup time has already passed, or payment information is missing.
2. If everything is valid, `placeOrder()` saves the order, empties the cart and returns the new order.
3. Payment information is checked but never saved on the order.
4. `updateStatus(orderId)` loads the order, calls `advanceStatus()`, saves it and returns it.

### DataStore

1. `getRestaurants()` and `getRestaurant(id)` are static, so they're called as `DataStore.getRestaurant("r1")` without creating a DataStore. They read the sample restaurants in `js/data/seedData.js`. `getRestaurant` returns `undefined` for an unknown id.
2. The order and cart methods save to `localStorage`. In tests, use a fake storage object with `getItem()` and `setItem()` so the tests don't depend on the browser.
3. Everything is saved as JSON, but the getters return actual class instances, including nested menu and order items, rather than plain objects. When loading an order, `pickupTime` and `createdAt` are restored as `Date` objects.

## Conventions

1. We use ES modules, with exports such as `export class Restaurant` and imports such as `import { Restaurant } from './Restaurant.js'`.
2. Prices are plain numbers in dollars, like `12.5`. Only the views format them for display.
3. All IDs are strings. An empty cart uses `null` for `restaurantId`.

## Details to confirm with the team

- Whether quantities must be positive integers, and how invalid values such as `NaN` should be handled.
- Which payment fields are required for validation.
- Whether `placeOrder()` also saves the cleared cart so it stays empty after refreshing.
- Who creates `OrderService.js`, since #10 and #7 both add methods to it.
