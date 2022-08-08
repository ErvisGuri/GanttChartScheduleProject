let d1 = new Date();
let d2 = new Date();
d2.setDate(d2.getDate() + 5);
let d3 = new Date();
d3.setDate(d3.getDate() + 8);
let d4 = new Date();
d4.setDate(d4.getDate() + 20);

const employees = [
    {
        name: "Billy"
    },
    {
        name: "Bob"
    },
    {
        name: "Jo"
    }
];

const tasks = [
    {
        id: "Task 1",
        name: "Task 1",
        start: d1,
        end: d2,
        progress: 80,
        dependencies: "",
        assignees: [employees[0]]
    },
    {
        id: "Task 2",
        name: "Task 2",
        start: d2,
        end: d4,
        progress: null,
        dependencies: "Task 1",
        assignees: [employees[1]]
    },
    {
        id: "Task 3",
        name: "Redesign website",
        start: d3,
        end: d4,
        progress: 0,
        dependencies: "Task 2, Task 1",
        assignees: [employees[2]]
    },
    {
        id: "Task 4",
        name: "Task 4",
        start: new Date(),
        end: d4,
        progress: 0,
        dependencies: "Task 2, Task 1",
        assignees: [employees[2]]
    }
];

export default {
    employees,
    tasks
};
