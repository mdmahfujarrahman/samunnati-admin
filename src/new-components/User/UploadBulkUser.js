import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useCsvUpload } from '../../hooks/useCsvUpload';
import examplefile from '../../images/directory-example.xlsx';
import downloadIcon from "../../images/downloadIcon.png";
import uploadImage from '../../images/file.png';
import { BulkUserUpload } from '../../redux/api';

const UploadBulkUser = () => {
     const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState();
    const { handleFileReader, sheetAccepted } = useCsvUpload();

    const handleChange = async () => {
        const [file] = ref.current.files;
        console.log(file);
        if (file) {
            handleFileReader(file, (data) => {
                dataHandle(data);
                data.pop()
                console.log(data);
                // setList(data);
            });
        }
    };

    const dataHandle = (countryData) => {
        let countryName = "";
        let seaPortAll = [];
        let airportAll = [];
        let road = [];
        let rail = [];
        countryData.map((item) => {
            if (item.CountryName) {
                countryName = item.CountryName.toLowerCase();
            }
            if (item.seaPort) {
                seaPortAll.push(item.seaPort.toLowerCase());
            }
            if (item.airPort) {
                airportAll.push(item.airPort.toLowerCase());
            }
            if (item.road) {
                road.push(item.road);
            }
            if (item.rail) {
                rail.push(item.rail);
            }
            return null;
        })

        let data = {
            [countryName]: {
                seaPort: seaPortAll,
                airPort: airportAll,
                road: road,
                rail: rail
            }
        }
        console.log(data);
    }


    const bulkUpload = async () => {
        setLoading(true);
        try {
            const response = await BulkUserUpload(list);;
            toast.success("✔ User Data Uploaded Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("❌ Error in uploading list!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        ref.current.click();
    };

    return (
        <div className="addbulk-container">
            <div className="addbulkuser">
                <a href={examplefile} download className="exampleDownload">
                    <img src={downloadIcon} alt="" /> Sample File
                </a>
                <div className="addbulk-alignRow">
                    <div className="addproperty-inputFieldDiv">
                        <div
                            className="upload-container"
                            onClick={onButtonClick}
                        >
                            <img src={uploadImage} alt="" />
                            <p>
                                {list
                                    ? "Now Add Bulk User"
                                    : `Import Bulk User Excel/CSV`}
                            </p>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                ref={ref}
                                id="file"
                                accepted={sheetAccepted}
                                onChange={handleChange}
                                className="addproperty-inputField"
                            />
                        </div>
                    </div>
                </div>
                <div className="addproperty-submitDetailDiv">
                    <button
                        disabled={!list}
                        className={`addproperty-submitDetailBtn ${
                            list ? "" : "disabled-color"
                        }`}
                        onClick={bulkUpload}
                    >
                        Add Bulk User
                        {loading ? (
                            <div
                                className="spinner-border spinner-border-sm text-white mx-2"
                                role="status"
                            >
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            ""
                        )}
                    </button>
                </div>
                <p className="note-bulk">* import maximum 200 users One file</p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UploadBulkUser;