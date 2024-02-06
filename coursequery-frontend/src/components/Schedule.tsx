import { Scheduler } from "@aldabil/react-scheduler";

export default function Schedule() {
  return (
    <>
      <Scheduler
        view="week"
        week={{
          weekDays: [2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 8,
          endHour: 20,
          step: 60,
          disableGoToDay: true,
        }}
        disableViewNavigator={true}
        navigation={false}
        fields={[
          {
            name: "professor",
            type: "input",
            config: { label: "Professor", multiline: true, rows: 1 },
          },
          {
            name: "location",
            type: "input",
            config: { label: "Location", multiline: true, rows: 1 },
          },
          {
            name: "description",
            type: "input",
            config: { label: "Description", multiline: true, rows: 1 },
          },
        ]}
        events={[
          {
            event_id: 1,
            title: "Event 1",
            professor: "conly",
            location: "erb",
            description: "hr",
            start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
          },
        ]}
      />
    </>
  );
}
