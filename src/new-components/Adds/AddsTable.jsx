import React from "react";
import "../../styles/newstyles/table.css";
import AddsTableRow from "./AddsTableRow";

const AddsTable = ({ addsData, setAddsData, filterData, setFilterData }) => {
    return (
        <div className="table-wrapper" id="#scrollBar">
            <table className="fl-table">
                <thead className="">
                    <tr>
                        <th>Serial</th>
                        <th>Image</th>
                        <th>Company Name</th>
                        <th>Owner Name</th>
                        <th>Company Description</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Address</th>
                        <th>Template</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData
                        ? filterData &&
                          filterData?.map((item, index) => {
                              return (
                                  <AddsTableRow
                                      key={index}
                                      addsData={addsData}
                                      filterData={filterData}
                                      index={index}
                                      occupation={item.companyName}
                                      email={item.email}
                                      ownerName={item.ownerName}
                                      phoneNumber={item.phoneNumber}
                                      companyDescription={
                                          item.companyDescription
                                      }
                                      website={item.website}
                                      address={item.address}
                                      imgUrl={item.imgUrl}
                                      companyId={item._id}
                                      companyName={item.companyName}
                                      template={item.template}
                                      setFilterData={setFilterData}
                                      setAddsData={setAddsData}
                                  />
                              );
                          })
                        : addsData &&
                          addsData?.map((item, index) => {
                              return (
                                  <AddsTableRow
                                      key={index}
                                      addsData={addsData}
                                      setAddsData={setAddsData}
                                      index={index}
                                      companyName={item.companyName}
                                      email={item.email}
                                      ownerName={item.ownerName}
                                      phoneNumber={item.phoneNumber}
                                      companyDescription={
                                          item.companyDescription
                                      }
                                      companyId={item._id}
                                      website={item.website}
                                      address={item.address}
                                      imgUrl={item.imgUrl}
                                      template={item.template}
                                  />
                              );
                          })}
                </tbody>
            </table>
        </div>
    );
};

export default AddsTable;
