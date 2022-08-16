import React, { createContext, useEffect, useState } from "react";
import { dummyData } from '../../dummy-data'

export const GlobalContext = createContext({});

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('chart')) || {
        tasks: [],
        mode: "Day",
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

    console.log(state)

    //Saving data to localStorage
    useEffect(() => {
        localStorage.setItem('chart', JSON.stringify(state));
    }, [state]);

    const dataSchedule = function () {
        var tasksTemp = [];
        dummyData?.map((el) => {
            let scheduleDays = [];
            el?.scheduleDays?.map((x) => {
                scheduleDays.push(x);
            });
            tasksTemp.push({
                start: scheduleDays[0].start,
                end: scheduleDays[scheduleDays.length - 1].end,
                id: el.scheduleId,
                scheduleAddress: el.scheduleAddress,
                progress: el.scheduleTotalProgressPercentage ?? 0,
                weather: el.scheduleDays.map(el => el.weather.map(el => el.temperature)),
                color: el.scheduleDays.map(el => el.color),
                crews: el.scheduleDays.map(el => el.crews),
                image: el.scheduleDays.map(el => el.image),
                notes: el.scheduleDays.map(el => el.notes),
                fleet: el.scheduleDays.map(el => el.fleet),
                linkedDays: el.scheduleDays.map(el => el.linkedDays),
                day: el.scheduleDays.map(el => el.day),
                status: el.scheduleDays.map(el => el.status),
            })
        });
        // console.log(tasksTemp)
        return tasksTemp;
    };

    dataSchedule()


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