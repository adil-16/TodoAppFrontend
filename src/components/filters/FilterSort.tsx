import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTasks";
import { fetchTasksAsync } from "../../redux/slices/taskSlice";
import { toast } from "react-toastify";

const FilterSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tasks.loading);
  const [sortBy, setSortBy] = useState<string>("");

  const handleFilter = async (status: string) => {
    try {
      toast.info("Fetching tasks...");
      await dispatch(fetchTasksAsync({ status, sortBy })).unwrap();
      toast.success("Tasks fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };

  const handleSort = async (sortOption: string) => {
    setSortBy(sortOption);
    try {
      toast.info("Fetching tasks...");
      await dispatch(
        fetchTasksAsync({ status: "", sortBy: sortOption })
      ).unwrap();
      toast.success("Tasks fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };
  return (
    <div className="mb-4">
      <div className="mb-2">
        <h2 className="font-semibold text-xl mb-2">Filters:</h2>
        <button
          className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleFilter("")}
          disabled={loading}
        >
          {loading ? <span className="animate-spin"></span> : "All"}
        </button>
        <button
          className="mr-2 bg-green-400 px-4 py-2 rounded"
          onClick={() => handleFilter("completed")}
          disabled={loading}
        >
          {loading ? <span className="animate-spin"></span> : "Completed"}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleFilter("pending")}
          disabled={loading}
        >
          {loading ? <span className="animate-spin"></span> : "Pending"}
        </button>
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-2">Sort By:</h2>
        <button
          className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleSort("dueDate")}
          disabled={loading}
        >
          {loading ? <span className="animate-spin"></span> : "Due Date"}
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleSort("creationDate")}
          disabled={loading}
        >
          {loading ? <span className="animate-spin"></span> : "Creation Date"}
        </button>
      </div>
    </div>
  );
};

export default FilterSort;
