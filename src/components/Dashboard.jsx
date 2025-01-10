import React, { useState } from "react";
import { useInterviewContext } from "../context/InterviewContext";
import { Link } from "react-router-dom";
import { MdInterpreterMode } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import dayjs from "dayjs";
const Dashboard = () => {
  const { interviews, deleteInterview } = useInterviewContext();
  const [deletePopup, setDeletePopup] = useState(false);
  const [filter, setFilter] = useState({
    date: "",
    interviewer: "",
    candidate: "",
    type: "",
  });
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const filteredInterviews = interviews.filter((interview) => {
    const filteredInterviewDate = dayjs(interview.date)
      .format("DD-MM-YYYY")
      .toString();

    const f = dayjs(filter.date).format("DD-MM-YYYY");

    return (
      (!filter.date || filteredInterviewDate === f) &&
      (!filter.interviewer ||
        interview.interviewer.includes(filter.interviewer)) &&
      (!filter.candidate || interview.candidate.includes(filter.candidate))
    );
  });
  return (
    <div className=" w-full min-h-screen bg_color text-white">
      <div className="text-center w-full h-full p-4 flex flex-col gap-7">
        <div className="flex items-center justify-between md:justify-start gap-x-4">
          <MdInterpreterMode
            style={{
              fontSize: "45px",
              color: "white",
              fontFamily: "sans-serif",
            }}
          />
          <h1 className="text-start text-xl">Interview</h1>
          <div className="flex items-center cursor-pointer hover:text-[18px] duration-75">
            <Link to="/create" className="list-none">
              Add New Interview
            </Link>
            <IoMdAdd
              style={{
                fontSize: "25px",
                color: "white",
              }}
            />
          </div>
        </div>
        <div className="border-2 px-4 py-5 rounded-lg">
          <h1 className="text-start">Filter</h1>
          <div className="flex md:flex-row flex-col w-full items-center justify-around gap-3">
            <div className="border rounded-xl p-3 w-full flex items-center justify-center">
              <input
                type="date"
                name="date"
                value={filter.date}
                onChange={handleFilterChange}
                className="bg-transparent text-white outline-none border-none w-full"
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
            <div className="border rounded-xl p-3 w-full">
              <input
                type="text"
                name="interviewer"
                value={filter.interviewer}
                onChange={handleFilterChange}
                placeholder="Filter by Interviewer Name"
                className="bg-transparent text-white placeholder:text-gray-100 outline-none border-none"
              />
            </div>
            <div className="border rounded-xl p-3 w-full">
              <input
                type="text"
                name="candidate"
                value={filter.candidate}
                onChange={handleFilterChange}
                placeholder="Filter by Candidate Name"
                className="bg-transparent text-white placeholder:text-gray-100 outline-none border-none"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-6 flex items-center justify-center border-2 rounded-lg w-full ">
          <div className=" flex flex-col gap-3 ">
            {filteredInterviews.length === 0 ? (
              <h1 className="text-2xl">No Interviews</h1>
            ) : (
              filteredInterviews.map((interview, index) => {
                return (
                  <div
                    key={index}
                    className="flex  items-center px-7 gap-x-4 border-2 rounded-md"
                  >
                    <div className="border-r">
                      <h1 className="text-2xl">{index + 1}</h1>
                    </div>
                    <div>
                      <div className="flex md:flex-row flex-col gap-x-7">
                        <h1 className="font-bold">
                          Interview Id :{" "}
                          <span className="font-normal">{interview.id}</span>
                        </h1>
                        <h1 className="font-bold">
                          Candidate Name:{" "}
                          <span className="font-normal">
                            {interview.candidate}
                          </span>
                        </h1>
                      </div>
                      <p>Interviewer Name: {interview.interviewer}</p>
                      <p>Date : {interview.date}</p>
                      <p>Type : {interview.type}</p>
                      <div className="flex items-center justify-between p-2">
                        <Link
                          className="bg-green-500 px-3 py-1 rounded-md"
                          to={`/edit/${interview.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-600 px-3 py-1 rounded-md"
                          onClick={() => {
                            deleteInterview(interview.id);
                            setDeletePopup(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {deletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-fit p-4 flex flex-col gap-4 rounded-lg">
            <h1 className="text-xl font-bold text-black text-center">
              Successfully Deleted Scheduled Interview
            </h1>
            <button
              onClick={() => setDeletePopup(false)}
              className="px-2 py-1 bg-green-500 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
