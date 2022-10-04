import React from "react";
import "../../../styles/newstyles/table.css";
import UtableRow from "./UtableRow";

const Utable = ({ UserData, setUserData }) => {
    return (
        <div className="table-wrapper" id="#scrollBar">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Father Name</th>
                        <th>Occupation</th>
                        <th>Village</th>
                        <th>Gotra</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Residence Number</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {UserData &&
                        UserData?.map((item, index) => {
                            return (
                                <UtableRow
                                    key={index}
                                    UserData={UserData}
                                    fatherName={item.userInfoEng.fatherName}
                                    userId={item._id}
                                    index={index}
                                    occupation={item.userInfoEng.occupation}
                                    email={item.userInfoEng.email}
                                    name={item.userInfoEng.name}
                                    phoneNumber={item.userInfoEng.phoneNumber}
                                    age={item.userInfoEng.age}
                                    village={item.userInfoEng.village}
                                    gotra={item.userInfoEng.gotra}
                                    residenceNumber={
                                        item.userInfoEng.residenceNumber
                                    }
                                    address={item.userInfoEng.address}
                                    imgUrl={item.userInfoEng.imgUrl}
                                    setUserData={setUserData}
                                />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Utable;
