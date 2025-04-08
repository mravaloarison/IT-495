
## 🛒 Customer Shopping Features (Cart & Saved Items)

For each customer in the `customers` collection, two subcollections are created:

### 1. `cart` Subcollection
Holds items the user is planning to purchase.

**Path:**
```
customers/{email}/cart/{itemName}
```

**Example document:**
```json
{
  "itemName": "Nike Air Max",
  "price": 99,
  "picURL": "https://...",
  "company": "Rason Clothes"
}
```

### 2. `saved` Subcollection
Contains items the user has favorited (wishlist).

**Path:**
```
customers/{email}/saved/{itemName}
```

**Example document:**
```json
{
  "itemName": "Vintage Denim",
  "price": 45,
  "picURL": "https://...",
  "company": "Rason Clothes"
}
```

### 🛠️ Firebase Helper Functions (To Implement)

```ts
// Add to saved
export async function addItemToSaved(email, item) {
  const itemRef = doc(db, "customers", email, "saved", item.itemName);
  await setDoc(itemRef, item);
}

// Add to cart
export async function addItemToCart(email, item) {
  const itemRef = doc(db, "customers", email, "cart", item.itemName);
  await setDoc(itemRef, item);
}

// Remove from saved/cart
export async function removeItemFromList(email, list, itemName) {
  const itemRef = doc(db, "customers", email, list, itemName);
  await deleteDoc(itemRef);
}
```

You can now hook up the "Save" and "Add to Cart" buttons in your UI to these methods.
