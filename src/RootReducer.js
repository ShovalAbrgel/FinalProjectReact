const initState = {
  products: [
    {
      id: 1,
      name: "box",
      price: 35,
      Quantity: 50,
      customers:[1]
    
    },
    {
      id: 2,
      name: "fan",
      price: 65,
      Quantity: 100,
      customers:[2]
    },
  ],
  customers: [
    {
      id: 1,
      fn: "shoval",
      ln: "abrgel",
      city: "Hadera",
      purchasedDate: "2023-12-01",
      productIds: [1],
    },
    {
      id: 2,
      fn: "ori",
      ln: "meyuhas",
      city: "Hadera",
      purchasedDate: "2023-11-15",
      productIds: [2],
    },
  ],
  purchases: [],

  totalPurchased: 2,
};


const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const { name, price, Quantity, productId, purchasedDate } = action.payload;
      const newProduct = {
        id: action.payload.id,
        name: name,
        price: price,
        Quantity: Quantity,
        productId,
        purchasedDate,
      };
    
      const newTotalPurchased = state.totalPurchased + 1;
    
      return {
        ...state,
        totalPurchased: newTotalPurchased,
        products: [...state.products, newProduct],
      };
    


    case 'REMOVE_PRODUCT':
      const productIdToRemove = action.payload.productId;

      const updatedProducts = state.products.filter(product => product.id !== productIdToRemove);

      const updatedPurchases = state.purchases.filter(purchase => purchase.productId !== productIdToRemove);

      const updatedCustomers = state.customers.map(customer => ({
        ...customer,
        productIds: customer.productIds.filter(id => id !== productIdToRemove),
      }));

      state.totalPurchased -= 1; 

      return {
        ...state,
        products: updatedProducts,
        purchases: updatedPurchases,
        customers: updatedCustomers,
      };

      case 'UPDATE_TOTAL_PURCHASED':
        return {
          ...state,
          totalPurchased: action.payload,
        };
     
    



    case 'ADD_PURCHASE':
      const { customerId, productId: newProductId, purchasedDate: purchaseDate } = action.payload;
      const newPurchase = {
        customerId,
        productId: newProductId,
        purchasedDate: purchaseDate,
      };

      return {
        ...state,
        purchases: [...state.purchases, newPurchase],
      };
    case 'UPDATE_CUSTOMER_NAME_UNDER_PRODUCT':
      const { productId: productToUpdate, customerId: customerToUpdate, name: customerName } = action.payload;

      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === productToUpdate) {
            return {
              ...product,
              customers: [
                ...(product.customers || []), 
                { customerId: customerToUpdate, name: customerName },
              ],
            };
          }
          return product;
        }),
      };


      
      case 'UPDATE_CUSTOMER_PURCHASE_DATE':
        const { customerId: updatedCustomerId, productId: updatedProductId, purchasedDate: updatedPurchasedDate } = action.payload;
  
        return {
          ...state,
          customers: state.customers.map((customer) =>
            customer.id === updatedCustomerId 
              ? {
                ...customer,
                purchasedDate: updatedPurchasedDate,
              }
              : customer
          ),
        };
  
      

      case 'UPDATE_PRODUCT':
        const { productId: updatedProductIds, ...updatedFields } = action.payload;
      
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === updatedProductIds ? { ...product, ...updatedFields } : product
          ),
        };
        
      
      

    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };

    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.customerId ? { ...customer, ...action.payload.updatedCustomers } : customer
        ),
      };

    case 'ADD_CUSTOMER_PRODUCT':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.customerId
            ? {
              ...customer,
              productIds: [...customer.productIds, action.payload.productId],
            }
            : customer
        ),
      };

    case 'REMOVE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload),
      };


    default:
      return state;
  }

 

};



export default storeReducer;