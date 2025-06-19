import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/FullPage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { useAuth } from "./Context/AuthContext";
import Loading from "./Pages/Loading";
import AIDoubtSolver from "./Features/AIDoubtSolver";
import TestSeries from "./Features/TestSeries";
import StudyMaterials from "./Features/StudyMaterial";
import SmartScheduler from "./Features/SmartScheduler";
import ProgressDashboard from "./Features/ProgressDashboard";
import Mentorship from "./Features/Mentorship";
import FlashcardsRevisions from "./Features/FlashCardRevisions";
import DiscussionForums from "./Features/DiscussionForums";
import ProFeature from "./FurtherPackages/Pro";
import VerifyEmail from "./Pages/verifyEmail";
import OtpPage from "./otp/otp";
import EmailVerificationWaiting from "./Waiting/EmailVer";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { authUser, setAuthUser } = useAuth();
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const user = localStorage.getItem("user");
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600); // Adjust delay if needed
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) return <Loading />;
  const isVerified=localStorage.getItem("isVerified");
  return (
    <>
      <Routes>
        <Route path="/verify-email/:token" element={isVerified ? <Home
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        /> : <VerifyEmail />} />
        <Route path="email-ver" element={isVerified ? <Home
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        /> : <EmailVerificationWaiting />} />
        <Route path="/pro-feature" element={<ProFeature />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/test-series" element={<TestSeries />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/ai-doubt-solver" element={<AIDoubtSolver />} />
        <Route path="/progress-dashboard" element={<ProgressDashboard />} />
        <Route path="/smart-scheduler" element={<SmartScheduler />} />
        <Route path="/flashcards-revisions" element={<FlashcardsRevisions />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/discussion-forums" element={<DiscussionForums />} />
        <Route
          path="/"
          element={
            <Home
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              closeSidebar={closeSidebar}
            />
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Home
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                closeSidebar={closeSidebar}
              />
            ) : (
              <Signin />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isVerified ? (
              <Home
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                closeSidebar={closeSidebar}
              />
            ) : (
              <Signup />
            )
          }
        />

      </Routes>
    </>
  );
}

export default App;
