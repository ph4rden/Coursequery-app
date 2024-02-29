import fakeData from "../data/db.json";
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
  }

export default function ScheduleList({ query }: ScheduleListProps){
    const data: Data = fakeData as Data;
    // fetch schedules from DB for this user


    const filteredSchedules = data.schedules.filter((schedule: Schedule) =>
        schedule.title.toLowerCase().includes(query.toLowerCase())
    );

    const scheduleList = filteredSchedules.map((schedule: Schedule) => (
        <li className="mb-1" key={schedule.id.toString()}>
            <a
                href={`/schedules/${schedule.id}`}
                className="flex items-center justify-between whitespace-pre py-2 px-3 rounded-lg text-current no-underline gap-4 hover:bg-gray-200"
            >
                {schedule.title}
            </a>
        </li>
    ));


    return(
        <div>
            {scheduleList}
        </div>
    )
}