import React, { useState, createContext } from "react";
import dummy from "../../dummy-data";

export const GlobalContext = createContext({});

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState({
        tasks: [],
        mode: "Week",
        labels: [],
        deleted: []
    });

    React.useEffect(() => {
        const tasks = dummy.tasks;
        const labels = tasks.map((x) => x.name);
        setState({ ...state, tasks, labels });
    }, [state.mode, state.deleted]);

    const handleAddTask = (taskObject) => {
        const labels = [...state.labels, taskObject.name]; //adds a new label
        setState({ ...state, tasks: [...state.tasks, taskObject], labels });
    };

    const updatePosition = (task, start, end) => {
        // alert("update position")
        console.log(task, start, end)
        const temp = state.tasks.filter(x => x.name !== task.name)
        console.log("this is task")
        console.log(task)
        const t = { ...task, start, end }
        // save t to api
        // console.log(t)
        // setState({ ...state, tasks: [...temp, t] })
        // const tasks = [...state.tasks];
        // const index = tasks.findIndex((x) => x.id === task.id);
        // tasks[index].start = start;
        // tasks[index].end = end;
        // setState({ ...state, tasks });
    };

    const handleDeleteTask = (taskObject) => {
        // console.log("this is the task object")
        // console.log(taskObject)
        if (Array.isArray(state.tasks)) {
            const filter = state.tasks.filter((x) => x.name !== taskObject.name);
            const labels = state.labels.filter((x) => {
                console.log("thi sis x");
                console.log(x);
                return x !== taskObject.name;
            });
            console.log(labels);
            console.log(filter);
            setState({ ...state, tasks: filter, labels });
        }
    };

    return (
        <GlobalContext.Provider
            value={{ ...state, handleAddTask, handleDeleteTask, updatePosition, setState }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;
