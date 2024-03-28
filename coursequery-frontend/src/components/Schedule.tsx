// this file probably has too much code in it but eh it works
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
import { get } from "http";
import { Icon } from "../components/Icon";

export default function Schedule() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const token = localStorage.getItem("token");

    // Scrapers
    const [isLoading, setIsLoading] = useState(false);
    const ratemyprofessorscraperURL = "http://127.0.0.1:5000/get_professors";
    const wikiscraperURL = "http://127.0.0.1:5000/wiki_scrape";
    // Token and URL
    const [URL, setURL] = useState<string>(
        "http://localhost:8080/api/v1/courses"
    );

    // Function to handle back navigation
    const handleBack = () => {
        navigate("/dashboard"); // Navigate back to the Dashboard component
    };
    // Events state and ID
    const [events, setEvents] = useState<ProcessedEvent[]>([]);
    const [toggleRefresh, setToggleRefresh] = useState(0);

    // course events
    const [courses, setCourses] = useState({} as any);

    // Schedule Specific Stuff
    let { scheduleId } = useParams<{ scheduleId: string }>();
    const [scheduleName, setScheduleName] = useState("");
    const [selectedScheduleCourses, setSelectedScheduleCourses] = useState(
        {} as any
    );
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

    // Handle delete event
    const handleDelete = async (deletedId: string): Promise<void> => {
        try {
            const res = await axios.delete(`${URL}/${deletedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedScheduleCourses([]);
            const updatedEvents = events.filter(event => event.event_id !== deletedId);
            setEvents(updatedEvents);
            setToggleRefresh(toggleRefresh + 1);
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
                setToggleRefresh(toggleRefresh + 1);
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
                        department: event.department,
                        coursenumber: event.coursenumber,
                        location: event.location,
                        description: event.description,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const courseIdentification = response.data.data._id;
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
                throw error;
            }
        }
        setToggleRefresh(toggleRefresh + 1);
        // Perform further actions with responseData if needed
        return { ...event, event_id: event.event_id }; // Adjust as needed based on actual response structure
    };

    const findProfessorRMP = async (professor) => {
        const enrichedCourses = await axios.post(ratemyprofessorscraperURL, {
            ProfessorName: professor,
        });
        return enrichedCourses;
    };

    const findClassWiki = async (department, courseNumber) => {
        const enrichedCourses = await axios.post(wikiscraperURL, {
            section: department,
            number: courseNumber,
        });
        return enrichedCourses;
    };

    async function getProfessorData(professorName: string) {
        try {
            const data = await findProfessorRMP(professorName);
            return data.data;
        } catch (error) {
            console.error("Error fetching RMP data:", error);
        }
    }

    async function getClassData(department: string, courseNumber: string) {
        try {
            const data = await findClassWiki(department, courseNumber);
            return data.data;
        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    }

    async function updateEventsWithScrapedData(courses) {
        setIsLoading(true);
        const eventPromises = courses.map(async (course) => {
            const [startHours, startMinutes] = course.data.startTime.split(":");
            const [endHours, endMinutes] = course.data.endTime.split(":");
            const eventDay = course.data.days[0]; // First listed day
            const eventDate = getNextOccurrenceOfWeekday(eventDay);

            eventDate.setHours(
                parseInt(startHours, 10),
                parseInt(startMinutes, 10),
                0
            );
            const endDate = new Date(eventDate.getTime());
            endDate.setHours(
                parseInt(endHours, 10),
                parseInt(endMinutes, 10),
                0
            );

            try {
                // Concurrently fetch data from both sources
                const professorDataPromise = getProfessorData(
                    course.data.professor
                );
                const classDataPromise = getClassData(
                    course.data.department,
                    course.data.coursenumber
                );

                // Wait for both promises to resolve
                const [professorData, classData] = await Promise.all([
                    professorDataPromise,
                    classDataPromise,
                ]);
                
                // const professorInfo = `Department: ${professorData.department}, School: ${professorData.school}, Rating: ${professorData.rating}, Difficulty: ${professorData.difficulty}, Total Ratings: ${professorData.total_ratings}, Would Take Again: ${professorData.would_take_again}%`;

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
                    department: course.data.department,
                    coursenumber: course.data.coursenumber,
                    location: course.data.location,
                    departments: professorData.department,
                    school: professorData.school,
                    rating: professorData.rating,
                    difficulty: professorData.difficulty,
                    totalRatings: professorData.total_ratings,
                    wouldTakeAgain: professorData.would_take_again,
                    description: classData.description,
                };
            } catch (error) {
                console.error("Error updating event with scraped data:", error);
                // Handle the error appropriately, possibly by returning a modified object indicating the error
                return {
                    ...course,
                    description: `${course.data.description}. Error fetching additional information.`,
                };
            }
        });
        // Wait for all Promises to resolve and then set the new events
        Promise.all(eventPromises)
            .then((updatedEvents) => {
                setEvents(updatedEvents);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(
                    "Error in updating events with scraped data:",
                    error
                );
            });
    }

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
        let daysUntilNext = (dayIndex + 7 - now.getDay()) % 7;
    
        // If daysUntilNext is 0, it means the day is today. 
        // This line ensures that if it's currently the same day of the week, it schedules for today.
        daysUntilNext = daysUntilNext === 0 ? 0 : daysUntilNext;
    
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

    useEffect(() => {
        const fetchScheduleSpecificEvents = async () => {
            const schedule = await fetchScheduleWithId(scheduleId);
            setSelectedScheduleCourses(schedule.courses);
        };

        fetchScheduleSpecificEvents();
    }, [scheduleId, toggleRefresh]);

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
            updateEventsWithScrapedData(courses);
        }
    }, [courses]);

    return (
        <div className="flex flex-col justify-between h-screen">
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-[100]">
                    <Icon.spinner className="h-8 w-8 animate-spin" />
                </div>
            )}
            <div>
                <h1 className="text-4xl text-center mt-4">{scheduleName}</h1>
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
                            label: "Professor Name (e.g. Chris Conly)",
                            multiline: true,
                            rows: 1,
                        },
                    },
                    {
                        name: "department",
                        type: "input",
                        config: {
                            label: "Department (e.g. CSE)",
                            multiline: true,
                            rows: 1,
                        },
                    },
                    {
                        name: "coursenumber",
                        type: "input",
                        config: {
                            label: "Course Number (e.g. 1105)",
                            multiline: true,
                            rows: 1,
                        },
                    },
                    {
                        name: "location",
                        type: "input",
                        config: {
                            label: "Location (e.g ERB)",
                            multiline: true,
                            rows: 1,
                        },
                    },
                ]}
                viewerExtraComponent={(fields, event) => {
                    return (
                        <div className="rounded-lg p-4 max-w-md mx-auto">
                            <p className="text-lg font-semibold">
                                Professor:{" "}
                                <span className="font-normal">
                                    {event.professor || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Professor Rating:{" "}
                                <span className="font-normal">
                                    {event.rating || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Professor Difficulty:{" "}
                                <span className="font-normal">
                                    {event.difficulty || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Total Ratings:{" "}
                                <span className="font-normal">
                                    {event.totalRatings || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Would Take Again:{" "}
                                <span className="font-normal">
                                    {event.wouldTakeAgain || ""}%
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Department:{" "}
                                <span className="font-normal">
                                    {event.department || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Course Number:{" "}
                                <span className="font-normal">
                                    {event.coursenumber || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Course Description:{" "}
                                <span className="font-normal">
                                    {event.description || ""}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                Location:{" "}
                                <span className="font-normal">
                                    {event.location || ""}
                                </span>
                            </p>
                        </div>
                    );
                }}
                onConfirm={handleConfirm}
                onDelete={handleDelete}
            />
            <div className="flex justify-center items-center h-32">
                {" "}
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
