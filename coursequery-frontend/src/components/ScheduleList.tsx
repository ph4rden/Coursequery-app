import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { set } from "date-fns";
interface Schedule {
    id: number;
    title: string;
    body: string;
}

interface ScheduleListProps {
    query: string;
    currentUser: string;
    fetchTrigger: number;
    onUpdate: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export default function ScheduleList({
    query,
    currentUser,
    fetchTrigger,
    onUpdate,
    onDelete,
}: ScheduleListProps) {
    const [updateTrigger, setUpdateTrigger] = useState(0); // Local state to trigger re-fetching
    // Update the local trigger to re-fetch schedules
    const triggerReFetch = () => {
        setUpdateTrigger(prev => prev + 1);
    };
    const [scheduleData, setScheduleData] = useState([]);
    const token = localStorage.getItem("token");
    
    // Filter schedules based on query
    const filteredSchedules = scheduleData.filter((schedule) =>
    schedule.name.toLowerCase().includes(query.toLowerCase())
    );
    
    
    const [editScheduleId, setEditScheduleId] = useState<string | null>(null);
    const [deleteScheduleId, setDeleteScheduleId] = useState<string | null>(
        null
    );
    const [newName, setNewName] = useState<string>("");


    const scheduleList = filteredSchedules.map((schedule) => (
        <li
            key={schedule._id}
            className="flex justify-between items-center mb-2 hover:text-cqPurple"
        >
            <Link
                to={`/dashboard/${schedule._id}`}
                className="flex-grow text-lg"
            >
                {schedule.name}
            </Link>
            <div className="flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={() => {
                                setEditScheduleId(schedule._id);
                                setNewName(schedule.name);
                            }}
                            variant="outline"
                        >
                            ✏️
                        </Button>
                    </PopoverTrigger>
                    {editScheduleId === schedule._id && (
                        <PopoverContent className="w-80 p-8">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUpdate(schedule._id);
                                }}
                                className="space-y-4"
                            >
                                {" "}
                                {/* Increased spacing between form elements */}
                                <div>
                                    <Label
                                        htmlFor="newName"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        New Name
                                    </Label>{" "}
                                    {/* Added some styling to the label */}
                                    <Input
                                        id="newName"
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                        className="mt-1 block w-full p-2 text-sm border-gray-300 rounded-md shadow-sm" // Enhanced input styling
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-4 py-2 bg-cqPurple border border-transparent rounded-md font-semibold text-white hover:bg-blue-700"
                                >
                                    Update
                                </Button>{" "}
                                {/* Adjusted button styling */}
                            </form>
                        </PopoverContent>
                    )}
                </Popover>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteScheduleId(schedule._id)}
                        >
                            🗑️
                        </Button>
                    </AlertDialogTrigger>
                    {deleteScheduleId === schedule._id && (
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the schedule.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex justify-end gap-4 p-4">
                                <AlertDialogCancel
                                    onClick={() => setDeleteScheduleId(null)}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(schedule._id)}
                                >
                                    Delete
                                </AlertDialogAction>
                            </div>
                        </AlertDialogContent>
                    )}
                </AlertDialog>
            </div>
        </li>
    ));


    const handleUpdate = async (scheduleId: string) => {
        await onUpdate(scheduleId, newName); // Invoke the passed onUpdate function
        setEditScheduleId(null); // Close popover
        setNewName(""); // Reset newName
        triggerReFetch(); // Trigger re-fetching of schedules
    };

    const handleDelete = async (scheduleId: string) => {
        await onDelete(scheduleId); // Invoke the passed onDelete function
        setDeleteScheduleId(null); // Close dialog
        triggerReFetch(); // Trigger re-fetching of schedules
    };

    // bring props up to parent and use modal to fetch trigger? to do 3/11/2024
    useEffect(() => {
        const fetchSchedules = async () => {
            if (currentUser) {
                const url = `http://localhost:8080/api/v1/schedules/user/${currentUser}`;
                try {
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = response.data.data;
                    console.log("Schedule Data", data);
                    setScheduleData(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchSchedules();
    }, [currentUser, fetchTrigger, updateTrigger, token]);

    return <div>{scheduleList}</div>;
}
