const initialState = {
    allChildren: [],
};

export const ChildrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALLCHILDREN":
            return {
                ...state,
                allChildren: action.payload,
            };
        case "REMOVECHILDREN":
            return {
                ...state,
                allChildren: state.allChildren.filter((child) => child._id !== action.payload)

            };
        case "ADDCHILDREN":
            return {
                ...state,
                allChildren: [...state.allChildren, action.payload],
            };
        case "UPDATECHILDREN":
            const updatedChildren = state.allChildren.map((child) => {
                if(child._id === action.payload.id || child.id === action.payload.id) {
                    child.name = action.payload.name;
                    child.phoneNumber = action.payload.phoneNumber;
                    child.maritalStatus = action.payload.maritalStatus;
                }
                return child;
            })
            return {
                ...state,
                allChildren: updatedChildren,
            };
        default:
            return state;
    }
};
