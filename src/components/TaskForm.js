import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);

  const { id } = useParams();

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      const taskFound = tasks.find((task) => task.id == id);
      setTask(taskFound);
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-1">
      <label htmlFor="title" className="block text-xs font-bold mb-2">
        Task:
      </label>
      <input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleInputChange}
        value={task.title}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />
      <label htmlFor="description" className="block text-xs font-bold mb-2">
        Description:
      </label>
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleInputChange}
        value={task.description}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />
      <button type="submit" className="bg-indigo-600 px-2 py-1">Guardar</button>
    </form>
  );
}
