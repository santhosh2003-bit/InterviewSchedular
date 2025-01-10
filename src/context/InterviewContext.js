import React, { createContext, useContext, useEffect, useState } from "react";
const interviewContext = createContext();
export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    const savedInterviews = JSON.parse(localStorage.getItem("interviews"));
    if (savedInterviews) {
      setInterviews(savedInterviews);
    }
  }, []);
  const addInterview = (interview) => {
    const conflict = interviews.some((int) => {
      return (
        int.interviewer === interview.interviewer &&
        int.date === interview.date &&
        int.time === interview.time
      );
    });
    if (conflict) {
      alert("Interview already exists");
      return;
    }
    setInterviews([...interviews, interview]);
    localStorage.setItem(
      "interviews",
      JSON.stringify([...interviews, interview])
    );
    console.log(interviews);
  };
  const updatedInterview = (id, updatedInterview) => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === id ? updatedInterview : interview
    );
    setInterviews(updatedInterviews);
    localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
  };
  const deleteInterview = (id) => {
    const updatedInterviews = interviews.filter(
      (interview) => interview.id !== id
    );
    setInterviews(updatedInterviews);
    localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
  };
  return (
    <interviewContext.Provider
      value={{ interviews, addInterview, updatedInterview, deleteInterview }}
    >
      {children}
    </interviewContext.Provider>
  );
};

export const useInterviewContext = () => useContext(interviewContext);
