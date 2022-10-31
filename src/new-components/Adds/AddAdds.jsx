import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateAdds, GetUserByName } from "../../redux/api";
import "../../styles/newstyles/addPropertyForm.css";

const AddAdds = () => {
    const [spinn, setSpinn] = useState(false);
    const history = useHistory();
    const [ownerName, setOwnerName] = useState([]);
    const [companyData, setCompanyData] = useState({
        companyName: "",
        ownerName: "",
        companyDescription: "",
        phoneNumber: "",
        email: "",
        address: "",
        imgUrl: "",
        website: "",
        template: "",
    });

    const loadAllUser = async () => {
        const data = await GetUserByName();
        setOwnerName(data?.data?.result);
    };

    useEffect(() => {
        loadAllUser();
    }, []);

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    };

    const handleFile = (e) => {
        setCompanyData({ ...companyData, imgUrl: e.target.files[0] });
    };

    const createCompany = async (newData) => {
        try {
            const data = await CreateAdds(newData);
            setCompanyData(data?.data?.data);
            if (data.status === 200) {
                history.push("/adds");
            }
            toast.success(`${newData.companyName} added successfully`);
            setSpinn(false);
        } catch (error) {
            setSpinn(false);
        }
    };

    console.log(companyData);

    const handlesubmit = async (e) => {
        setSpinn(true);
        e.preventDefault();
        let data;
        if (companyData.imgUrl) {
            const formdata = new FormData();
            formdata.append("file", companyData.imgUrl);

            try {
                data = await axios.post(
                    "https://aws-file-upload-v1.herokuapp.com/api/v2/samunnati/upload/file",
                    formdata
                );
            } catch (error) {
                console.log(error);
            }
        }

        const newData = {
            ...companyData,
            imgUrl: data?.data?.link || "",
        };
        console.log(newData);
        createCompany(newData);
    };
    return (
        <form>
            <div className="addproperty-container">
                <div className="addproperty-personalDetails">
                    {/* 1st row */}
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv form-group">
                            <label className="addproperty-inputLabel ">
                                Company Name{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                        <div className="addproperty-inputFieldDiv form-group">
                            <label className="addproperty-inputLabel">
                                Company Phone{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Company Phone Number"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>

                    {/* 3rd row */}

                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Company Email{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Company Email"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>

                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Company Website{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="website"
                                placeholder="Company Website"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Owner Name{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>

                            <select
                                name="ownerName"
                                onChange={handleInputchange}
                                className="addproperty-inputField"
                            >
                                <option hidden>Choose Owner Name</option>
                                {ownerName.map((user) => (
                                    <option
                                        key={user._id}
                                        value={user?.userInfoEng?.name}
                                    >
                                        {user?.userInfoEng?.name}
                                    </option>
                                ))}
                            </select>
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

                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Adds Template{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>

                            <select
                                name="template"
                                onChange={handleInputchange}
                                className="addproperty-inputField"
                            >
                                <option hidden>Choose Template</option>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="addproperty-alignRow"></div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-textFieldDiv">
                            <label className="addproperty-inputLabel">
                                Company description{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <textarea
                                type="text"
                                name="companyDescription"
                                placeholder="Company description"
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

export default AddAdds;
