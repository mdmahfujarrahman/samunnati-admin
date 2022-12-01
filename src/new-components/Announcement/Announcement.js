import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import { GetAllAnnouncement } from "../../redux/api";
import "../../styles/newstyles/property.css";
import "../../styles/newstyles/unitdetails.css";
import LoadingPage from "../utils/LoadingPage";
import AnnouncementTable from "./AnnouncementTable";
import CreateAnnouncementModal from "./CreateAnnouncementModal";

const Announcement = () => {
    const history = useHistory();
    const [announcementData, setAnnouncementData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setsearchInput] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getAllUser();
    }, []);

    // api call
    const getAllUser = async () => {
        try {
            const data = await GetAllAnnouncement();
            setAnnouncementData(data?.data?.result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const searchItems = (searchValue) => {
        setsearchInput(searchValue);
        if (searchValue !== "") {
            let filteredData = announcementData.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilterData(filteredData);
        } else {
            setFilterData(announcementData);
        }
    };

    return (
        <div className="unitdetails-container">
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <div className="unitdetails-firstSection">
                        <div className="unitdetails-searchDiv">
                            <img
                                src={searchIcon}
                                alt="search"
                                className="searchIcon"
                            />
                            <input
                                type="text"
                                placeholder="Enter a Announcement Title"
                                className="unitdetails-searchInput"
                                id="searchInput"
                                value={searchInput}
                                onChange={(e) => searchItems(e.target.value)}
                            />
                        </div>
                        <div className="add_user_button">
                            <button
                                className="property-addBtn"
                                onClick={() => setModalOpen(true)}
                            >
                                <img
                                    src={addIcon}
                                    alt="add"
                                    className="property-addIcon"
                                />
                                <span>Post Announcement</span>
                            </button>
                        </div>
                    </div>
                    <div className="unitdetails-tableSection">
                        {searchInput.length ? (
                            <AnnouncementTable
                                filterData={filterData}
                                setAnnouncementData={setAnnouncementData}
                                setFilterData={setFilterData}
                                announcementData={announcementData}
                            />
                        ) : (
                            <AnnouncementTable
                                announcementData={announcementData}
                                setAnnouncementData={setAnnouncementData}
                            />
                        )}
                    </div>
                </>
            )}
            <CreateAnnouncementModal
            show={modalOpen}
            setAnnouncementInfo={setAnnouncementData}
            handleCancel={() => setModalOpen(false)}
            />
        </div>
    );
};
export default Announcement;
