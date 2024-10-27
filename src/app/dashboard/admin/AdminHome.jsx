"use client";
import Head from "next/head";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminHome() {
  // Data for bar chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Applications",
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        borderWidth: 1,
        data: [4000, 3000, 5000, 7000, 6000, 9000, 8000],
      },
    ],
  };

  // Data for pie chart
  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Application Status",
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
        data: [70, 20, 10],
      },
    ],
  };

  // Data for line chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Revenue ($)",
        fill: false,
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b",
        data: [20000, 25000, 23000, 30000, 35000, 40000, 45000],
        tension: 0.4,
      },
    ],
  };

  // Data for doughnut chart
  const doughnutData = {
    labels: ["Role 1", "Role 2", "Role 3", "Role 4"],
    datasets: [
      {
        label: "Roles Distribution",
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"],
        data: [30, 40, 20, 10],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Enhanced Dashboard</title>
      </Head>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Enhanced Dashboard</h1>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <span className="font-semibold">Dashboard</span> &gt; <span>Overview</span>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Welcome Section */}
          <div className="bg-white shadow-lg rounded-lg col-span-2 row-span-2 p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Welcome, Admin Name</h2>
            <p className="mt-4 text-4xl font-bold text-gray-900">Overview</p>
          </div>

          {/* Registered Talents */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-lg font-medium text-gray-600">Registered Talents</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">2,000</p>
          </div>

          {/* Casting Calls */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-lg font-medium text-gray-600">Casting Calls</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">120</p>
          </div>

          {/* Approved Talents */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-lg font-medium text-gray-600">Approved Talents</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">1,120</p>
          </div>

          {/* Pending Approval */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-lg font-medium text-gray-600">Pending Approval</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">100</p>
          </div>
        </div>

        {/* Second Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
          {/* Total Applications */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-base font-medium text-gray-600">Total Applications</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">1,10,200</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-base font-medium text-gray-600">Total Applications</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">1,10,200</p>
          </div>

          {/* Open Casting Calls */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-base font-medium text-gray-600">Open Casting Calls</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">1,020</p>
          </div>

          {/* No Of Roles */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-base font-medium text-gray-600">No Of Roles</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">1,020</p>
          </div>

          {/* Application & Roles */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-base font-medium text-gray-600">Application & Roles</h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">10,10,220</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Statistics and Graphs</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bar Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-600 mb-4">Applications Over Time</h3>
              <Bar data={barData} />
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-600 mb-4">Application Status Distribution</h3>
              <Pie data={pieData} />
            </div>
          </div>

          {/* Additional Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Line Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-600 mb-4">Monthly Revenue</h3>
              <Line data={lineData} />
            </div>

            {/* Doughnut Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-600 mb-4">Roles Distribution</h3>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
