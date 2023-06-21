import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DeleteAnnouncement } from "../../redux/api";
import DeleteModal from "../utils/DeleteModal";

const AnnouncementTableRow = ({
    index,
    announcementText,
    announcementDate,
    setAnnouncementData,
    announcementData,
    setFilterData,
    filterData,
    announcementId,
}) => {
    const [deleteModalOpen, setdeleteModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [ConfirmDelete, setConfirmDelete] = useState(false);
    const [companyData, setCompanyData] = useState();

    console.log(announcementId);

    const handleDeleteConfirm = () => {
        setdeleteModalOpen(false);
        setConfirmDelete(true);
    };
    const handleDeleteCancel = () => {
        setdeleteModalOpen(false);
    };
    const handleProfileCancel = () => {
        setProfileModalOpen(false);
    };
    const handleDeleteUser = (e, id) => {
        e.preventDefault();
        setdeleteModalOpen(true);
    };
    const handleConfirmDeleteBlog = async (id) => {
        debugger;
        console.log(id);
        if (setFilterData) {
            try {
                const updateUser = filterData?.filter((b) => b.id !== id);
                setFilterData(updateUser);
                const newData = announcementData?.filter((b) => b._id !== id);
                setAnnouncementData(newData);
                const result = await DeleteAnnouncement(id);
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const updateUser = announcementData?.filter((b) => b._id !== id);
                setAnnouncementData(updateUser);
                await DeleteAnnouncement(id);
            } catch (err) {
                console.log(err);
            }
        }
    };
    useEffect(() => {
        if (ConfirmDelete) {
            handleConfirmDeleteBlog(announcementId);
        }
    }, [ConfirmDelete]);


    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{announcementText ? announcementText : "-"}</td>
                <td>{announcementDate ?  moment(announcementDate).format('LL') : "-"}</td>
                <td className="action-btn">
                    {/* <Link to={`/adds/edit/${announcementId}`}> */}
                        <button className="edit-btn">
                            <ModeEditIcon />
                        </button>
                    {/* </Link> */}
                    <button
                        onClick={(e) => handleDeleteUser(e)}
                        className="delete-btn"
                    >
                        <DeleteIcon />{" "}
                    </button>
                </td>
            </tr>
            {deleteModalOpen && (
                <DeleteModal
                    show={deleteModalOpen}
                    handleConfirm={handleDeleteConfirm}
                    handleCancel={handleDeleteCancel}
                    categorytag={announcementText}
                />
            )}
        </>
    );
};

export default AnnouncementTableRow;
