import React from "react";
import TaskForm from "../components/forms/TaskForm";
import TaskList from "../components/TaskList";
import FilterSort from "../components/filters/FilterSort";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Todo Task Application</h1>
      <TaskForm />
      <FilterSort />
      <TaskList />
    </div>
  );
};

export default Home;
