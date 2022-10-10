import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useCsvUpload } from '../../hooks/useCsvUpload';
import { BulkUserUpload } from '../../redux/api';

const UploadBulkUser = () => {
     const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState();
    const { handleFileReader, sheetAccepted } = useCsvUpload();

    const handleChange = async () => {
        const [file] = ref.current.files;
        if (file) {
            handleFileReader(file, (data) => {
                console.log(data.pop());
                console.log(data);
                setList(data);
            });
        }
    };

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


    return (
        <div className="addbulk-container">
            <div className="addbulkuser">
                <div className="addbulk-alignRow">
                    <div className="addproperty-inputFieldDiv">
                        <label className="addproperty-inputLabel">
                            Upload CSV/Excel File{" "}
                            <span style={{ color: "red", fontSize: "1.2rem" }}>
                                *
                            </span>{" "}
                        </label>
                        <input
                            type="file"
                            ref={ref}
                            accepted={sheetAccepted}
                            onChange={handleChange}
                            className="addproperty-inputField"
                        />
                    </div>
                </div>
                <div className="addproperty-submitDetailDiv">
                    <button
                        className="addproperty-submitDetailBtn"
                        onClick={bulkUpload}
                    >
                        Add New User
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UploadBulkUser;