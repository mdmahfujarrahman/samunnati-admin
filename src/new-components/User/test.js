import React, { useRef, useState } from "react";
import { bulkUploadList } from "../../../../services/PostsService";
import { useCsvUpload } from "../../hooks/useCsvUpload";
import { toast, ToastContainer } from "react-toastify";

export const BulkUser = () => {
    const ref = useRef(null);
    const [list, setList] = useState();
    const [loading, setLoading] = useState(false);
    const { handleFileReader, sheetAccepted } = useCsvUpload();
    const handleChange = async () => {
        const [file] = ref.current.files;
        if (file) {
            handleFileReader(file, (data) => {
                setList(data);
            });
        }
    };
    const bulkUpload = async () => {
        setLoading(true);
        try {
            const response = await bulkUploadList({
                users: list,
            });
            toast.success("✔ List Uploaded Successfully!", {
                position: "top-center",
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
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    console.log(list);
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {loading && <div id="cover-spin"></div>}
            <div className="row">
                <div className="card text-center">
                    <div className="card-body">
                        <div className="row my-2">
                            <h2>IMPORT USERS </h2>
                        </div>
                        <div className="row my-3">
                            <h6>Import Users on your Viosa Site</h6>
                        </div>
                        <div className="row d-flex align-items-center justify-content-center mb-3">
                            <input
                                style={{ width: "225px" }}
                                type="file"
                                ref={ref}
                                accepted={sheetAccepted}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row my-4">
                            <p style={{ margin: "0px" }}>
                                We Accept Name, Email and Mobile number, Name
                                and Email are required.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {list && (
                <>
                    <table className="table  display">
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((data, id) => {
                                return (
                                    <tr key={data}>
                                        <td>{id + 1}</td>
                                        <td>{data?.name}</td>

                                        <td>{data?.email}</td>
                                        <td>{data?.phone}</td>
                                        <td>{data?.role}</td>
                                        <td>{data?.password}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={bulkUpload}>
                        Submit
                    </button>
                </>
            )}
        </>
    );
};
