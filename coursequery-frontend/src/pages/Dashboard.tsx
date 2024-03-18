import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import womenschedule from "../assets/womanschedule.svg";
import searchIcon from "../assets/search.svg";
import Modal from "../components/Modal";
import fakeData from "../data/db.json";
import Schedule from "@/components/Schedule";
import ScheduleList from "@/components/ScheduleList";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Schedule {
    id: number;
    title: string;
    body: string;
}

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const [addScheduleURL, setAddScheduleURL] = useState<string>(
        "http://localhost:8080/api/v1/schedules"
    );

    // ----------------- Modal Props -----------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduleName, setScheduleName] = useState("");
    const handleScheduleNameChange = (name: string) => {
        setScheduleName(name);
    };
    const handleAddSchedule = async (name: string) => {
        try {
            const response = await axios.post(
                addScheduleURL,
                {
                    name: name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Schedule Added: ", response.data);
            setFetchTrigger((prev) => prev + 1);
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
            const response = await axios.get(
                "http://localhost:8080/api/v1/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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

    // functions for ScheduleList: onUpdate and onDelete
    const onUpdate = async (scheduleId: string, newName: string) => {
        const url = `http://localhost:8080/api/v1/schedules/${scheduleId}`;
        try {
            const response = await axios.put(
                url, 
                {
                    name: newName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            console.log("Schedule Updated: ", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onDelete = async (scheduleId: string) => {
        const url = `http://localhost:8080/api/v1/schedules/${scheduleId}`;
        try {
            const response = await axios.delete(
                url, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            console.log("Schedule Deleted: ", response);
        } catch (error) {
            console.log(error);
        }
    }

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
                <nav className="flex-1 overflow-auto pt-4">
                    <ul className="list-none m-0 p-0">
                        {
                            <ScheduleList
                                query={searchQuery}
                                currentUser={currentUser}
                                fetchTrigger={fetchTrigger}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        }
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-8 relative">
                {" "}
                <Link to="/profile" className="absolute right-8 top-8">
                    <Avatar
                        style={{
                            marginBottom: "20px",
                            width: "100px",
                            height: "100px",
                            border: "4px solid white",
                            borderRadius: "50%",
                        }}
                    >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex flex-col h-full justify-center">
                    <div className="text-center text-xl p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
                        Click on a schedule or create one to get started
                    </div>
                </div>
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
