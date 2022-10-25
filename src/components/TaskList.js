import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6 ">
      <header className="flex justify-between items-center py-4">
        <h1>Task List: {tasks.length}</h1>
        <Link
          to="/create"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm"
        >
          Create new Task
        </Link>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className='bg-neutral-700 p-4 rounded-md'>
            <header className="flex justify-between">
              <h3>{task.title}</h3>
              <div className="flex gap-x-2">
                <Link to={`/edit/${task.id}`} className='bg-green-500 px-2 py-1 rounded-md text-xs '>Editar</Link>
                <button onClick={() => handleDelete(task.id)} className='bg-red-500 px-2 py-1 text-xs rounded-md'>Eliminar</button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
