import fakeData from "../data/db.json";
import axios from "axios";
import { useState, useEffect } from "react";

interface Data {
    schedules: Schedule[];
}

interface Schedule {
    id: number;
    title: string;
    body: string;
}

interface ScheduleListProps {
    query: string;
    currentUser: string;
}

export default function ScheduleList({
    query,
    currentUser,
}: ScheduleListProps) {
    // const data: Data = fakeData as Data;
    const [scheduleData, setScheduleData] = useState([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [URL, setURL] = useState<string>(
        `http://localhost:8080/api/v1/schedules/${currentUser}`
    );
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (currentUser) {
            const updatedURL = `http://localhost:8080/api/v1/schedules/${currentUser}`;
            fetchSchedules(updatedURL); // Pass the updated URL as a parameter
        }
    }, [currentUser]);

    // fetch schedules from DB for this user
    const fetchSchedules = async (url: string) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // const data = response.data.data[0].courses;
            const data = response.data.data;
            console.log("Schedule Data", data);
            setScheduleData(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Filter schedules based on query
    const filteredSchedules = scheduleData.filter((schedule) =>
        schedule.name.toLowerCase().includes(query.toLowerCase())
    );

    const scheduleList = filteredSchedules.map((schedule) => (
        <li className="mb-1" key={schedule._id}>
            <a
                href={`/schedules/${schedule._id}`}
                className="flex items-center justify-between whitespace-pre py-2 px-3 rounded-lg text-current no-underline gap-4 hover:bg-gray-200"
            >
                {schedule.name}
            </a>
        </li>
    ));

    return <div>{scheduleList}</div>;
}
