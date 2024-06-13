import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-dom-confetti";

export default function Home() {
  const [tasks, setTasks] = React.useState([]);
  const [confetti, setConfetti] = React.useState(false);
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 25,
    elementCount: 100,
    decay: 0.95,
  };

  React.useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("http://localhost:8080/tasks");
    setTasks(result.data);
  };

  //const { task_num } = useParams();

  const deleteTask = async (task_num) => {
    await axios.delete(`http://localhost:8080/task/${task_num}`);
    loadTasks();
  };

  const updateTaskDone = async (task_num) => {
    const result = await axios.put(`http://localhost:8080/done/${task_num}`);
    if (result.data.done) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1000); // Reset after 2 seconds
    }
    loadTasks();
  };

  return (
    <div className="container">
      <div style={{ position: 'fixed', top: '25%', left: '50%' }}>
        <Confetti active={confetti} config={confettiConfig} />
      </div>
      <div className="py-4">
        <table className="table align-middle">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Name/Category</th>
              <th scope="col">Task</th>
              <th scope="col">Expected Time</th>
              <th scope="col">Completion Date</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {tasks.map((task, index) => (
              <tr className={task.done ? "table-success" : ""}>
                {/* <th scope="row" key={index}>
                  {index + 1}
                </th> */}
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td>{task.expected_time}</td>
                <td>{task.completion_day}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-dark mx-2"
                    onClick={() => updateTaskDone(task.task_num)}
                  >
                    &#10003;
                  </button>
                  <Link
                    class="btn btn-outline-dark mx-2"
                    to={`/edittask/${task.task_num}`}
                  >
                    EDIT
                  </Link>
                  <button
                    type="button"
                    class="btn btn-outline-dark mx-2"
                    onClick={() => deleteTask(task.task_num)}
                  >
                    REMOVE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
