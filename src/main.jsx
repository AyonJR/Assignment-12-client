import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Main from './Pages/Main/Main.jsx';
import Login from './Pages/Authentication/Login.jsx';
import Register from './Pages/Authentication/Register.jsx';
import AuthProvider from './Pages/Provider/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AllTest from './Routes/AllTest.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import MyAppointments from './Pages/Dashboard/UserProfile/MyAppointments.jsx';
import AddBanner from './Pages/Dashboard/AdminProfile/AddBanner.jsx';
import AddTest from './Pages/Dashboard/AdminProfile/AddTest.jsx';
import TestDetails from './Routes/TestDetails.jsx';
import AllTests from './Pages/Dashboard/AdminProfile/AllTests.jsx';
import MostBookedServicesChart from './Pages/Dashboard/AdminProfile/MostBookedServicesChart.jsx';
import AllBanners from './Pages/Dashboard/AdminProfile/AllBanners.jsx';
import AllUsers from './Pages/Dashboard/AdminProfile/AllUsers.jsx';
import MyProfile from './Pages/Dashboard/UserProfile/MyProfile.jsx';
import TestResults from './Pages/Dashboard/UserProfile/TestResults.jsx';
import UpdateAdminTest from './Pages/Dashboard/AdminProfile/UpdateAdminTest.jsx';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/allTest",
        element: <AllTest></AllTest>
      },
      {
        path: "/test/:id",
        element: <TestDetails></TestDetails>
      },
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>, 
    children: [
      
      {
        path: "addBanner",
        element: <AddBanner></AddBanner>
      },
      {
        path: "addTest",
        element: <AddTest></AddTest>
      },
      {
        path: "allTests",
        element: <AllTests></AllTests>
      },
      {
        path: "serviceChart",
        element: <MostBookedServicesChart></MostBookedServicesChart>
      },
      {
        path: "allBanners",
        element: <AllBanners></AllBanners>
      },
      {
        path:"allUsers" , 
        element : <AllUsers></AllUsers>
      } ,
      {
        path: "myAppointments",
        element: <MyAppointments></MyAppointments>
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>
      },{
        path: "testResult",
        element: <TestResults></TestResults>
      },
      {
        path: 'updateAdminTest/:id' ,
        element: <UpdateAdminTest></UpdateAdminTest> ,
        loader: ({params}) => fetch(`http://localhost:5000/updateAdminTest/${params.id}`) 
      }
     
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
