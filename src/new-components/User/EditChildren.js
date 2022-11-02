import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateChildren } from "../../action/action";

const EditChildren = ({
    userData,
    childrenData,
    setChildrenData,
    index,
    deleteChild,
    setUserData,
    child,
    addMore,
}) => {
    const dispatch = useDispatch()
    const { allChildren } = useSelector((state) => state.children);
    const handleChildInput = (e) => {
        const { name, value } = e.target;
        setChildrenData({ ...childrenData, [name]: value, _id: child._id });
    };

    const addChild = (id) => {
    
        // console.log(childrenData);
        dispatch(
            UpdateChildren({
                name: childrenData?.name || child?.name,
                phoneNumber:
                    childrenData?.phoneNumber || child?.phoneNumber,
                maritalStatus:
                    childrenData?.maritalStatus || child?.maritalStatus,
                id: childrenData?._id || child?.id,
            })
        );


        
        // const newData = {
        //     ...userData,
        //     children: users,
        // };
        // toast.success("Children Data Updated");
        // setUserData(newData);
    };

    

    const childrenNumber = (index) => {
        let data = "";
        if (index + 1 === 1) {
            data = "1th";
        } else if (index + 1 === 2) {
            data = "2nd";
        } else if (index + 1 === 3) {
            data = "3rd";
        } else if (index + 1 === 4) {
            data = "4th";
        } else if (index + 1 === 5) {
            data = "5th";
        } else if (index + 1 === 6) {
            data = "6rd";
        }
        return data;
    };

    return (
        <div>
            <div className="children-add-btn">
                <p>{childrenNumber(index)} Child Info</p>
                {index === 0 ? (
                    <button onClick={(e) => addMore(e)} className="add-moreBtn">
                        Add more
                    </button>
                ) : (
                    ""
                )}
            </div>

            <div className="addproperty-alignRow">
                <div className="addproperty-inputFieldDiv">
                    <label className="addproperty-inputLabel">
                        Children Name{" "}
                        <span
                            style={{
                                color: "red",
                                fontSize: "1.2rem",
                            }}
                        >
                            *
                        </span>{" "}
                    </label>
                    <input
                        type="text"
                        name="name"
                        onBlur={addChild}
                        defaultValue={child.name}
                        placeholder="Children Name"
                        className="addproperty-inputField"
                        onChange={handleChildInput}
                    />
                </div>
                <div className="addproperty-inputFieldDiv">
                    <label className="addproperty-inputLabel">
                        Children Phone Number{" "}
                        <span
                            style={{
                                color: "red",
                                fontSize: "1.2rem",
                            }}
                        >
                            *
                        </span>{" "}
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        onBlur={addChild}
                        defaultValue={child.phoneNumber}
                        placeholder="Children Phone Number"
                        className="addproperty-inputField"
                        onChange={handleChildInput}
                    />
                </div>
            </div>
            <div className="addproperty-alignRowChildren">
                <div className="addproperty-inputFieldDiv">
                    <label className="addproperty-inputLabel">
                        Children Marital Status{" "}
                        <span
                            style={{
                                color: "red",
                                fontSize: "1.2rem",
                            }}
                        >
                            *
                        </span>{" "}
                    </label>
                    <select
                        onChange={handleChildInput}
                        name="maritalStatus"
                        onBlur={addChild}
                        checked={child.maritalStatus}
                        className="addproperty-inputField"
                    >
                        <option value={child.maritalStatus}>
                            {child.maritalStatus}
                        </option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                    </select>
                </div>
                <div className="addproperty-inputFieldDivChildren ">
                    <button
                        onClick={(e) => deleteChild(e, child._id)}
                        className="add-childrenBtn btn-danger"
                    >
                        {" "}
                        Remove children
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditChildren;
