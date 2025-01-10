import React, { useEffect, useState } from "react";
import { generate_Date, months } from "./Time_and_date";
import cn from "./cn";
import dayjs from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useInterviewContext } from "../../context/InterviewContext";
import { useNavigate, useParams } from "react-router-dom";
const Calender = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [select, setSelect] = useState(currentDate);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [addPopup, setAddPopup] = useState(false);
  const [form, setForm] = useState({
    candidate: "",
    interviewer: "",
    date: select.toDate().toDateString(),
    type: "",
  });
  const navigate = useNavigate();
  const { addInterview, updatedInterview, interviews } = useInterviewContext();
  const [eventList, setEventList] = useState(interviews);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const interview = interviews.find((int) => int.id === id);
      if (interview) {
        setForm({
          ...interview,
          date: dayjs(interview.date).format("ddd MMM DD YYYY"),
        });
      }
    }
  }, [id, interviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!select.toDate().toDateString()) {
      return alert("Please select a date");
    }
    if (id) updatedInterview(id, form);
    else {
      addInterview({ ...form, id: Date.now().toString() });
      setAddPopup(true);
    }
    // navigate("/");
  };

  //here the functions for handle hover a date and display event if it has other wise display the No Event Message to user

  const handleMouseEnter = (date) => {
    const event = eventList.find(
      (event) =>
        dayjs(event.date).format("ddd MMM DD YYYY") ===
        date.format("ddd MMM DD YYYY")
    );
    setHoveredDate(date);
    setHoveredEvent(event || null);
  };

  //handle mouse leave the date
  const handleMouseLeave = () => {
    setHoveredDate(null);
    setHoveredEvent(null);
  };

  return (
    <div className="bg_color h-screen flex justify-center items-center ">
      <div className="flex md:flex-row flex-col md:divide-x-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ">
        <div className="w-96 h-100  px-3 py-3 pt-10 md:pt-3  text-white rounded-md mt-52 md:mt-0">
          <div className="flex justify-between items-center">
            <h1>
              {months[today.month()]} , {today.year()}
            </h1>
            <div className="flex gap-1 items-center">
              <ChevronLeftIcon
                className="cursor-pointer"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1 className="cursor-pointer">Today</h1>
              <ChevronRightIcon
                className="cursor-pointer"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 w-full">
            {days.map((day, index) => {
              return (
                <h1 key={index} className="h-14 grid place-content-center">
                  {day}
                </h1>
              );
            })}
          </div>
          <div className="grid grid-cols-7 w-full ">
            {generate_Date(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                const formatDate = date.format("ddd MMM DD YYYY");
                return (
                  <div
                    key={index}
                    className="h-14 border-t border-gray-400 place-content-center"
                    onMouseEnter={() => {
                      handleMouseEnter(date);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-red-600 text-white" : "",
                        select.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black, text-white"
                          : "",
                        eventList.map((event) => {
                          return dayjs(event.date).format("ddd MMM DD YYYY") ===
                            formatDate
                            ? "content-none  bg-green-500 "
                            : "";
                        }),

                        "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white cursor-pointer"
                      )}
                      onClick={() => {
                        setSelect(date);
                        setForm({
                          ...form,
                          date: date.toDate().toDateString(),
                        });
                      }}
                    >
                      {date.date()}
                    </h1>
                    {/* Here I am Adding popover or one box to shows the event to use when user hover the specific date */}
                    {hoveredDate &&
                      hoveredDate.format("ddd MMM DD YYYY") === formatDate && (
                        <div className="absolute md:top-[20%] md:left-[28%] bg-gray-800 text-white p-2 rounded shadow-lg w-40 top-[2%] left-[28%]">
                          {hoveredEvent ? (
                            <>
                              <p className="font-bold">{hoveredEvent.date}</p>
                              <p className="text-sm">
                                {hoveredEvent.description}
                              </p>
                              <p className="text-sm">{hoveredEvent.time}</p>
                            </>
                          ) : (
                            <p className="text-gray-300">No events</p>
                          )}
                        </div>
                      )}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="w-96 h-[415px] bg-[#242424] px-2 py-2 text-white text-center rounded-md overflow-scroll hide_the_scrollbar ">
          <h1 className="">
            Interview Schedule for {select.toDate().toDateString()}{" "}
          </h1>
          <br />
          <hr />
          <form className="flex flex-col px-4 " onSubmit={handleSubmit}>
            <label className="text-start mb-1 mt-2">Interview Date:</label>
            <div className="bg-gray-50 border text-start  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
              {form.date}
            </div>
            <label htmlFor="candidate" className="text-start mb-1 mt-2">
              Candidate Name :
            </label>
            <input
              type="text"
              name="candidate"
              value={form.candidate}
              onChange={handleChange}
              placeholder="Candidate Name"
              required
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            />
            <label htmlFor="interviewer" className="text-start mb-1 mt-2">
              Interviewer Name :
            </label>
            <input
              type="text"
              name="interviewer"
              value={form.interviewer}
              onChange={handleChange}
              placeholder="Interviewer Name"
              required
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            />
            <label htmlFor="type" className="text-start mb-1 mt-2">
              Select Interview Type :
            </label>
            <select
              name="type"
              onChange={handleChange}
              value={form.type}
              required
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
            </select>
            <div className="flex flex-row items-center justify-between py-4 ">
              <button
                className="text-black px-2 py-2 bg-green-500  border rounded-lg "
                type="submit"
              >
                {id ? "Update" : "Schedule"} Interview
              </button>
              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded-md"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
      {addPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-fit p-4 flex flex-col gap-4 rounded-lg">
            <h1 className="text-xl font-bold">
              Successfully Added Scheduled Interview
            </h1>
            <button
              onClick={() => setAddPopup(false)}
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

export default Calender;
