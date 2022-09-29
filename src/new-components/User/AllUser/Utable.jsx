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
                        UserData.map((item, index) => {
                            return (
                                <UtableRow
                                    key={index}
                                    UserData={UserData}
                                    fatherName={item.fatherName}
                                    userId={item._id}
                                    index={index}
                                    occupation={item.occupation}
                                    email={item.email}
                                    name={item.name}
                                    phoneNumber={item.phoneNumber}
                                    age={item.age}
                                    village={item.village}
                                    gotra={item.gotra}
                                    residenceNumber={item.residenceNumber}
                                    address={item.address}
                                    imgUrl={item.imgUrl}
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
