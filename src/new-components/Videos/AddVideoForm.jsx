import React, { useEffect, useRef, useState } from "react";
import "../../styles/newstyles/addPropertyForm.css";
import { useHistory } from "react-router-dom";
import { addProperty } from "../../redux/api";
import { storage } from "../../firebase";
import Select from "react-select";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";

const AddVideoForm = () => {
    const isFirstRender = useRef(true);
    const [spinn, setspinn] = useState(false);
    const [videoData, setvideoData] = useState({
        title: "",
        uploadedBy: "",
        url: "",
        category: [],
        description: "",
        date: "",
        duration: "",
    });
    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setvideoData({ ...videoData, [name]: value });
    };
    const handleFile = (e) => {
        setvideoData({ ...videoData, video: e.target.files[0] });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", videoData.video);
        try {
            const data = await axios.post(
                "https://aws-file-upload-v1.herokuapp.com/api/v2/samunnati/upload/file",
                formdata
            );
            console.log(data);
        } catch (error) {
            console.log(error);
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
                                Video Title{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Video Title"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                        <div className="addproperty-inputFieldDiv form-group">
                            <label className="addproperty-inputLabel">
                                Uploaded By{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="uploadedBy"
                                placeholder="Uploaded By"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>

                    {/* 3rd row */}

                    <div className="addproperty-alignRow">
                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Date{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="date"
                                name="date"
                                placeholder="City"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>

                        <div className="addproperty-inputFieldDiv">
                            <label className="addproperty-inputLabel">
                                Length{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="text"
                                name="length"
                                placeholder="Length"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
                    </div>

                    <div className="addproperty-alignRow">
                        {/* Amenities */}
                        <div className="addproperty-textFieldDiv">
                            <label className="addproperty-inputLabel">
                                File{" "}
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

                    {/* 6th row */}
                    <div className="addproperty-alignRow">
                        {/* Amenities */}
                        <div className="addproperty-textFieldDiv">
                            <label className="addproperty-inputLabel">
                                Categories{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <Select
                                isMulti
                                className="addproperty-inputField"
                            />
                        </div>
                    </div>

                    {/* 7th row */}
                    <div className="addproperty-alignRow">
                        {/*Description*/}
                        <div className="addproperty-textFieldDiv">
                            <label className="addproperty-inputLabel">
                                Description{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <textarea
                                className="addproperty-textField"
                                onChange={handleInputchange}
                                name="Description"
                                placeholder="Video Description"
                            ></textarea>
                        </div>
                    </div>

                    <div className="addproperty-submitDetailDiv">
                        <button
                            className="addproperty-submitDetailBtn"
                            onClick={handlesubmit}
                        >
                            Add Property
                            {spinn ? (
                                <div
                                    class="spinner-border spinner-border-sm text-white mx-2"
                                    role="status"
                                >
                                    <span class="visually-hidden">
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

export default AddVideoForm;
