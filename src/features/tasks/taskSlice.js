import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    completed: false,
  },
];

export const taskSLice=createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            const taskFound=state.find(task => task.id === action.payload);
            if(taskFound){
                state.splice(state.indexOf(taskFound), 1);
            }
        },
        updateTask: (state, action) => {
            const taskFound=state.find(task => task.id === action.payload.id);
            if(taskFound){
                taskFound.title=action.payload.title;
                taskFound.description=action.payload.description;
            }
        }
    }
});

export const {addTask,deleteTask,updateTask} = taskSLice.actions;

export default taskSLice.reducer;
