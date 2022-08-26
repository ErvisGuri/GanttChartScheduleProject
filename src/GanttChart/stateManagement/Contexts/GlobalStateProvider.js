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
        let test = dataLabel();
        console.log(test)
        let tasksTemp = [];
        test.map((el) => {
            tasksTemp.push({
                start: allDays[el?.ids?.[0]]?.startDate,
                end: allDays[el?.ids?.[el?.ids?.length - 1]]?.endDate,
                progress: el.progress,
                scheduleDays: el.scheduleDays,
                name: el.id,
                dependencies: el.dependencies,
                ids: el.ids
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
                                    id: `${x?.label}${s?.elevationLabel} PLI ${item.id === 1 ? '' : item.id}`,
                                    dependencies: `${x?.label}${s?.elevationLabel}  ${item.id} `,
                                    label: `${x?.label} - ${s?.elevationLabel} - PLI${item?.id}`,
                                    ids: item?.days,
                                    scheduleDays: v?.scheduleDays,
                                    progress: item?.totalProgress,
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



    // const updatePosition = (task, startDate, endDate) => {
    //     console.log("afefawfawfaw", task, endDate, startDate)
    //     // alert("update position")
    //     console.log(task, startDate, endDate)
    //     const temp = state?.tasks?.filter?.(x => x.id !== task.id)
    //     console.log(temp)
    //     console.log(task)
    //     const t = { ...task, startDate, endDate }
    //     // save t to api
    //     console.log(t)
    //     setState({ ...state, tasks: [...temp, t] })
    //     const tasks = [...state.tasks];
    //     const index = tasks.findIndex((x) => x.id === task.id);
    //     tasks[index].startDate = startDate;
    //     tasks[index].endDate = endDate;
    //     setState({ ...state, tasks });
    //     console.log(state)
    // };

    // const handleDeleteTask = (index) => {
    //     // console.log("this is the task object")
    //     // console.log(taskObject)
    //     setState(prev => {
    //         prev.labels.splice(index, 1)
    //         prev.tasks.splice(index, 1)
    //         return { ...prev }
    //     })
    // };

    //Getting data from LocalStorage
    useEffect(() => {
        const charts = JSON.parse(localStorage.getItem('chart'));
        if (charts) {
            setState(state);
        }
    }, [state])

    // Saving data to localStorage
    // useEffect(() => {
    //     localStorage.setItem('chart', JSON.stringify(state));
    // }, [state]);


    useEffect(() => {
        if (!!state) {
            daysInfo()
            const label = dataLabel()
            const labels = label?.map?.(e => e.label)
            const tasks = dataSchedule()
            setState({ ...state, tasks, labels });
        }
    }, [state.mode, state.deleted]);

    // console.log(state)


    return (
        <GlobalContext.Provider
            value={{ ...state, state, handleAddTask, setState, handleUpdate }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;