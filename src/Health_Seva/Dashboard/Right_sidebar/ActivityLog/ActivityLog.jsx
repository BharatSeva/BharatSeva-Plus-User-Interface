import "./ActivityLog.css";
import { FetchData } from "../../../FetchData";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "@remixicon/react";

export default function ActivityLog() {
    // Separate dropdown toggle for each log section
    const [isOpenRecords, setIsOpenRecords] = useState(false);
    const [isOpenBiodata, setIsOpenBiodata] = useState(false);
    
    const toggleDropdownRecords = () => setIsOpenRecords(!isOpenRecords);
    const toggleDropdownBiodata = () => setIsOpenBiodata(!isOpenBiodata);

    // Separate state for each type of data
    const [recordsResponse, setRecordsResponse] = useState([]);
    const [biodataResponse, setBiodataResponse] = useState([]);
    
    // Separate fetching states
    const [isFetchedRecords, setIsFetchedRecords] = useState({ isFetched: false, isGood: true });
    const [isFetchedBiodata, setIsFetchedBiodata] = useState({ isFetched: false, isGood: true });

    const [isRedirect, setIsRedirect] = useState(false);

    // Fetch records data
    async function getActivity() {
        try {
            setRecordsResponse([]);
            const { data, res } = await FetchData(`/logs/records/viewed`);
            if (res.ok) {
                setRecordsResponse(data.viewed_records || []);
            } else if (res.status === 405) {
                setIsRedirect(true);
            } else {
                setRecordsResponse([]);
            }
        } catch (err) {
            setIsFetchedRecords({ isFetched: true, isGood: false });
            alert("Could Not Fetch Account Activity Logs");
        }
        setIsFetchedRecords({ isFetched: true, isGood: true });
    }

    // Fetch biodata data
    async function getBiodata() {
        try {
            setBiodataResponse([]);
            const { data, res } = await FetchData(`/logs/info/viewed`);
            if (res.ok) {
                setBiodataResponse(data.viewed_biodata || []);
            } else if (res.status === 405) {
                setIsRedirect(true);
            } else {
                setBiodataResponse([]);
            }
        } catch (err) {
            setIsFetchedBiodata({ isFetched: true, isGood: false });
            alert("Could Not Fetch Account Activity Logs");
        }
        setIsFetchedBiodata({ isFetched: true, isGood: true });
    }

    useEffect(() => {
        getActivity();
        getBiodata();
    }, []);

    const createdRecords = recordsResponse.length > 0
        ? recordsResponse
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((data) => (
                <div key={data.healthcare_id} className="text-black rounded-lg mx-8 my-4 border-black" style={{ backgroundColor: "#EEECEC" }}>
                    <div className="flex flex-col gap-0">
                        <div className="text-base px-17 flex items-center border-bottom">
                            <p>Healthcare: </p>
                            <p className="font-normal inline text-sm">{data.healthcare_name}</p>
                        </div>
                        <div className="text-base px-17 flex items-center border-bottom">
                            <p>ID: </p>
                            <p className="font-normal inline text-sm">{data.healthcare_id}</p>
                        </div>
                        <div className="text-base px-17 flex items-center border-bottom">
                            <p>Category: </p>
                            <p className="font-normal inline text-sm">{data.category}</p>
                        </div>
                        <div className="text-base mx-8 flex items-center">
                            <p>Date & Time: </p>
                            <p className="font-normal inline text-sm">{new Date(data.date).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            ))
        : (<p className="notavailabletext">No Records Created Yet</p>);

    const viewedBiodataRecords = biodataResponse.length > 0
        ? biodataResponse
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((data) => (
                <div key={data.healthcare_id} className="text-black rounded-lg mx-8 my-4 border-black" style={{ backgroundColor: "#EEECEC" }}>
                    <div className="flex flex-col gap-0">
                        <div className="text-base px-10 flex items-center border-bottom">
                            <p>Healthcare: </p>
                            <p className="font-normal inline text-sm">{data.healthcare_name}</p>
                        </div>
                        <div className="text-base px-10 flex items-center border-bottom">
                            <p>ID: </p>
                            <p className="font-normal inline text-sm">{data.healthcare_id}</p>
                        </div>
                        <div className="text-base px-10 flex items-center border-bottom">
                            <p>Category: </p>
                            <p className="font-normal inline text-sm">{data.category}</p>
                        </div>
                        <div className="text-base px-10 flex items-center">
                            <p>Date & Time: </p>
                            <p className="font-normal inline text-sm">{new Date(data.date).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            ))
        : (<p className="notavailabletext">No Biodata Records Viewed Yet</p>);

    return (
        <>
            {isRedirect && <Navigate to="/user/login" />}
            
            {/* Display Records Log Section */}
            {isFetchedRecords.isFetched ? (
                isFetchedRecords.isGood ? (
                    <div className="bg-white rounded-lg border-black mt-4 mx-16">
                        <div className="flex gap-2 items-center justify-between px-8">
                            <div className="flex items-center">
                                <h2 className="text-black text-xl font-semibold px-6 py-4">Viewed Records Log</h2>
                                <p className="font-light text-black text-base">Health facilities who viewed your health records</p>
                            </div>
                            <div onClick={toggleDropdownRecords} className="cursor-pointer">
                                {isOpenRecords ? (
                                    <RiArrowDropUpLine size={50} color="black" />
                                ) : (
                                    <RiArrowDropDownLine size={50} color="black" />
                                )}
                            </div>
                        </div>
                        <div className="h-0.5 w-full bg-black"></div>
                        {isOpenRecords && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {createdRecords}
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Could Not Connect to Server...</p>
                )
            ) : (
                <div className="FetchingDataLogo">Fetching Logs <i className="fa-solid fa-rotate"></i></div>
            )}

            {/* Display Biodata Log Section */}
            {isFetchedBiodata.isFetched ? (
                isFetchedBiodata.isGood ? (
                    <div className="bg-white rounded-lg border-black mt-4 mx-16">
                        <div className="flex gap-2 items-center justify-between px-8">
                            <div className="flex items-center">
                                <h2 className="text-black text-xl font-semibold px-6 py-4">Viewed Biodata Log</h2>
                                <p className="font-light text-black text-base">Health facilities who viewed your biodata</p>
                            </div>
                            <div onClick={toggleDropdownBiodata} className="cursor-pointer">
                                {isOpenBiodata ? (
                                    <RiArrowDropUpLine size={50} color="black" />
                                ) : (
                                    <RiArrowDropDownLine size={50} color="black" />
                                )}
                            </div>
                        </div>
                        <div className="h-0.5 w-full bg-black"></div>
                        {isOpenBiodata && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {viewedBiodataRecords}
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Could Not Connect to Server...</p>
                )
            ) : (
                <div className="FetchingDataLogo">Fetching Logs <i className="fa-solid fa-rotate"></i></div>
            )}
        </>
    );
}
