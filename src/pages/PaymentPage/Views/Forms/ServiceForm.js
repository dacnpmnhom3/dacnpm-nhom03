import React, { useEffect } from 'react';
import {
    TextField,
    Grid,
    Typography
} from "@material-ui/core";
import { useStateValue } from "../../StateContext";
import { Autocomplete } from '@material-ui/lab';



const ServiceForm = () => {
    const [{ formValues }, dispatch] = useStateValue();

    const [provinces , setProvinces] = React.useState([]);

    useEffect(() => {
        console.log({formValues})
        setProvinces(provincesMock);
    }, []);


    return <>
        <Grid item xs={12}>
            <Typography variant="h6">Additional data</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
            {/* Name */}
            <TextField
                required
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formValues.name}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "name",
                        value: e.target.value
                    })
                }
            />
        </Grid>
        <Grid item xs={12} sm={12}>
            {/* Phone number */}
            <TextField
                required
                label="Phone number"
                name="phonenumber"
                variant="outlined"
                type="number"
                fullWidth
                value={formValues.phonenumber}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "phonenumber",
                        value: e.target.value
                    })
                }
            />
        </Grid>
      
        <Grid item xs={12} sm={12}>
            {/* Detail Address */}
            <TextField
                required
                label="Detail Address"
                name="detailAddress"
                variant="outlined"
                fullWidth
                value={formValues.detailaddress}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "detailaddress",
                        value: e.target.value
                    })
                }
            />
        </Grid>
    </>
}

export default ServiceForm;

const provincesMock = [
    {
        id: 1,
        name: "Hà Nội"
    },
    {
        id: 2,
        name: "TP Hồ Chí Minh"
    }
    ,
    {
        id: 3,
        name: "Đà Nẵng"
    },
    {
        id: 4,
        name: "Hải Phòng"
    }
]
