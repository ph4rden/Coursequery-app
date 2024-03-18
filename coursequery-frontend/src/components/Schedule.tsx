import { Scheduler } from "@aldabil/react-scheduler";
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    EventActions,
    ProcessedEvent,
    ViewEvent,
    SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import axios from "axios";
import { start } from "repl";
import { set } from "date-fns";
import { Button } from "../components/ui/button";

export default function Schedule() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to handle back navigation
    const handleBack = () => {
        navigate("/dashboard"); // Navigate back to the Dashboard component
    };
    // Token and URL
    const [URL, setURL] = useState<string>(
        "http://localhost:8080/api/v1/courses"
    );
    const token = localStorage.getItem("token");
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

    // Events state and ID
    const [events, setEvents] = useState<ProcessedEvent[]>([]);

    // course events
    const [courses, setCourses] = useState({} as any);

    // Schedule Specific Stuff
    let { scheduleId } = useParams<{ scheduleId: string }>();
    const [scheduleName, setScheduleName] = useState("");
    const [selectedScheduleCourses, setSelectedScheduleCourses] = useState(
        {} as any
    );

    // using the scheduleId passed in from the URL, grabbed using useParams, to fetch the schedule data
    const fetchScheduleWithId = async (id: string) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/schedules/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log("Schedule Data", response.data.data);
            setScheduleName(response.data.data.name);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };  

    // Get course data for a single course ID, used as a help function for fetchCoursesByIds
    const fetchCourseWithId = async (id: string) => {
        const url = `http://localhost:8080/api/v1/courses/${id}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching course data for ID", id, error);
            return null;
        }
    };

    // Function to fetch data for an array of course IDs using fetchCourseWithId as defined above
    const fetchCoursesByIds = async (ids: string[]) => {
        try {
            const coursesDataPromises = ids.map((id) => fetchCourseWithId(id));
            const coursesData = await Promise.all(coursesDataPromises);

            console.log(
                `ALL COURSE DATA FOR SCHEDULE: ${scheduleId}: `,
                coursesData
            );
            return coursesData; // Return the array of fetched courses data
        } catch (error) {
            console.error("Error fetching courses data", error);
            return []; // Return an empty array or appropriate error handling
        }
    };

    // Fetch events from remote DB
    const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
        try {
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data;
            // console.log("fetchRemote Output: ", data);
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
    // TODO: Rerender the schedule after deleting an event
    const handleDelete = async (deletedId: string): Promise<void> => {
        try {
            const res = await axios.delete(`${URL}/${deletedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedScheduleCourses([]);
            const updatedEvents = await fetchRemote({});
            setEvents(updatedEvents);
            console.log("Deleted event:", res.data);
        } catch (error) {
            console.error("Error deleting event:", error);
            throw error;
        }
    };

    const handleConfirm = async (
        event: ProcessedEvent,
        action: EventActions
    ): Promise<ProcessedEvent> => {
        let responseData;
        if (action === "edit") {
            /** PUT event to remote DB */
            try {
                const response = await axios.put<ProcessedEvent>(
                    `${URL}/${event.event_id}`,
                    { ...event },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                responseData = response.data; // This now holds the resolved data
            } catch (error) {
                console.error("Error during PUT request:", error);
                throw error; // Rethrow or handle as needed
            }
        } else if (action === "create") {
            /**POST event to remote DB */
            try {
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

                const response = await axios.post<ProcessedEvent>(
                    URL,
                    {
                        title: event.title,
                        startTime: startTime,
                        endTime: endTime,
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
                console.log("POT response: ", response.data.data._id);
                const courseIdentification = response.data.data._id;
                // tie a course to current schedule TODO
                const response2 = await axios.post(
                    `http://localhost:8080/api/v1/schedules/${scheduleId}/courses/${courseIdentification}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Course added to schedule: ", response2.data);
            } catch (error) {
                console.error("Error during POST request:", error);
                throw error; // Rethrow or handle as needed
            }
        }
        // Perform further actions with responseData if needed
        return { ...event, event_id: event.event_id }; // Adjust as needed based on actual response structure
    };

    useEffect(() => {
        const fetchScheduleSpecificEvents = async () => {
            const schedule = await fetchScheduleWithId(scheduleId);
            setSelectedScheduleCourses(schedule.courses);
        };

        fetchScheduleSpecificEvents();
    }, [scheduleId]);

    useEffect(() => {
        // This should only run after selectedScheduleCourses is populated
        if (selectedScheduleCourses.length > 0) {
            const fetchEveryCourse = async () => {
                const coursesObject = await fetchCoursesByIds(
                    selectedScheduleCourses
                );
                setCourses(coursesObject);
            };
            fetchEveryCourse();
        }
    }, [selectedScheduleCourses]);

    useEffect(() => {
        if (courses.length > 0) {
            // Helper constant function to get the next occurrence of a weekday
            const getNextOccurrenceOfWeekday = (dayName) => {
                const dayNames = [
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                ];
                const now = new Date();
                const resultDate = new Date(now.getTime());
                resultDate.setHours(0, 0, 0, 0); // Normalize the time to midnight
                const dayIndex = dayNames.indexOf(dayName.toLowerCase());
                const daysUntilNext = (dayIndex + 7 - now.getDay()) % 7 || 7; // Calculate days until next occurrence
                resultDate.setDate(now.getDate() + daysUntilNext);
                return resultDate;
            };

            const colors = [
                "red",
                "blue",
                "green",
                "purple",
                "orange",
                "pink",
                "teal",
                "gray",
            ];

            const getRandomColor = () => {
                const randomIndex = Math.floor(Math.random() * colors.length);
                return colors[randomIndex];
            };

            const events = courses.map((course) => {
                const [startHours, startMinutes] =
                    course.data.startTime.split(":");
                const [endHours, endMinutes] = course.data.endTime.split(":");

                // Assuming the event occurs on the first listed day for simplicity
                const eventDay = course.data.days[0];
                const eventDate = getNextOccurrenceOfWeekday(eventDay);

                eventDate.setHours(
                    parseInt(startHours),
                    parseInt(startMinutes),
                    0
                );
                const endDate = new Date(eventDate.getTime());
                endDate.setHours(parseInt(endHours), parseInt(endMinutes), 0);

                return {
                    event_id: course.data._id,
                    title: course.data.title,
                    color: getRandomColor(),
                    start: eventDate,
                    end: endDate,
                    disabled: false,
                    admin_id: [1, 2, 3, 4],
                    days: course.data.days,
                    professor: course.data.professor,
                    location: course.data.location,
                    description: course.data.description,
                };
            });

            // If you need to transform and save the mapped data, update state here
            setEvents(events);
        }
    }, [courses]);

    return (
        <div className="flex flex-col justify-between h-screen">
            <div>
                <h1 className="text-4xl text-center mt-4">
                    {scheduleName}
                </h1>
            </div>
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
                // getRemoteEvents={fetchRemote}
                onConfirm={handleConfirm}
                onDelete={handleDelete}
            />
            <div className="flex justify-center items-center h-32">
                {" "}
                {/* Adjust height as needed */}
                <Button
                    variant="outline"
                    onClick={handleBack}
                    className="text-2xl bg-cqLightPurple"
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
}
