import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleUser, UpdateUser } from "../../redux/api";
import Children from "./Children";

const EditUser = () => {
    const { id } = useParams();
    console.log(id);
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
    const [isMarried, setIsMarried] = useState(false);
    const getUserDate = async (id) => {
        try {
            const data = await getSingleUser(id);
            console.log(data);
            setIsMarried(data?.data?.result.userInfoEng?.maritalStatus);
            setUserData(data?.data?.result.userInfoEng);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserDate(id);
    }, [id]);

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

    console.log(userData);

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
            // updateUser(id, newData);
        } else {
            if (!userData.wifeName) {
                setSpinn(false);
                return toast.error("Please enter wife name");
            }
            const newData = {
                ...userData,
                imgUrl: data?.data?.link || "",
            };
            console.log("inside Else:", newData);
            // updateUser(id, newData);
        }
    };

    const [count, setCount] = useState(1);

    const addMore = (e) => {
        e.preventDefault();
        setCount(count + 1);
    };

    const deleteChild = (e) => {
        e.preventDefault();
        if (count === 1) {
            toast.error("Sorry can't delete this filed but you can skip");
        } else {
            setCount(count - 1);
        }
    };
    return (
        <form>
            <div className="addproperty-container">
                <div className="addproperty-personalDetails">
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
                        )}
                    </div>
                    {isMarried &&
                        userData.children.length > 0 &&
                        userData.children.map((child, index) => (
                            <Children
                                key={index}
                                child={child}
                                setChildrenData={setChildrenData}
                                childrenData={childrenData}
                                userData={userData}
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
