export const AllChildren = (data) => {
    return {
        type: "ALLCHILDREN",
        payload: data,
    };
};
export const RemoveChildren = (data) => {
    return {
        type: "REMOVECHILDREN",
        payload: data,
    };
};
export const AddChildren = (data) => {
    return {
        type: "ADDCHILDREN",
        payload: data,
    };
};
export const UpdateChildren = (data) => {
    return {
        type: "UPDATECHILDREN",
        payload: data,
    };
};
