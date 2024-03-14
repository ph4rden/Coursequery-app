import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import womenschedule from "../assets/womanschedule.svg";
import searchIcon from "../assets/search.svg";
import Modal from "../components/Modal";
import fakeData from "../data/db.json";
import Schedule from "@/components/Schedule";
import ScheduleList from "@/components/ScheduleList";
import axios from "axios";

interface Schedule {
    id: number;
    title: string;
    body: string;
}

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const [addScheduleURL, setAddScheduleURL] = useState<string>("http://localhost:8080/api/v1/schedules");
    
    // ----------------- Modal Props -----------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduleName, setScheduleName] = useState("");
    const handleScheduleNameChange = (name: string) => {
        setScheduleName(name);
    };
    const handleAddSchedule = async (name: string) => {
        try {
            const response = await axios.post(addScheduleURL, {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Schedule Added: ",response.data);
            setFetchTrigger(prev => prev + 1);
        } catch (error) {
            console.log(error);
        }
    };
    const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(!isModalOpen);
    };
    // ----------------- Modal Props -----------------
    

    // ----------------- ScheduleList Props -----------------
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentUser, setCurrentUser] = useState<string>("");
    // ----------------- ScheduleList Props -----------------
    

    // function to get current user 
     const fetchCurrentUser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCurrentUser(response.data.data._id);
            // console.log("Current User:", currentUser)
        } catch (error) {
            console.log(error);
        }
    };

    // function to handle search change for modal search bar
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <div className="w-88 bg-gray-50 border-r border-gray-200 flex flex-col p-8">
                <h1 className="text-lg font-medium flex items-center mb-4 border-t border-gray-200 py-4 gap-4 order-1">
                    <span>Coursequery</span>
                    <img
                        src={womenschedule}
                        alt="SVG as an image"
                        className="w-32 h-32 mr-6 ml-6"
                    />
                </h1>
                <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                    {/* Search Form */}
                    <form className="relative w-full" role="search">
                        <input
                            className="w-full pl-10 pr-3 py-2 bg-white border-none rounded-lg shadow-sm placeholder-gray-400"
                            aria-label="Search schedules"
                            placeholder="Search"
                            type="search"
                            name="q"
                            value={searchQuery} // Set the value of the input to searchQuery
                            onChange={handleSearchChange} // Update searchQuery on input change
                        />
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        {/* Conditional rendering for spinner */}
                        <div
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
                            aria-hidden
                            hidden={true}
                        />
                    </form>
                    <form>
                        <button
                            className="text-cqPurple font-medium py-2 px-3 bg-white border-none rounded-lg shadow-sm hover:shadow-md active:translate-y-0.5 transition on"
                            onClick={toggleModal}
                        >
                            New
                        </button>
                    </form>
                </div>
                {/* Navigation */}
                <nav className="flex-1 overflow-auto pt-4">
                    <ul className="list-none m-0 p-0">
                        {/* List of schedules we're gonna have to map */}
                        {<ScheduleList query={searchQuery} currentUser={currentUser} fetchTrigger={fetchTrigger}/>}
                    </ul>
                </nav>
            </div>
            {/* Detail */}
            <div className="flex-1 p-8">
                <Schedule />
                <Modal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    handleAdd={handleAddSchedule}
                    handleScheduleName={handleScheduleNameChange}
                    scheduleName={scheduleName}
                />
            </div>
        </div>
    );
}