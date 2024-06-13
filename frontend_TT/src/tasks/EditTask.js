import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  let navigate = useNavigate();

  const { task_num } = useParams();

  const [task, setTasks] = React.useState({
    task_name: "",
    task_description: "",
    expected_time: "",
    completion_day: "",
  });

  const { task_name, task_description, expected_time, completion_day } = task;

  const onInputChange = (e) => {
    setTasks({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadTask();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/task/${task_num}`, task);
    navigate("/");
  };

  const loadTask = async () => {
    const result = await axios.get(`http://localhost:8080/task/${task_num}`);
    setTasks(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 mx-auto shadow">
          <h2 className="text-center m-4">Edit Task</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="text-start mb-3">
              <label htmlFor="name" className="form-label">
                Name or Category of Task:
              </label>
              <input
                type={"text"}
                className="form-control mb-4"
                id="name"
                placeholder="Enter name/category"
                name="task_name"
                value={task_name}
                onChange={(e) => onInputChange(e)}
              />

              <label for="details" className="form-label">
                Description of Task:
              </label>
              <input
                type={"text"}
                className="form-control mb-4"
                id="details"
                placeholder="Enter details"
                name="task_description"
                value={task_description}
                onChange={(e) => onInputChange(e)}
              />

              <label for="time" className="form-label">
                How long is it expected to take:
              </label>
              <input
                type={"text"}
                className="form-control mb-4"
                id="time"
                placeholder="Enter name/category"
                name="expected_time"
                value={expected_time}
                onChange={(e) => onInputChange(e)}
              />

              <label for="completion" className="form-label">
                Date of completion:
              </label>
              <input
                type={"text"}
                className="form-control mb-4"
                id="completion"
                placeholder="Enter date"
                name="completion_day"
                value={completion_day}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-dark btn-lg"
              style={{ marginRight: "15px" }}
            >
              SUBMIT
            </button>
            <Link className="btn btn-outline-dark btn-lg" to="/">
              CANCEL
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
