import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import {
    GetSingleCompany,
    GetUserByName,
    UpdateCompany,
} from "../../redux/api";
import "../../styles/newstyles/addPropertyForm.css";
import { storage } from "../../firebase";

const EditAdds = () => {
    const id = window.location.pathname.split("/")[3];
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
    const loadCompanyData = async (id) => {
        const data = await GetSingleCompany(id);
        setCompanyData(data?.data?.result);
        const owner_name = await GetUserByName();
        setOwnerName(owner_name?.data?.result);
    };

    useEffect(() => {
        loadCompanyData(id);
    }, [id]);

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    };


    const updateCompany = async (companyId, newData) => {
        try {
            const data = await UpdateCompany(companyId, newData);
            setCompanyData(data?.data?.data);
            if (data.status === 200) {
                history.push("/adds");
            }
            toast.success(`${newData.companyName} update successfully`);
            setSpinn(false);
        } catch (error) {
            setSpinn(false);
        }
    };



    const handlesubmit = async (e) => {
        setSpinn(true);
        e.preventDefault();
        updateCompany(id, companyData);
    };


    const handleImage = async (e) => {
        const photo = e.target.files[0];
        if (!photo) return;
        const imgUrl = fileUpload(photo);
        toast.promise(imgUrl, {
            loading: "Image Uploading......",
            success: "Image upload successful",
            error: "Error when fetching",
        });
        imgUrl.then((url) => {
            setCompanyData({
                ...companyData,
                imgUrl: url,
            });
        });
    };
    //file upload
    const fileUpload = async (file) => {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytesResumable(storageRef, file);
        return await getDownloadURL(storageRef);
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
                                value={companyData?.companyName}
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
                                value={companyData?.phoneNumber}
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
                                value={companyData?.email}
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
                                value={companyData?.email}
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
                                <option checked={companyData?.ownerName} hidden>
                                    {companyData?.ownerName}
                                </option>
                                {ownerName.map((user) => (
                                    <option
                                        key={user._id}
                                        value={user?.userInfoEng?.name}
                                    >
                                        {user?.userInfoEng?.name} |{" "}
                                        {user?.userInfoEng?.phoneNumber}
                                    </option>
                                ))}
                            </select>
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
                                <option checked={companyData?.template} hidden>
                                    {companyData?.template}
                                </option>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
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
                                value={companyData?.address}
                                placeholder="Address"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
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
                                value={companyData?.companyDescription}
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>
                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Photo{" "}
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
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                    {companyData?.imgUrl && <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <img className="w-50" src={companyData?.imgUrl} alt="" />
                        </div>
                    </div>}
                    <div className="addproperty-submitDetailDiv">
                        <button
                            className="addproperty-submitDetailBtn"
                            onClick={handlesubmit}
                        >
                            Update Company
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

export default EditAdds;
