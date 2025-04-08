---

## Smart Cart Features for customer

FitFinder's cart now behaves just like you'd expect from a real e-commerce app:

-   **Increment and Decrement Items**: Users can add or remove quantities from their cart. If the count reaches zero, the item is automatically removed.
-   **Real-Time Count Sync**: Each action updates both Firestore and the UI instantly.
-   **Place Order Mode**: When users place an order, all items are marked as `Pending` in the UI, and item controls are replaced with a cancel option.
-   **Cancel Order**: Order state can be toggled off without altering Firestore data — perfect for simulating checkout states.

These additions make the cart fully interactive while preserving Firebase-backed state.
