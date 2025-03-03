import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../AppBar/AppBar";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";
import { fetchTasks } from "../../redux/operations";
import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <AppBar />
      <TaskForm />
      {isLoading && !error && <b>Request in progress...</b>}
      <TaskList />
    </div>
  );
}
