import React, { createContext, useEffect, useState } from "react";
import { dummyData } from '../../dummy-data'

export const GlobalContext = createContext({});

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('chart')) || {
        tasks: [],
        mode: "Week",
        labels: [],
        deleted: [],
    });

    //Getting data from LocalStorage
    useEffect(() => {
        const charts = JSON.parse(localStorage.getItem('chart'));
        if (charts) {
            setState(state);
        }
    }, [state])

    // console.log(state)

    //Saving data to localStorage
    useEffect(() => {
        localStorage.setItem('chart', JSON.stringify(state));
    }, [state]);


    const dataSchedule = function () {
        let tasksTemp = [];
        dummyData?.map((el) => {
            tasksTemp.push({
                start: el?.scheduleDays[0].startDate,
                end: el?.scheduleDays[el?.scheduleDays.length - 1].endDate,
                id: el.scheduleId,
                scheduleAddress: el.scheduleAddress,
                progress: el.scheduleTotalProgressPercentage ?? 0,
                scheduleDays: el.scheduleDays
            })
        });
        return tasksTemp;
    };

    useEffect(() => {
        const tasks = dataSchedule();
        // console.log(tasks);
        const labels = dummyData?.map(id => id.scheduleAddress)
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

    const updatePosition = (task, start, end) => {
        console.log(end)
        // alert("update position")
        console.log(task, start, end)
        const temp = state.tasks.filter(x => x.scheduleAddress !== task.scheduleAddress)
        // console.log("this is task")
        console.log(task)
        const t = { ...task, start, end }
        // save t to api
        console.log(t)
        setState({ ...state, tasks: [...temp, t] })
        const tasks = [...state.tasks];
        const index = tasks.findIndex((x) => x.id === task.id);
        tasks[index].start = start;
        tasks[index].end = end;
        setState({ ...state, tasks });
        console.log(state)
    };

    // console.log(new Date().toUTCSring());

    const handleDeleteTask = (index) => {
        // console.log("this is the task object")
        // console.log(taskObject)
        setState(prev => {
            prev.labels.splice(index, 1)
            prev.tasks.splice(index, 1)
            return { ...prev }
        })
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