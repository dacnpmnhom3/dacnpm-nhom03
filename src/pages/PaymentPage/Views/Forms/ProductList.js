import React, { useEffect } from 'react';
import {
    TextField,
    Grid,
    Typography
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStateValue } from "../../StateContext";

const ProductList = () => {

    const [{ formValues }, dispatch] = useStateValue();

    useEffect(()=>{
        //mock data
        formValues.products=[
            {
                id:1,
                name:"Laptop",
                price:1000,
                quantity:1
            },
            {
                id:2,   
                name:"Mouse",
                price:100,
                quantity:1
            },
            {
                id:3,
                name:"Keyboard",
                price:200,
                quantity:1
            }
        ]
        formValues.totalPrice=formValues.products.reduce((total,product)=>{
            return total+product.price*product.quantity
        },0)

    },[]);
    return <>
        <Grid item xs={12}>
            <Typography variant="h6">Your choosen Products</Typography>
        </Grid>
        <Grid item xs={12}>
            <ul>
              {formValues.products!=null && formValues.products.map(product=>{
                return <li>{product.name + " - " + product.price} </li>
                }
               )}
            </ul>
                {/* Total Price */}
            <Typography variant="h6">Total Price: {formValues.totalPrice}</Typography>

        </Grid>
    </>
}

export default ProductList;


