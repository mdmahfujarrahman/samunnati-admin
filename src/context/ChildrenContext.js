import { createContext, useState } from "react";

export const ChildrenContext = createContext();

export const ChildrenContextProvider = ({ children }) => {
    const [cData, setCData] = useState({})

    // useEffect(() => {
    //     setCData({ ...cData }, cData);
    // },[]);
    
    // setCData(c => ...cData)

    // console.log(cData);

    return (
        <ChildrenContext.Provider value={{ setCData, cData }}>
            {children}
        </ChildrenContext.Provider>
    );
};
