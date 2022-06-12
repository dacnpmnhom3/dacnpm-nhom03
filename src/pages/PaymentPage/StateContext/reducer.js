const initialState = {
    formValues: {
        name: "",
        phonenumber: "",
        detailaddress: "",
        totalPrice: 0,
        paymentmethod: "cash"
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'editFormValue':
            state.formValues[action.key.toLowerCase()] = action.value;
            return { ...state };

        case 'emptyFormValue':
            return {
                ...state,
                formValues: initialState.formValues
            };
        default:
    };
    return state;
};

export { initialState, reducer }