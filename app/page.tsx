"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Copy, Pause, Play } from "lucide-react"
import dynamic from 'next/dynamic'

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Dynamically import mockup components with no SSR
const DashboardA = dynamic(() => import("@/app/mockups/dashboard-a/component"), { ssr: false })
const DashboardB = dynamic(() => import("@/app/mockups/dashboard-b/component"), { ssr: false })
const EcommerceC = dynamic(() => import("@/app/mockups/ecommerce-c/component"), { ssr: false })
const EcommerceD = dynamic(() => import("@/app/mockups/ecommerce-d/component"), { ssr: false })
const SocialE = dynamic(() => import("@/app/mockups/social-e/component"), { ssr: false })
const SocialF = dynamic(() => import("@/app/mockups/social-f/component"), { ssr: false })

// Mockup pairs configuration
const MOCKUP_PAIRS = [
  {
    id: "dashboard",
    name: "Dashboard Interface",
    variants: ["a", "b"],
    description: "Test different dashboard layouts and navigation patterns"
  },
  {
    id: "ecommerce",
    name: "E-commerce Interface",
    variants: ["c", "d"],
    description: "Compare different product listing and shopping cart experiences"
  },
  {
    id: "social",
    name: "Social Media Interface",
    variants: ["e", "f"],
    description: "Evaluate different social media feed layouts and interaction patterns"
  }
]

// Mockup components mapping
const MOCKUP_COMPONENTS = {
  a: DashboardA,
  b: DashboardB,
  c: EcommerceC,
  d: EcommerceD,
  e: SocialE,
  f: SocialF,
}

// Wrap the main component to handle hydration
const TestingInterface = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <TestingInterfaceContent />
}

// Move the original component content here
const TestingInterfaceContent = () => {
  // Test state
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPair, setSelectedPair] = useState<string | null>(null)
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: string[] }>({
    a: [], b: [], c: [], d: [], e: [], f: []
  })
  const [startTime, setStartTime] = useState<{ [key: string]: number | null }>({
    a: null, b: null, c: null, d: null, e: null, f: null
  })
  const [taskTimes, setTaskTimes] = useState<{ [key: string]: { [key: string]: number } }>({
    a: {}, b: {}, c: {}, d: {}, e: {}, f: {}
  })
  const [aestheticRating, setAestheticRating] = useState<{ [key: string]: number }>({})
  const [positiveFeedback, setPositiveFeedback] = useState<{ [key: string]: string }>({
    a: "", b: "", c: "", d: "", e: "", f: ""
  })
  const [improvementFeedback, setImprovementFeedback] = useState<{ [key: string]: string }>({
    a: "", b: "", c: "", d: "", e: "", f: ""
  })
  const [finalFeedback, setFinalFeedback] = useState("")
  const [preferredDesign, setPreferredDesign] = useState("")
  const [easierDesign, setEasierDesign] = useState("")
  const [professionalDesign, setProfessionalDesign] = useState("")
  const [dataCopied, setDataCopied] = useState(false)
  const [responseData, setResponseData] = useState("")

  // Timer state
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [pausedTime, setPausedTime] = useState(0)

  // Add a new state variable to track the active task ID for each variant
  const [activeTaskId, setActiveTaskId] = useState<{ [key: string]: string | null }>({
    a: null, b: null, c: null, d: null, e: null, f: null
  })

  const totalSteps = 7 // Increased number of steps for the new flow
  const progress = (currentStep / totalSteps) * 100

  // Initialize session timer when the test starts
  useEffect(() => {
    if (currentStep > 1 && sessionStartTime === null) {
      setSessionStartTime(Date.now())
    }
  }, [currentStep, sessionStartTime])

  // Update the timer every second
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (sessionStartTime && !isPaused) {
      intervalId = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - sessionStartTime - pausedTime) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [sessionStartTime, isPaused, pausedTime])

  // Handle pause/resume
  const togglePause = () => {
    if (isPaused) {
      // Resume - add the paused duration to the total pausedTime
      const pauseDuration = Date.now() - (sessionStartTime! + elapsedTime * 1000 + pausedTime)
      setPausedTime(pausedTime + pauseDuration)
    }
    setIsPaused(!isPaused)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const mockups = {
    a: {
      name: "Dashboard Design A",
      image: "/images/dashboard-a.png",
      description: "Minimalist dashboard with sidebar navigation and dark theme",
    },
    b: {
      name: "Dashboard Design B",
      image: "/images/dashboard-b.png",
      description: "Card-based dashboard with top navigation and light theme",
    },
  }

  const tasks = [
    {
      id: "dashboard-find-analytics",
      label: "Find the analytics dashboard",
      description: "Locate the section showing key performance metrics and statistics"
    },
    {
      id: "dashboard-create-report",
      label: "Create a new report",
      description: "Generate a custom report with the last 30 days of data"
    },
    {
      id: "dashboard-change-settings",
      label: "Change notification settings",
      description: "Update your email notification preferences for daily reports"
    },
    {
      id: "ecommerce-find-product",
      label: "Find a specific product",
      description: "Search for and locate the 'Premium Wireless Headphones' product"
    },
    {
      id: "ecommerce-add-to-cart",
      label: "Add item to cart",
      description: "Add the selected product to your shopping cart"
    },
    {
      id: "ecommerce-checkout",
      label: "Proceed to checkout",
      description: "Navigate to the checkout page with your items"
    },
    {
      id: "social-find-profile",
      label: "Find a user's profile",
      description: "Locate and view the profile of user '@techreviewer'"
    },
    {
      id: "social-create-post",
      label: "Create a new post",
      description: "Compose and publish a new post with an image"
    },
    {
      id: "social-find-messages",
      label: "Check direct messages",
      description: "Access your direct messages inbox"
    }
  ]

  // Function to get tasks for the current interface type
  const getCurrentTasks = () => {
    if (selectedPair === "ecommerce") {
      return tasks.filter(task => task.id.startsWith("ecommerce-"))
    } else if (selectedPair === "social") {
      return tasks.filter(task => task.id.startsWith("social-"))
    } else {
      return tasks.filter(task => task.id.startsWith("dashboard-"))
    }
  }

  // Update the startTask function to track the active task
  const startTask = (taskId: string, variant: string) => {
    const variantKey = variant.split('-').pop() || ''
    setStartTime({
      ...startTime,
      [variantKey]: Date.now(),
    })
    setActiveTaskId({
      ...activeTaskId,
      [variantKey]: taskId,
    })
  }

  // Update the completeTask function to clear the active task
  const completeTask = (taskId: string, variant: string) => {
    const variantKey = variant.split('-').pop() || ''
    const variantCompletedTasks = completedTasks[variantKey] || []
    
    if (!variantCompletedTasks.includes(taskId) && activeTaskId[variantKey] === taskId) {
      const newCompletedTasks = {
        ...completedTasks,
        [variantKey]: [...variantCompletedTasks, taskId],
      }
      setCompletedTasks(newCompletedTasks)
      
      if (startTime[variantKey]) {
        const timeElapsed = Math.floor((Date.now() - startTime[variantKey]!) / 1000)
        setTaskTimes({
          ...taskTimes,
          [variantKey]: {
            ...(taskTimes[variantKey] || {}),
            [taskId]: timeElapsed,
          },
        })
        setStartTime({
          ...startTime,
          [variantKey]: null,
        })
        setActiveTaskId({
          ...activeTaskId,
          [variantKey]: null,
        })
      }
    }
  }

  // Add a function to check if a task is active
  const isTaskActive = (taskId: string, variant: string) => {
    return activeTaskId[variant] === taskId
  }

  // Add a function to check if any task is active in a variant
  const isAnyTaskActive = (variant: string) => {
    return activeTaskId[variant] !== null
  }

  const handleAestheticRating = (rating: number, variant: string) => {
    setAestheticRating({ ...aestheticRating, [variant]: rating })
  }

  const handlePositiveFeedback = (text: string, variant: string) => {
    setPositiveFeedback({
      ...positiveFeedback,
      [variant]: text,
    })
  }

  const handleImprovementFeedback = (text: string, variant: string) => {
    setImprovementFeedback({
      ...improvementFeedback,
      [variant]: text,
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Function to compile all responses into a comma-separated string
  const compileResponses = () => {
    const taskTimesA = tasks.map((task) => `Task_${task.id}_A:${taskTimes.a?.[task.id] || "N/A"}`).join(",")
    const taskTimesB = tasks.map((task) => `Task_${task.id}_B:${taskTimes.b?.[task.id] || "N/A"}`).join(",")

    const avgTimeA = calculateAverageTime("a")
    const avgTimeB = calculateAverageTime("b")

    // Clean text fields to remove commas
    const cleanText = (text: string) => text.replace(/,/g, ";")

    const data = [
      `TestID:UI-DASH-2025`,
      `SessionTime:${formatTime(elapsedTime)}`,
      taskTimesA,
      taskTimesB,
      `AvgTimeA:${avgTimeA}`,
      `AvgTimeB:${avgTimeB}`,
      `RatingA:${aestheticRating.a || "N/A"}`,
      `RatingB:${aestheticRating.b || "N/A"}`,
      `PositiveFeedbackA:${cleanText(positiveFeedback.a || "")}`,
      `PositiveFeedbackB:${cleanText(positiveFeedback.b || "")}`,
      `ImprovementFeedbackA:${cleanText(improvementFeedback.a || "")}`,
      `ImprovementFeedbackB:${cleanText(improvementFeedback.b || "")}`,
      `PreferredDesign:${preferredDesign || "N/A"}`,
      `EasierDesign:${easierDesign || "N/A"}`,
      `ProfessionalDesign:${professionalDesign || "N/A"}`,
      `FinalFeedback:${cleanText(finalFeedback || "")}`,
    ].join(",")

    return data
  }

  const handleSubmit = () => {
    // Compile all responses into a comma-separated string
    const data = compileResponses()
    setResponseData(data)

    // In a real application, you would send the data to your backend here
    console.log("Submitting feedback:", {
      completedTasks,
      taskTimes,
      aestheticRating,
      positiveFeedback,
      improvementFeedback,
      finalFeedback,
      preferredDesign,
      easierDesign,
      professionalDesign,
    })

    // Move to the confirmation screen
    nextStep()
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(responseData)
      setDataCopied(true)
      setTimeout(() => setDataCopied(false), 3000) // Reset after 3 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const calculateAverageTime = (variant: string) => {
    if (!taskTimes[variant] || Object.keys(taskTimes[variant]).length === 0) {
      return "-"
    }

    const times = Object.values(taskTimes[variant])
    const average = times.reduce((a, b) => a + b, 0) / times.length
    return `${Math.round(average)}s`
  }

  // Check if all tasks are completed for a specific variant
  const areAllTasksCompleted = (variant: string) => {
    const currentTasks = getCurrentTasks()
    return currentTasks.every((task) => completedTasks[variant]?.includes(task.id))
  }

  // Add message handler for iframe communication
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'COMPLETE_TASK') {
        const { taskId, variant } = event.data
        completeTask(taskId, variant)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Update the iframe rendering to include task information
  const renderMockup = (variant: string) => {
    const currentTasks = getCurrentTasks()
    const activeTask = currentTasks.find(task => 
      activeTaskId[variant] === task.id
    )
    const MockupComponent = MOCKUP_COMPONENTS[variant as keyof typeof MOCKUP_COMPONENTS]

    return (
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-[600px]">
            <MockupComponent />
          </div>
        </div>
      </div>
    )
  }

  const renderMockupSelection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Select Interface Pair to Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCKUP_PAIRS.map((pair) => (
            <div
              key={pair.id}
              className={`p-6 border rounded-lg cursor-pointer transition-colors ${
                selectedPair === pair.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedPair(pair.id)}
            >
              <h3 className="text-lg font-semibold">{pair.name}</h3>
              <p className="text-gray-600 mt-2">{pair.description}</p>
              <div className="mt-4 flex space-x-2">
                {pair.variants.map((variant) => (
                  <span
                    key={variant}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    Version {variant.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {selectedPair && (
          <div className="mt-6">
            <Button
              onClick={() => {
                const pair = MOCKUP_PAIRS.find(p => p.id === selectedPair)
                if (pair) {
                  setCurrentStep(2)
                  // Initialize tasks for both variants
                  pair.variants.forEach(variant => {
                    startTask("task-1", variant)
                  })
                }
              }}
            >
              Start Testing {selectedPair.toUpperCase()} Pair
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              UI
            </div>
            <span className="font-semibold">UI Testing Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Test ID: UI-DASH-2025</div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              <span>Session: {formatTime(elapsedTime)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePause}
              className="flex items-center gap-1"
              disabled={currentStep === 1 || currentStep === totalSteps}
            >
              {isPaused ? (
                <>
                  <Play className="h-3 w-3" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3" />
                  <span>Pause</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="text-sm font-medium">
              {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Introduction */}
        {currentStep === 1 && renderMockupSelection()}

        {/* Step 2: Tasks for Design A */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Task Completion: Design {selectedPair === "ecommerce" ? "C" : selectedPair === "social" ? "E" : "A"}</h1>
              <p className="text-muted-foreground">
                Complete the following tasks using {selectedPair === "ecommerce" ? "E-commerce" : selectedPair === "social" ? "Social Media" : "Dashboard"} Design {selectedPair === "ecommerce" ? "C" : selectedPair === "social" ? "E" : "A"}. We'll measure how quickly and easily you can find
                what you need.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 text-sm font-medium">
                {selectedPair === "ecommerce" ? "E-commerce Design C" : selectedPair === "social" ? "Social Media Design E" : "Dashboard Design A"}
              </div>
              <div className="relative h-[500px] overflow-hidden">
                {renderMockup(selectedPair === "ecommerce" ? "ecommerce-c" : selectedPair === "social" ? "social-e" : "dashboard-a")}
              </div>
              <div className="p-3 text-sm text-muted-foreground">
                {selectedPair === "ecommerce" ? "Modern e-commerce interface with product carousel and quick add to cart" : selectedPair === "social" ? "Social media feed with stories and post creation" : "Minimalist dashboard with sidebar navigation and dark theme"}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Tasks to complete:</h2>
              <div className="space-y-3">
                {getCurrentTasks().map((task) => (
                  <div key={task.id} className="flex items-center justify-between border p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      {completedTasks[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"]?.includes(task.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2"></div>
                      )}
                      <div>
                        <span className="font-medium">{task.label}</span>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!completedTasks[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"]?.includes(task.id) && !isTaskActive(task.id, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a") && (
                        <Button size="sm" variant="outline" onClick={() => startTask(task.id, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}>
                          Start
                        </Button>
                      )}
                      {!completedTasks[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"]?.includes(task.id) && isTaskActive(task.id, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a") && (
                        <Button size="sm" onClick={() => completeTask(task.id, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}>
                          Complete
                        </Button>
                      )}
                      {completedTasks[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"]?.includes(task.id) && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {taskTimes[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"]?.[task.id]}s
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => prevStep()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => nextStep()} disabled={!areAllTasksCompleted(selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}>
                Next: Design {selectedPair === "ecommerce" ? "D" : selectedPair === "social" ? "F" : "B"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Tasks for Design B */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Task Completion: Design {selectedPair === "ecommerce" ? "D" : selectedPair === "social" ? "F" : "B"}</h1>
              <p className="text-muted-foreground">
                Now complete the same tasks using {selectedPair === "ecommerce" ? "E-commerce" : selectedPair === "social" ? "Social Media" : "Dashboard"} Design {selectedPair === "ecommerce" ? "D" : selectedPair === "social" ? "F" : "B"}. We'll compare how quickly and easily you can
                complete tasks in each design.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 text-sm font-medium">
                {selectedPair === "ecommerce" ? "E-commerce Design D" : selectedPair === "social" ? "Social Media Design F" : "Dashboard Design B"}
              </div>
              <div className="relative h-[500px] overflow-hidden">
                {renderMockup(selectedPair === "ecommerce" ? "ecommerce-d" : selectedPair === "social" ? "social-f" : "dashboard-b")}
              </div>
              <div className="p-3 text-sm text-muted-foreground">
                {selectedPair === "ecommerce" ? "Grid-based e-commerce layout with featured products and category filters" : selectedPair === "social" ? "Social media feed with trending topics and direct messaging" : "Card-based dashboard with top navigation and light theme"}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Tasks to complete:</h2>
              <div className="space-y-3">
                {getCurrentTasks().map((task) => (
                  <div key={task.id} className="flex items-center justify-between border p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      {completedTasks[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"]?.includes(task.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2"></div>
                      )}
                      <div>
                        <span className="font-medium">{task.label}</span>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!completedTasks[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"]?.includes(task.id) && !isTaskActive(task.id, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b") && (
                        <Button size="sm" variant="outline" onClick={() => startTask(task.id, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}>
                          Start
                        </Button>
                      )}
                      {!completedTasks[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"]?.includes(task.id) && isTaskActive(task.id, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b") && (
                        <Button size="sm" onClick={() => completeTask(task.id, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}>
                          Complete
                        </Button>
                      )}
                      {completedTasks[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"]?.includes(task.id) && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {taskTimes[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"]?.[task.id]}s
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => prevStep()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => nextStep()} disabled={!areAllTasksCompleted(selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}>
                Next: Evaluate Design {selectedPair === "ecommerce" ? "C" : selectedPair === "social" ? "E" : "A"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Aesthetic Evaluation for Design A */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Aesthetic Evaluation: Design {selectedPair === "ecommerce" ? "C" : selectedPair === "social" ? "E" : "A"}</h1>
              <p className="text-muted-foreground">
                Now, please rate the visual appeal of Design {selectedPair === "ecommerce" ? "C" : selectedPair === "social" ? "E" : "A"}. Consider factors like layout, color scheme, and overall
                look and feel.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 text-sm font-medium">
                {selectedPair === "ecommerce" ? "E-commerce Design C" : selectedPair === "social" ? "Social Media Design E" : "Dashboard Design A"}
              </div>
              <div className="relative h-[500px] overflow-hidden">
                {renderMockup(selectedPair === "ecommerce" ? "ecommerce-c" : selectedPair === "social" ? "social-e" : "dashboard-a")}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Rate this design:</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Visual Appeal</Label>
                  <div className="flex justify-between items-center">
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] === 1 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(1, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                    >
                      1
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] === 2 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(2, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                    >
                      2
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] === 3 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(3, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                    >
                      3
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] === 4 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(4, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                    >
                      4
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] === 5 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(5, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                    >
                      5
                    </Button>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-2">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What do you like about this design?</Label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Please share your thoughts..."
                    value={positiveFeedback[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] || ""}
                    onChange={(e) => handlePositiveFeedback(e.target.value, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <Label>What could be improved?</Label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Please share your suggestions..."
                    value={improvementFeedback[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] || ""}
                    onChange={(e) => handleImprovementFeedback(e.target.value, selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => prevStep()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => nextStep()} disabled={!aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"]}>
                Next: Evaluate Design {selectedPair === "ecommerce" ? "D" : selectedPair === "social" ? "F" : "B"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Aesthetic Evaluation for Design B */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Aesthetic Evaluation: Design {selectedPair === "ecommerce" ? "D" : selectedPair === "social" ? "F" : "B"}</h1>
              <p className="text-muted-foreground">
                Now, please rate the visual appeal of Design {selectedPair === "ecommerce" ? "D" : selectedPair === "social" ? "F" : "B"}. Consider factors like layout, color scheme, and overall
                look and feel.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 text-sm font-medium">
                {selectedPair === "ecommerce" ? "E-commerce Design D" : selectedPair === "social" ? "Social Media Design F" : "Dashboard Design B"}
              </div>
              <div className="relative h-[500px] overflow-hidden">
                {renderMockup(selectedPair === "ecommerce" ? "ecommerce-d" : selectedPair === "social" ? "social-f" : "dashboard-b")}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Rate this design:</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Visual Appeal</Label>
                  <div className="flex justify-between items-center">
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] === 1 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(1, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                    >
                      1
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] === 2 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(2, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                    >
                      2
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] === 3 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(3, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                    >
                      3
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] === 4 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(4, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                    >
                      4
                    </Button>
                    <Button
                      variant={aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] === 5 ? "default" : "outline"}
                      className="flex-1 max-w-[80px]"
                      onClick={() => handleAestheticRating(5, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                    >
                      5
                    </Button>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-2">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What do you like about this design?</Label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Please share your thoughts..."
                    value={positiveFeedback[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] || ""}
                    onChange={(e) => handlePositiveFeedback(e.target.value, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <Label>What could be improved?</Label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Please share your suggestions..."
                    value={improvementFeedback[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] || ""}
                    onChange={(e) => handleImprovementFeedback(e.target.value, selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => prevStep()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => nextStep()} disabled={!aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"]}>
                Next: Final Comparison
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Final Comparison */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Final Comparison</h1>
              <p className="text-muted-foreground">
                Now that you've tested both designs, please compare them and provide your final feedback.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-2 text-sm font-medium">
                  {selectedPair === "ecommerce" ? "E-commerce Design C" : selectedPair === "social" ? "Social Media Design E" : "Dashboard Design A"}
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  {renderMockup(selectedPair === "ecommerce" ? "ecommerce-c" : selectedPair === "social" ? "social-e" : "dashboard-a")}
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Your rating:</span>
                    <span className="font-medium">{aestheticRating[selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a"] || "-"}/5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Avg. task time:</span>
                    <span className="font-medium">{calculateAverageTime(selectedPair === "ecommerce" ? "c" : selectedPair === "social" ? "e" : "a")}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-2 text-sm font-medium">
                  {selectedPair === "ecommerce" ? "E-commerce Design D" : selectedPair === "social" ? "Social Media Design F" : "Dashboard Design B"}
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  {renderMockup(selectedPair === "ecommerce" ? "ecommerce-d" : selectedPair === "social" ? "social-f" : "dashboard-b")}
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Your rating:</span>
                    <span className="font-medium">{aestheticRating[selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b"] || "-"}/5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Avg. task time:</span>
                    <span className="font-medium">{calculateAverageTime(selectedPair === "ecommerce" ? "d" : selectedPair === "social" ? "f" : "b")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Final Comparison</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Which design do you prefer overall?</Label>
                  <RadioGroup value={preferredDesign} onValueChange={setPreferredDesign}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="a" id="design-a" />
                      <Label htmlFor="design-a">Design A</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="b" id="design-b" />
                      <Label htmlFor="design-b">Design B</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Which design was easier to use?</Label>
                  <RadioGroup value={easierDesign} onValueChange={setEasierDesign}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="a" id="ease-a" />
                      <Label htmlFor="ease-a">Design A</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="b" id="ease-b" />
                      <Label htmlFor="ease-b">Design B</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Which design looked more professional?</Label>
                  <RadioGroup value={professionalDesign} onValueChange={setProfessionalDesign}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="a" id="prof-a" />
                      <Label htmlFor="prof-a">Design A</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="b" id="prof-b" />
                      <Label htmlFor="prof-b">Design B</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Any additional comments or suggestions?</Label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Please share your final thoughts..."
                    value={finalFeedback}
                    onChange={(e) => setFinalFeedback(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => prevStep()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleSubmit}>
                Submit Feedback
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Thank You */}
        {currentStep === 7 && (
          <div className="max-w-md mx-auto text-center space-y-6 py-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Thank You!</h1>
              <p className="text-muted-foreground">
                Your feedback has been successfully submitted. Your input is valuable and will help us improve our user
                interface designs.
              </p>
            </div>

            <div className="bg-muted/40 p-4 rounded-lg space-y-2 text-left">
              <h2 className="font-medium">What happens next?</h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your responses will be analyzed along with other participants</li>
                <li>The design team will use this data to make improvements</li>
                <li>The winning design will be refined based on all feedback</li>
              </ul>
            </div>

            {/* Internal testing data section */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-medium text-left mb-2">Response Data</h3>
              <div className="bg-muted p-3 rounded-md text-xs text-left overflow-auto max-h-[150px] mb-3">
                <pre className="whitespace-pre-wrap break-all">{responseData}</pre>
              </div>

              <Button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Copy className="h-4 w-4" />
                Copy Response Data
              </Button>

              {dataCopied && (
                <Alert className="mt-2 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>Data copied to clipboard!</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Add button to test another pair */}
            <div className="mt-6">
              <Button
                onClick={() => {
                  // Reset all state
                  setCurrentStep(1)
                  setSelectedPair(null)
                  setCompletedTasks({ a: [], b: [], c: [], d: [], e: [], f: [] })
                  setStartTime({ a: null, b: null, c: null, d: null, e: null, f: null })
                  setTaskTimes({ a: {}, b: {}, c: {}, d: {}, e: {}, f: {} })
                  setAestheticRating({})
                  setPositiveFeedback({ a: "", b: "", c: "", d: "", e: "", f: "" })
                  setImprovementFeedback({ a: "", b: "", c: "", d: "", e: "", f: "" })
                  setFinalFeedback("")
                  setPreferredDesign("")
                  setEasierDesign("")
                  setProfessionalDesign("")
                  setDataCopied(false)
                  setResponseData("")
                  setActiveTaskId({ a: null, b: null, c: null, d: null, e: null, f: null })
                }}
                className="w-full"
              >
                Test Another Pair
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t p-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">© 2025 UI Testing Platform</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm">
              Terms of Use
            </Button>
            <Button variant="ghost" size="sm">
              Help
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TestingInterface

