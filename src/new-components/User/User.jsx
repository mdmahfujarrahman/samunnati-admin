import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import { GetUser } from "../../redux/api";
import "../../styles/newstyles/property.css";
import "../../styles/newstyles/unitdetails.css";
import LoadingPage from "../utils/LoadingPage";
import Utable from "./AllUser/Utable";

const User = () => {
    const history = useHistory();
    const { id } = useParams();
    const [UserData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setsearchInput] = useState("");
    const [filterData, setfilterData] = useState([]);

    useEffect(() => {
        getAllUser();
    }, []);

    // api call
    const getAllUser = async () => {
        try {
            const data = await GetUser();
            setUserData(data?.data?.result.users);
            console.log(data?.data?.result);
            console.log(data?.data?.result.users);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    console.log(UserData);
    const searchItems = (searchValue) => {
        setsearchInput(searchValue);
        if (searchValue !== "") {
            let filteredData = UserData.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setfilterData(filteredData);
        } else {
            setfilterData(UserData);
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
                                placeholder="Enter a Name , Description or More"
                                className="unitdetails-searchInput"
                                id="searchInput"
                                value={searchInput}
                                onChange={(e) => searchItems(e.target.value)}
                            />
                        </div>
                        <div className="property-addpropertyDiv">
                            <button
                                className="property-addBtn"
                                onClick={() => history.push("/users/add")}
                            >
                                <img
                                    src={addIcon}
                                    alt="add"
                                    className="property-addIcon"
                                />
                                <span>Add New User</span>
                            </button>
                        </div>
                    </div>
                    <div className="unitdetails-tableSection">
                        {searchInput.length ? (
                            <Utable UserData={filterData} />
                        ) : (
                            <Utable
                                UserData={UserData}
                                setUserData={setUserData}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default User;
