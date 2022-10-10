import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import { GetUser } from "../../redux/api";
import "../../styles/newstyles/property.css";
import "../../styles/newstyles/unitdetails.css";
import LoadingPage from "../utils/LoadingPage";
import Utable from "./AllUser/Utable";

const User = () => {
    const history = useHistory();
    const [UserData, setUserData] = useState([]);
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
            const data = await GetUser();
            setUserData(data?.data?.result.users);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        const newData = UserData.map(({ userInfoHindi, userInfoEng, _id }) => {
            return {
                userInfoHindi: { ...userInfoHindi, id: _id },
                userInfoEng: { ...userInfoEng, id: _id },
            };
        });
        const userEngData = newData.map((user) => user.userInfoEng);
        setEngData(userEngData);
    }, [UserData]);

    const searchItems = (searchValue) => {
        setsearchInput(searchValue);
        if (searchValue !== "") {
            let filteredData = engData.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilterData(filteredData);
        } else {
            setFilterData(UserData);
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
                                placeholder="Enter a Name , Occupation or More"
                                className="unitdetails-searchInput"
                                id="searchInput"
                                value={searchInput}
                                onChange={(e) => searchItems(e.target.value)}
                            />
                        </div>
                        <div className="add_user_button">
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
                            <button
                                className="property-addBtn"
                                onClick={() => history.push("/users/bulk-add")}
                            >
                                <img
                                    src={addIcon}
                                    alt="add"
                                    className="property-addIcon"
                                />
                                <span>Add Bulk User</span>
                            </button>
                        </div>
                    </div>
                    <div className="unitdetails-tableSection">
                        {searchInput.length ? (
                            <Utable
                                filterData={filterData}
                                setUserData={setUserData}
                                setFilterData={setFilterData}
                                UserData={UserData}
                            />
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
