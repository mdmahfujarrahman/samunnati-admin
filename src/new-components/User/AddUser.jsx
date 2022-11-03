import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUser } from "../../redux/api";
import "../../styles/newstyles/addPropertyForm.css";
import Children from "./Children";

const AddUser = () => {
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

    console.log(userData);

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFile = (e) => {
        setUserData({ ...userData, imgUrl: e.target.files[0] });
    };

    useEffect(() => {
        if (userData?.maritalStatus === "Married") {
            setIsMarried(true);
        } else {
            setIsMarried(false);
        }
    }, [userData?.maritalStatus]);

    const createUser = async (newData) => {
        try {
            const data = await CreateUser(newData);
            setUserData(data?.data?.data);
            if (data.status === 200) {
                history.push("/users");
            }
            toast.success(`${newData.name} added successfully`);
            setSpinn(false);
        } catch (error) {
            setSpinn(false);
        }
    };

    const handlesubmit = async (e) => {
        setSpinn(true);
        e.preventDefault();
        let data;
        if (userData.imgUrl) {
            const formdata = new FormData();
            formdata.append("file", userData.imgUrl);

            try {
                data = await axios.post(
                    "https://aws-file-upload-v1.herokuapp.com/api/v2/samunnati/upload/file",
                    formdata
                );
            } catch (error) {
                console.log(error);
            }
        }

        if (userData.maritalStatus === "Single") {
            const newData = {
                ...userData,
                wifeName: "",
                children: [],
                imgUrl: data?.data?.link || "",
            };

            console.log(newData);
            createUser(newData);
        } else {
            if (!userData.wifeName) {
                setSpinn(false);
                return toast.error("Please enter wife name");
            }
            console.log(childrenData);
            if (
                childrenData.name ||
                childrenData.phoneNumber ||
                childrenData.maritalStatus
            ) {
                if (userData.children.length === 0) {
                    return toast.error(
                        "Please add children first or clear input"
                    );
                }
            }

            const newData = {
                ...userData,
                imgUrl: data?.data?.link || "",
            };
            console.log("inside Else:", newData);
            createUser(newData);
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
                                name="video"
                                placeholder="Upload Video"
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
                                className="addproperty-inputField"
                            >
                                <option hidden>Choose Marital Status</option>
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
                                    placeholder="Wife Name"
                                    className="addproperty-inputField"
                                    onChange={handleInputchange}
                                />
                            </div>
                        )}
                    </div>
                    {isMarried &&
                        [...Array(count)].map((i, index) => (
                            <Children
                                key={index}
                                setChildrenData={setChildrenData}
                                childrenData={childrenData}
                                userData={userData}
                                index={index}
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
                            Add New User
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

export default AddUser;
