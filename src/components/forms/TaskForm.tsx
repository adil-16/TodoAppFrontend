import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTasks";
import { addTaskAsync } from "../../redux/slices/taskSlice";
import { Task } from "../../types/Task";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const TaskForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tasks.loading);

  const initialValues = {
    taskDescription: "",
    dueDate: null as Date | null,
  };

  const validationSchema = Yup.object().shape({
    taskDescription: Yup.string()
      .required("Task description is required")
      .min(3, "Task description must be at least 3 characters"),
    dueDate: Yup.date().nullable().notRequired(),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    const newTask: Task = {
      description: values.taskDescription,
      dueDate: values.dueDate ? values.dueDate : undefined,
      isCompleted: false,
      createdAt: new Date(),
    };

    try {
      await dispatch(addTaskAsync(newTask)).unwrap(); // for errors
      toast.success("Task added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="mb-4">
          <div className="flex items-center space-x-5">
            <Field
              type="text"
              name="taskDescription"
              placeholder="Enter task description"
              className="border p-2 mr-2 rounded"
            />

            <Field
              type="date"
              name="dueDate"
              className="border p-2 mr-2 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(
                  "dueDate",
                  e.target.value ? new Date(e.target.value) : null
                )
              }
            />

            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center 
              }`}
              disabled={loading}
            >
              {loading ? <span className="animate-spin"></span> : "Add Task"}
            </button>
          </div>
          <ErrorMessage
            name="taskDescription"
            component="div"
            className="text-red-500"
          />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
