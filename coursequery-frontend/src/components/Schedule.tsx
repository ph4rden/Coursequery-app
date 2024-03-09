import { Scheduler } from "@aldabil/react-scheduler";
import { useState, useEffect } from "react";
import {
    EventActions,
    ProcessedEvent,
    ViewEvent,
    SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import axios from "axios";
import { start } from "repl";

export default function Schedule() {
    // Token and URL
    const [URL, setURL] = useState<string>(
        "http://localhost:8080/api/v1/courses"
    );
    const token = localStorage.getItem("token");
    const [events, setEvents] = useState<ProcessedEvent[]>([]);

    // Map day of week to string
    const dayOfWeekMap: { [key: number]: string } = {
        0: "sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
    };

    // Fetch events from remote DB
    // Going to have to redo this to only get courses for the schedule we're on
    const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
        try {
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data;
            console.log(data);
            const events = data.map((event: any) => {
                const [startHours, startMinutes] = event.startTime.split(":");
                const [endHours, endMinutes] = event.endTime.split(":");

                // Format the time with leading zeros if necessary
                const formattedStartTime = `${parseInt(startHours)
                    .toString()
                    .padStart(2, "0")}:${startMinutes.padStart(2, "0")}`;
                const formattedEndTime = `${parseInt(endHours)
                    .toString()
                    .padStart(2, "0")}:${endMinutes.padStart(2, "0")}`;
                const startDate = new Date();
                const endDate = new Date();

                startDate.setHours(parseInt(formattedStartTime));
                endDate.setHours(parseInt(formattedEndTime));

                return {
                    event_id: event._id,
                    title: event.title,
                    start: startDate,
                    end: endDate,
                    disabled: false,
                    admin_id: [1, 2, 3, 4],
                    // everything after this has yet to be implemented into the component
                    days: event.days,
                    professor: event.professor,
                    location: event.location,
                    description: event.description,
                };
            });
            setEvents(events);
        } catch (error) {
            throw new Error("Error fetching data");
        }
    };

    // Handle delete event
    const handleDelete = async (deletedId: string): Promise<void> => {
      try {
          const res = await axios.delete(`${URL}/${deletedId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          const updatedEvents = await fetchRemote({});
          setEvents(updatedEvents);
          console.log("Deleted event:", res.data);
      } catch (error) {
          console.error("Error deleting event:", error);
          throw error;
      }
  };

    // Handle confirm when editing or creating an event
    const handleConfirm = async (
        event: ProcessedEvent,
        action: EventActions
    ): Promise<ProcessedEvent> => {
        console.log("handleConfirm =", action, event);
        return new Promise((res, rej) => {
            let response;
            if (action === "edit") {
                /** PUT event to remote DB */
                console.log("PUT event to remote DB");
                response = axios.put<ProcessedEvent>(
                    `${URL}/${event.event_id}`,
                    { ...event },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else if (action === "create") {
                /**POST event to remote DB */
                console.log("POST event to remote DB");
                const dayStrings = [
                    event.start.getDay(),
                    event.end.getDay(),
                ].map((dayNum) => dayOfWeekMap[dayNum]);
                const formatTime = (date: Date): string => {
                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                    return `${hours}:${minutes}`;
                };

                const startTime = formatTime(event.start);
                const endTime = formatTime(event.end);

                response = axios.post<ProcessedEvent>(
                    URL,
                    {
                        title: event.title,
                        startTime: startTime, // Use formatted startTime // This may be the issue
                        endTime: endTime, // Use formatted endTime // May be the iss
                        days: dayStrings,
                        professor: event.professor,
                        location: event.location,
                        description: event.description,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            res({ ...event, event_id: event.event_id });
        });
    };


    return (
        <div>
            <Scheduler
                events={events}
                hourFormat="24"
                view="week"
                disableViewNavigator={true}
                navigation={false}
                week={{
                    weekDays: [2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 8,
                    endHour: 20,
                    step: 60,
                    disableGoToDay: true,
                }}
                fields={[
                    {
                        name: "professor",
                        type: "input",
                        config: {
                            label: "Professor",
                            multiline: true,
                            rows: 1,
                        },
                    },
                    {
                        name: "location",
                        type: "input",
                        config: { label: "Location", multiline: true, rows: 1 },
                    },
                    {
                        name: "description",
                        type: "input",
                        config: {
                            label: "Description",
                            multiline: true,
                            rows: 1,
                        },
                    },
                ]}
                viewerExtraComponent={(fields, event) => {
                    return (
                        <div>
                            <p>Professor: {event.professor || "Nothing..."}</p>
                            <p>Location: {event.location || "Nothing..."}</p>
                            <p>
                                Description: {event.description || "Nothing..."}
                            </p>
                        </div>
                    );
                }}
                getRemoteEvents={fetchRemote}
                onConfirm={handleConfirm}
                onDelete={handleDelete}
            />
        </div>
    );
}
