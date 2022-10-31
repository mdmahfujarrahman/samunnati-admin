import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUser } from "../../redux/api";
import "../../styles/newstyles/addPropertyForm.css";

const AddUser = () => {
    const [spinn, setSpinn] = useState(false);
    const history = useHistory();
    const [childMarid, setChildMarid] = useState("");
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
    const [isMarried, setIsMarried] = useState(false);
    const [childrenData, setChildrenData] = useState({
        name: "",
        phoneNumber: "",
        maritalStatus: "",
    });

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleChildInput = (e) => {
        const { name, value } = e.target;
        setChildrenData({ ...childrenData, [name]: value });
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

    console.log(isMarried);

    const createUser = async (newData) => {
        try {
            debugger;
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

        if (userData.maritalStatus === "single") {
            const newData = {
                ...userData,
                wifeName: "",
                children: [],
                imgUrl: data?.data?.link || "",
            };

            console.log(newData);
            createUser(newData);
        } else {
            const newData = {
                ...userData,
                children: [{ ...childrenData, childMarid }],
                imgUrl: data?.data?.link || "",
            };
            console.log("inside Else:", newData);
            createUser(newData);
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
                    {isMarried && (
                        <>
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
                                        onChange={(e) =>
                                            setChildMarid(e.target.value)
                                        }
                                        className="addproperty-inputField"
                                    >
                                        <option value="">
                                            Choose Marital Status
                                        </option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                    </select>
                                </div>
                                {/* <div className="addproperty-inputFieldDivChildren">
                                    <button className="add-childrenBtn">
                                        {" "}
                                        Add more children
                                    </button>
                                    <button className="add-childrenBtn">
                                        {" "}
                                        Add children
                                    </button>
                                </div> */}
                            </div>{" "}
                        </>
                    )}
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
