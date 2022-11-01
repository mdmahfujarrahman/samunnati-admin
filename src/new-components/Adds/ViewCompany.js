import React from "react";
import Modal from "react-bootstrap/Modal";
import noImage from "../../images/no image.png";

const ViewCompany = ({
    show,
    handleConfirm,
    userData,
    handleCancel,
    companyData,
}) => {

    console.log(companyData);
    return (
        <>
            <Modal
                show={show}
                onHide={handleCancel}
                size="md"
                className="profile-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div>
                        <div className="profile-img">
                            <div className="img-container">
                                <img
                                    src={
                                        companyData?.imgUrl
                                            ? companyData?.imgUrl
                                            : noImage
                                    }
                                    alt={companyData?.companyName}
                                />
                            </div>
                        </div>
                        <div className="row profile-content">
                            <div className="col-6">
                                <p>Company Name:</p>
                                <p>Owner Name:</p>
                                <p>Phone Number:</p>
                                <p>Email:</p>
                                <p>Website:</p>
                                <p>Template:</p>
                                <p>Address:</p>
                                <p>Description:</p>
                            </div>
                            <div className="col-6">
                                <p>
                                    {companyData?.companyName
                                        ? companyData?.companyName
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.ownerName
                                        ? companyData?.ownerName
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.phoneNumber
                                        ? companyData?.phoneNumber
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.email
                                        ? companyData?.email
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.website
                                        ? companyData?.website
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.template
                                        ? companyData?.template
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.address
                                        ? companyData?.address
                                        : "-"}
                                </p>
                                <p>
                                    {companyData?.companyDescription
                                        ? companyData?.companyDescription
                                        : "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ViewCompany;
