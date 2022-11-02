import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import { GetAllAdds } from "../../redux/api";
import "../../styles/newstyles/property.css";
import "../../styles/newstyles/unitdetails.css";
import LoadingPage from "../utils/LoadingPage";
import AddsTable from "./AddsTable";

const Adds = () => {
    const history = useHistory();
    const [addsData, setAddsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setsearchInput] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [engData, setEngData] = useState([]);

    useEffect(() => {
        getAllUser();
    }, []);

    // api call
    const getAllUser = async () => {
        try {
            const data = await GetAllAdds();
            setAddsData(data?.data?.result?.result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const searchItems = (searchValue) => {
        setsearchInput(searchValue);
        if (searchValue !== "") {
            let filteredData = addsData.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilterData(filteredData);
        } else {
            setFilterData(addsData);
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
                                placeholder="Enter a Company Name , Owner Name more"
                                className="unitdetails-searchInput"
                                id="searchInput"
                                value={searchInput}
                                onChange={(e) => searchItems(e.target.value)}
                            />
                        </div>
                        <div className="add_user_button">
                            <button
                                className="property-addBtn"
                                onClick={() => history.push("/adds/add")}
                            >
                                <img
                                    src={addIcon}
                                    alt="add"
                                    className="property-addIcon"
                                />
                                <span>Add New Company</span>
                            </button>
                        </div>
                    </div>
                    <div className="unitdetails-tableSection">
                        {searchInput.length ? (
                            <AddsTable
                                filterData={filterData}
                                setAddsData={setAddsData}
                                setFilterData={setFilterData}
                                addsData={addsData}
                            />
                        ) : (
                            <AddsTable
                                addsData={addsData}
                                setAddsData={setAddsData}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default Adds;
