export const initialCartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    // case "ADD_TO_CART": {
    //   const existingItem = state.items.find(
    //     (item) =>
    //       item.id === action.payload.id && item.size === action.payload.size
    //   );
    case "ADD_TO_CART": {
  return {
    ...state,
    items: [...state.items, action.payload]
  };
}

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case "CLEAR_CART":
      return initialCartState;

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};
