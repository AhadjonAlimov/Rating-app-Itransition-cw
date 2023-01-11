import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Review from './pages/Review';
import ReviewListPage from './pages/ReviewListPage';
import UserPage from './pages/UserPage';
import UsersList from './pages/UsersList';
import axiosUrl from './helpers/api';
import AdminRouter from './routes/AdminRouter';


function App() {
  const { auth } = useSelector((state) => state.authReducer);
  const { reviews, isReviewPending } = useSelector((state) => state.reviewReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    try {
      dispatch({
        type: "REVIEW_FETCHING",
      });
      const { data } = await axiosUrl.get(
        `/getallreviews`,
        {
          headers: {
            Authorization: `AA ${auth?.token}`,
          },
        }
      );
      dispatch({
        type: "REVIEW_FETCHED",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "REVIEW_FETCHING_ERROR",
      });
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto scrollHide">
      <Navbar />
      <Routes>
        <Route element={<LoggedInRoutes />} >
          <Route path="/" element={<Home reviews={reviews} isReviewPending={isReviewPending} />} exact />
          <Route path="/review/:id" element={<Review />} exact />
          <Route path="/userpage" element={<UserPage />} exact />
          <Route path="*" element={<NotFound />} exact />

          <Route element={<AdminRouter />} >
            <Route path="/userslist" element={<UsersList />} exact />
          </Route>
          
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
