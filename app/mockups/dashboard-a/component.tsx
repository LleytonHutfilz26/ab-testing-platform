"use client"

import { useState, useEffect } from "react"
import { BarChart3, Bell, Calendar, Home, LayoutDashboard, MessageSquare, Settings, Users, Search, FileText } from "lucide-react"

export default function DashboardA() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [activeTab, setActiveTab] = useState("analytics")
  const [showNotificationSettings, setShowNotificationSettings] = useState(false)
  const [reportCreated, setReportCreated] = useState(false)

  useEffect(() => {
    // Listen for messages from parent window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'START_TASK') {
        const { taskId } = event.data
        if (taskId === 'dashboard-find-analytics') {
          setActiveSection('analytics')
          setActiveTab('analytics')
        } else if (taskId === 'dashboard-create-report') {
          setActiveSection('dashboard')
          setActiveTab('reports')
        } else if (taskId === 'dashboard-change-settings') {
          setActiveSection('dashboard')
          setActiveTab('notifications')
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    // Set the corresponding tab based on the section
    if (section === 'analytics') {
      setActiveTab('analytics')
    } else if (section === 'dashboard') {
      setActiveTab('reports')
    } else if (section === 'customers') {
      setActiveTab('customers')
    } else if (section === 'schedule') {
      setActiveTab('schedule')
    } else if (section === 'messages') {
      setActiveTab('messages')
    }
    
    // Notify parent window of navigation
    window.parent.postMessage({
      type: 'NAVIGATION',
      section,
      variant: 'a'
    }, '*')

    // Check if this navigation completes a task
    if (section === 'analytics') {
      window.parent.postMessage({
        type: 'COMPLETE_TASK',
        taskId: 'dashboard-find-analytics',
        variant: 'a'
      }, '*')
    }
  }

  const handleCreateReport = () => {
    setReportCreated(true)
    window.parent.postMessage({
      type: 'COMPLETE_TASK',
      taskId: 'dashboard-create-report',
      variant: 'a'
    }, '*')
  }

  const handleShowSettings = () => {
    setShowNotificationSettings(true)
    window.parent.postMessage({
      type: 'COMPLETE_TASK',
      taskId: 'dashboard-change-settings',
      variant: 'a'
    }, '*')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 p-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => handleNavClick("dashboard")}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                activeSection === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick("analytics")}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                activeSection === "analytics" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </button>
            <button
              onClick={() => handleNavClick("customers")}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                activeSection === "customers" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Users className="h-5 w-5" />
              Customers
            </button>
            <button
              onClick={() => handleNavClick("schedule")}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                activeSection === "schedule" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Calendar className="h-5 w-5" />
              Schedule
            </button>
            <button
              onClick={() => handleNavClick("messages")}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                activeSection === "messages" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              Messages
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Analytics Dashboard */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Total Users</h3>
                  <p className="text-3xl font-bold">12,345</p>
                  <p className="text-green-400">+12% from last month</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Revenue</h3>
                  <p className="text-3xl font-bold">$45,678</p>
                  <p className="text-green-400">+8% from last month</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
                  <p className="text-3xl font-bold">1,234</p>
                  <p className="text-green-400">+5% from last month</p>
                </div>
              </div>
            </div>
          )}

          {/* Reports */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Reports</h2>
                <button
                  onClick={() => handleCreateReport()}
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create New Report
                </button>
              </div>
              {reportCreated && (
                <div className="bg-green-900/50 p-4 rounded-lg">
                  <p>Report created successfully! Last 30 days of data included.</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Monthly Performance</h3>
                  <p className="text-gray-400">Last updated: 2 hours ago</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">User Engagement</h3>
                  <p className="text-gray-400">Last updated: 1 day ago</p>
                </div>
              </div>
            </div>
          )}

          {/* Customers */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Customers</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Active Customers</h3>
                  <p className="text-3xl font-bold">1,234</p>
                  <p className="text-green-400">+15% from last month</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">New Signups</h3>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-green-400">+8% from last month</p>
                </div>
              </div>
            </div>
          )}

          {/* Schedule */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Schedule</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
                  <p className="text-gray-400">No upcoming events</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                  <p className="text-gray-400">No recent activity</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Messages</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Unread Messages</h3>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-gray-400">Last checked: 5 minutes ago</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Total Messages</h3>
                  <p className="text-3xl font-bold">24</p>
                  <p className="text-gray-400">In the last 7 days</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Notification Settings</h2>
                <button
                  onClick={() => handleShowSettings()}
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Settings
                </button>
              </div>
              {showNotificationSettings && (
                <div className="bg-gray-800 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-gray-400">Receive daily reports via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-gray-400">Get instant alerts for important updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

