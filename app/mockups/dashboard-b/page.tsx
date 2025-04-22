"use client"

import { useState } from "react"
import { BarChart3, Bell, LayoutDashboard, Plus, Search, Users } from "lucide-react"

export default function DashboardB() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleNavClick = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center mr-2">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">DataViz</span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => handleNavClick("dashboard")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === "dashboard" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick("analytics")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === "analytics" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => handleNavClick("reports")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === "reports" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => handleNavClick("settings")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === "settings" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Settings
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="ml-4 flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeSection === "dashboard" && "Dashboard"}
            {activeSection === "analytics" && "Analytics"}
            {activeSection === "reports" && "Reports"}
            {activeSection === "settings" && "Settings"}
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            {activeSection === "dashboard" && "New Report"}
            {activeSection === "analytics" && "New Analysis"}
            {activeSection === "reports" && "New Report"}
            {activeSection === "settings" && "New Profile"}
          </button>
        </div>

        {activeSection === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">$24,345</p>
                <p className="text-sm text-green-500 mt-1">+12% from last month</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">1,893</p>
                <p className="text-sm text-green-500 mt-1">+5% from last week</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">3.6%</p>
                <p className="text-sm text-red-500 mt-1">-2% from last week</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-medium mb-4 text-gray-900">Performance Overview</h3>
                <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
                  <p className="text-gray-400">Chart would appear here</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-medium mb-4 text-gray-900">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">New user registered</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Sales report generated</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">New notification</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === "analytics" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Analytics Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-4 text-gray-900">Traffic by Source</h3>
                <div className="h-64 flex items-center justify-center border border-gray-100 rounded">
                  <p className="text-gray-400">Traffic source chart would appear here</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-4 text-gray-900">User Engagement</h3>
                <div className="h-64 flex items-center justify-center border border-gray-100 rounded">
                  <p className="text-gray-400">Engagement chart would appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "reports" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Reports</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Monthly Performance Report</h3>
                  <p className="text-sm text-gray-500">Last updated: Today</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Download</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Quarterly Sales Report</h3>
                  <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Download</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Annual Revenue Analysis</h3>
                  <p className="text-sm text-gray-500">Last updated: 1 week ago</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Download</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "settings" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-500">Control who can see your profile</p>
                    </div>
                    <div className="h-6 w-12 bg-blue-600 rounded-full relative">
                      <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email updates</p>
                    </div>
                    <div className="h-6 w-12 bg-gray-200 rounded-full relative">
                      <div className="h-5 w-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Security</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Change Password</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

