import { createContext, useState } from "react";
import { productsArray, getProductData } from "./ProductsStore";


export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteOneFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);
    
    // [{ id: 1, quantity: 2}]

    function getProductQuantity(id) {
        cartProducts.find(product.id === id)?.getProductQuantity
        if ( quantity === undefined ) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0 ) {
            //product is not in the cart
            setCartProducts(
                [
                    ...cartProducts, {
                        id: id,
                        quiantity: 1
                    }
                ]
            )
        } else {
            //product is in the cart
            setCartProducts(
                cartProducts.map( product => product.is === id
                ? {...product, quantity: product.quantity + 1 }
                : product
                )
            )
        }
    }

    function removeOneFromCart() {
        const quantity = getProductQuantity(id);

        if(quantity == 1) {
            deleteOneFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map( product => product.is === id
                ? {...product, quantity: product.quantity - 1 }
                : product
                )
            )
        }
    }

    function deleteOneFromCart(id) {
        // [] if an obbjet meets a condition, add the object to the array
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.id != id
            })
            
        )
    }

    function getTotalCost(){
        let totalCost = 0;

        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);

            return totalCost
        });
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteOneFromCart,
        getTotalCost,

    }

    return(
        <CartContext.Provider value={contexValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

// Context (cart, addToCart, removeCart)
// Provider -> gives your react app access to all the things in your context.