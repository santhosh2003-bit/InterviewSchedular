import React, { useEffect, useState } from "react";
import { useInterviewContext } from "../context/InterviewContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const CreateEditInterview = () => {
  const { addInterview, updatedInterview, interviews } = useInterviewContext();
  const [form, setForm] = useState({
    candidate: "",
    interviewer: "",
    date: "",
    type: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const interview = interviews.find((int) => int.id === id);
      if (interview) setForm(interview);
    }
  }, [id, interviews]);
  const handleChange = (e) => {
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) updatedInterview(id, form);
    else addInterview({ ...form, id: Date.now().toString() });
    navigate("/");
  };

  return (
    <div className="bg_color w-full h-screen relative px-4">
      <FaArrowLeft
        style={{
          fontSize: "24px",
          color: "white",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: "100",
        }}
        onClick={() => navigate("/")}
      />
      <div className="flex justify-center items-center w-full h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-[600px]"
        >
          <div className="border rounded-xl p-3">
            <input
              type="text"
              name="candidate"
              value={form.candidate}
              onChange={handleChange}
              placeholder="Candidate Name"
              required
              className="bg-transparent text-white  outline-none border-none w-full placeholder:text-white"
            />
          </div>
          <div className="border rounded-xl p-3">
            <input
              type="text"
              name="interviewer"
              value={form.interviewer}
              onChange={handleChange}
              placeholder="Interviewer Name"
              required
              className="bg-transparent text-white  outline-none border-none w-full placeholder:text-white"
            />
          </div>
          <div className="border rounded-xl p-3 flex items-center">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border-none outline-none bg-transparent rounded-xl text-white w-full flex items-center justify-between"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-white cursor-pointer bg-transparent"
              onClick={() =>
                document.querySelector('input[type="date"]').showPicker()
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="border rounded-xl p-3">
            <select
              name="type"
              onChange={handleChange}
              value={form.type}
              required
              className="bg-transparent text-white  outline-none border-none w-full"
            >
              <option value="">Select Type</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
            </select>
          </div>
          <button
            className="text-white p-3 border rounded-lg hover:bg-gray-700 duration-200"
            type="submit"
          >
            {id ? "Update" : "Schedule"} Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditInterview;
