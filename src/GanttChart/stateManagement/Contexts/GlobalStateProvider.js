import React, { useState, createContext, useEffect, useMemo } from "react";
import { dummyData } from '../../dummy-data'

export const GlobalContext = createContext({});

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('chart')) || {
        tasks: [],
        mode: "Day",
        labels: [],
        deleted: []
    });

    //Getting data from LocalStorage
    useEffect(() => {
        const charts = JSON.parse(localStorage.getItem('chart'));
        if (charts) {
            setState(state);
        }
    }, [state])

    //Saving data to localStorage
    useEffect(() => {
        localStorage.setItem('chart', JSON.stringify(state));
    }, [state]);




    const scheduleLabels = (id) => {
        const schId = dummyData?.map(id => id.scheduleId)
        const data = dummyData?.map((el) => el.scheduleDays)?.filter(el => console.log(el));
        console.log(data)
    }
    scheduleLabels()

    useEffect(() => {
        const dataSchedule = function () {
            let data = [];
            dummyData?.map((el) => {
                el?.scheduleDays?.map((x) => {
                    data.push(x);
                });
            });
            return data;
        };
        const tasks = dataSchedule()
        // console.log(tasks)
        const labels = tasks?.map((x => x.day))
        // console.log(labels)
        setState({ ...state, tasks, labels });
    }, [state.mode, state.deleted]);

    const handleAddTask = (taskObject) => {
        const labels = [...state.labels, taskObject.day]; //adds a new label
        setState({ ...state, tasks: [...state.tasks, taskObject], labels });
    };

    const handleUpdate = (taskObject) => {
        state.tasks[state.tasks.findIndex(el => el.id === taskObject.id)] = taskObject;
        setState(state);
    };

    const updatePosition = (task, startDate, endDate) => {
        console.log(endDate)
        // alert("update position")
        console.log(task, startDate, endDate)
        const temp = state.tasks.filter(x => x.day !== task.day)
        // console.log("this is task")
        console.log(task)
        const t = { ...task, startDate, endDate }
        // save t to api
        console.log(t)
        setState({ ...state, tasks: [...temp, t] })
        const tasks = [...state.tasks];
        const index = tasks.findIndex((x) => x.id === task.id);
        tasks[index].startDate = startDate;
        tasks[index].endDate = endDate;
        setState({ ...state, tasks });
        console.log(state)
    };

    // console.log(new Date().toUTCSring());

    const handleDeleteTask = (taskObject) => {
        // console.log("this is the task object")
        // console.log(taskObject)
        if (Array.isArray(state.tasks)) {
            const filter = state.tasks.filter((x) => x.day !== taskObject.day);
            const labels = state.labels.filter((x) => {
                return x !== taskObject.day;
            });
            console.log(labels);
            console.log(filter);
            setState({ ...state, tasks: filter, labels });
        }
    };

    return (
        <GlobalContext.Provider
            value={{ ...state, handleAddTask, handleDeleteTask, updatePosition, setState, handleUpdate }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;
