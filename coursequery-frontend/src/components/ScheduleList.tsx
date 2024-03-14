import axios from "axios";
import { useState, useEffect } from "react";
interface Schedule {
    id: number;
    title: string;
    body: string;
}

interface ScheduleListProps {
    query: string;
    currentUser: string;
    fetchTrigger: number;
}

export default function ScheduleList({
    query,
    currentUser,
    fetchTrigger,
}: ScheduleListProps) {
    // const data: Data = fakeData as Data;
    const [scheduleData, setScheduleData] = useState([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [URL, setURL] = useState<string>(
        `http://localhost:8080/api/v1/schedules/${currentUser}`
    );
    const token = localStorage.getItem("token");

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
      }, [currentUser, fetchTrigger]); 

    // Filter schedules based on query
    const filteredSchedules = scheduleData.filter((schedule) =>
        schedule.name.toLowerCase().includes(query.toLowerCase())
    );

    const scheduleList = filteredSchedules.map((schedule) => (
        <li className="mb-1" key={schedule._id}>
            <a
                href={`/dashboard/${schedule._id}`}
                className="flex items-center justify-between whitespace-pre py-2 px-3 rounded-lg text-current no-underline gap-4 hover:bg-gray-200"
            >
                {schedule.name}
            </a>
        </li>
    ));

    return <div>{scheduleList}</div>;
}
