import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddChildren, AllChildren, RemoveChildren } from "../../action/action";
import { getSingleUser, UpdateUser } from "../../redux/api";
import EditChildren from "./EditChildren";

const EditUser = () => {
    const { id } = useParams();
    const { allChildren } = useSelector((state) => state.children);
    const dispatch = useDispatch();
    console.log(id);
    console.log(allChildren);
    const [spinn, setSpinn] = useState(false);
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        age: "",
        fatherName: "",
        occupation: "",
        village: "",
        gotra: "",
        phoneNumber: "",
        email: "",
        residenceNumber: "",
        address: "",
        imgUrl: "",
        maritalStatus: "",
        wifeName: "",
        children: [],
    });

    const [childrenData, setChildrenData] = useState({
        name: "",
        phoneNumber: "",
        maritalStatus: "",
    });
    const getUserDate = async (id) => {
        try {
            const data = await getSingleUser(id);
            console.log(data);

            dispatch(AllChildren(data?.data?.result.userInfoEng.children));
            setIsMarried(data?.data?.result.userInfoEng?.maritalStatus);
            setUserData(data?.data?.result.userInfoEng);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserDate(id);
    }, []);

    const [isMarried, setIsMarried] = useState(false);
    useEffect(() => {
        if (userData?.maritalStatus === "Married") {
            setIsMarried(true);
        } else {
            setIsMarried(false);
        }
    }, [userData?.maritalStatus]);

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleFile = (e) => {
        setUserData({ ...userData, imgUrl: e.target.files[0] });
    };

    const updateUser = async (id, newData) => {
        try {
            const data = await UpdateUser(id, newData);
            setUserData(data?.data?.data);
            if (data.status === 200) {
                toast.success(
                    `${data?.data?.result.userInfoEng.name} info successfully update`
                );
                history.push("/users");
            }
            setSpinn(false);
        } catch (error) {
            setSpinn(false);
        }
    };

    const deleteChild = (e, deleteId) => {
        e.preventDefault();
        dispatch(RemoveChildren(deleteId));
    };

    let addMoreChild = {
        name: "",
        phoneNumber: "",
        maritalStatus: "",
        id: Math.random()
            .toString(20)
            .substring(2, 20 + 2),
    };

    const addMore = (e) => {
        e.preventDefault();
        dispatch(AddChildren(addMoreChild));
    };

    const handlesubmit = async (e) => {
        setSpinn(true);
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", userData.imgUrl);
        let data;
        try {
            data = await axios.post(
                "https://aws-file-upload-v1.herokuapp.com/api/v2/samunnati/upload/file",
                formdata
            );
        } catch (error) {
            console.log(error);
        }
        if (userData.maritalStatus === "Single") {
            const newData = {
                ...userData,
                wifeName: "",
                children: [],
                imgUrl: data?.data?.link || "",
            };

            console.log(newData);
            updateUser(id, newData);
        } else {
            if (!userData.wifeName) {
                setSpinn(false);
                return toast.error("Please enter wife name");
            }
            const newData = {
                ...userData,
                children: allChildren,
                imgUrl: data?.data?.link || "",
            };
            console.log("inside Else:", newData);
            updateUser(id, newData);
        }
    };

    return (
        <form>
            <div className="addproperty-container">
                <div className="addproperty-personalDetails">
                    <div className="addproperty-alignRow">
                        <p>Update User Info</p>
                        {allChildren && allChildren.length === 0 && (
                            <button
                                onClick={(e) => addMore(e)}
                                className="add-moreBtn"
                            >
                                Add Children
                            </button>
                        )}
                    </div>
                    {/* 1st row */}
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv form-group">
                            <label className="addproperty-inputLabel ">
                                Name{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                defaultValue={userData?.name}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                        <div className="addproperty-inputFieldDiv form-group">
                            <label className="addproperty-inputLabel">
                                Age{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="age"
                                placeholder="Age"
                                defaultValue={userData?.age}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>

                    {/* 3rd row */}

                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Father Name{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="fatherName"
                                placeholder="Father Name"
                                defaultValue={userData?.fatherName}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>

                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Occupation{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="occupation"
                                defaultValue={userData?.occupation}
                                placeholder="Occupation"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Village{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="village"
                                placeholder="Village"
                                defaultValue={userData?.village}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>

                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Gotra{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="gotra"
                                placeholder="Gotra"
                                defaultValue={userData?.gotra}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Phone Number{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                defaultValue={userData?.phoneNumber}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Email{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                defaultValue={userData?.email}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Residence Number{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="tel"
                                name="residenceNumber"
                                placeholder="Residence Number"
                                defaultValue={userData?.residenceNumber}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Profile Photo{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="file"
                                name="imgUrl"
                                placeholder="Upload Profile Photo"
                                defaultValue={userData?.imgUrl}
                                className="addproperty-inputField"
                                onChange={handleFile}
                            />
                        </div>
                    </div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Marital Status{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <select
                                name="maritalStatus"
                                onChange={handleInputchange}
                                checked={userData?.residenceNumber}
                                className="addproperty-inputField"
                            >
                                <option value={userData?.maritalStatus}>
                                    {userData?.maritalStatus}
                                </option>
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                            </select>
                        </div>
                        {isMarried && (
                            <>
                                <div className="addproperty-inputFieldDiv">
                                    <label className="addproperty-inputLabel">
                                        Wife Name{" "}
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
                                        name="wifeName"
                                        value={userData?.wifeName}
                                        placeholder="Wife Name"
                                        className="addproperty-inputField"
                                        onChange={handleInputchange}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {isMarried &&
                        allChildren.length > 0 &&
                        allChildren?.map((child, index) => (
                            <EditChildren
                                key={index}
                                index={index}
                                child={child}
                                setChildrenData={setChildrenData}
                                childrenData={childrenData}
                                userData={userData}
                                setUserData={setUserData}
                                deleteChild={deleteChild}
                                addMore={addMore}
                            />
                        ))}
                    <div className="addproperty-alignRow">
                        <div className="addproperty-textFieldDiv">
                            <label className="addproperty-inputLabel">
                                Address{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                defaultValue={userData?.address}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
                    <div className="addproperty-submitDetailDiv">
                        <button
                            className="addproperty-submitDetailBtn"
                            onClick={handlesubmit}
                        >
                            Update
                            {spinn ? (
                                <div
                                    className="spinner-border spinner-border-sm text-white mx-2"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditUser;
