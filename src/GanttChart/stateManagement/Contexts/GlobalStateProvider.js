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

    const daysInfo = () => {
        let temp = {}
        dummyData?.map(e => e.scheduleDays.map(day => {
            temp[day.id] = day
        }))
        console.log(temp)
        return temp;
    }

    const dataSchedule = function () {
        let allDays = daysInfo();
        let objTask = dataLabel();
        let tasksTemp = [];
        objTask?.map((el) => {
            tasksTemp.push({
                start: allDays[el?.dayId?.[0]]?.startDate,
                end: allDays[el?.dayId?.[el?.dayId?.length - 1]]?.endDate,
                progress: el.progress,
                scheduleDays: el.scheduleDays,
                name: el.label,
                dependencies: el.dependencies,
                dayId: el.dayId,
                id: el.id,
                custom_class: el?.customClass,
                dispatches: el?.dispatches,
                scheduleId: el?.scheduleId,
                crews: el?.crews
            })
        });
        return tasksTemp;
    };

    const dataLabel = () => {
        let obj = []
        dummyData?.map(v => {
            Object?.values(v?.toBeScheduled).flatMap(el => {
                el?.flatMap?.(x => {
                    x?.serviceOptions?.map?.(e => {
                        e?.map(s => {
                            s?.items?.map(item => {
                                obj.push({
                                    id: `${x?.label} ${s?.elevationLabel} PLI ${item.id}`,
                                    dependencies: item.id === 1 ? "" : `${x?.label} ${s?.elevationLabel} PLI ${item.id - 1},`,
                                    label: `${x?.label} - ${s?.elevationLabel} - PLI ${item?.id}`,
                                    dayId: item?.days,
                                    scheduleDays: v?.scheduleDays,
                                    progress: item?.totalProgress,
                                    customClass: s?.type,
                                    dispatches: v?.dispatches,
                                    scheduleId: v.scheduleId,
                                    crews: v?.crews
                                })
                            })
                        })
                    })
                })
            })

        })
        console.log(obj)
        return obj;
    }

    console.log(state)

    const handleAddTask = (taskObject) => {
        const labels = [...state.labels, taskObject.day]; //adds a new label
        setState({ ...state, tasks: [...state.tasks, taskObject], labels });
    };

    const handleUpdate = (taskObject) => {
        console.log(taskObject)
        state.tasks[state.tasks.findIndex(el => el.id === taskObject.id)] = taskObject;
        setState(state);
    };

    // const updatePosition = (task, start, end) => {
    //     alert("update position")
    //     console.log("130", state?.tasks?.map?.((x) => x?.filter((fl) => fl.name !== task.name)))
    //     console.log(task, start, end)
    //     const temp = state?.tasks?.filter?.(x => x.name !== task.name)
    //     console.log(temp)
    //     console.log(task)
    //     const t = { ...task, start, end }
    //     console.log(t)
    //     setState({ ...state, tasks: [...temp, t] })
    //     const tasks = [...state.tasks];
    //     const index = tasks.findIndex((x) => x.id === task.id);
    //     tasks[index].start = start;
    //     tasks[index].end = end;
    //     setState({ ...state, tasks });
    //     console.log(state)
    // };

    // const handleDeleteTask = (index) => {
    //      console.log("this is the task object")
    //      console.log(taskObject)
    //     setState(prev => {
    //         prev.labels.splice(index, 1)
    //         prev.tasks.splice(index, 1)
    //         return { ...prev }
    //     })
    // };

    useEffect(() => {
        if (!!state) {
            daysInfo()
            const label = dataLabel()
            const labels = label?.map?.(e => e.label)
            const tasks = dataSchedule()
            setState({ ...state, tasks, labels });
        }
    }, [state.mode, state.deleted]);

    console.log("ERVIS", state)



    return (
        <GlobalContext.Provider
            value={{ ...state, handleAddTask, setState, handleUpdate }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;