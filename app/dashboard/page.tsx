"use client";

import { Button } from "@/components/ui/button";
import { 
  LayoutGrid, 
  UserCircle, 
  BookOpen, 
  Info, 
  LogOut, 
  Search,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AccountPopup } from "@/components/AccountPopup";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const [email, setEmail] = useState("User");
  // const username = "User"; // This would come from authentication
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
    } else {
      const user = JSON.parse(storedUser);
      setEmail(user.username || "User"); // Adjust this according to your user object
    }
  }, []);

  // Get current time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const logout = () => {
    // Remove user session data from localStorage
    localStorage.removeItem('user');
  
    // Redirect to the login page
    window.location.href = '/login';
  };
  

  return (
    <div className="min-h-screen flex">
      {/* Account Popup */}
      <AccountPopup 
        isOpen={isAccountPopupOpen}
        onClose={() => setIsAccountPopupOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 fixed h-full transform transition-all duration-500 ease-in-out ${
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'
        } shadow-lg`}
      >
        <div className="h-full flex flex-col">
          {/* Logo in Sidebar */}
          <div className="px-6 py-2">
            <div className={`transition-all duration-500 ease-in-out ${
              isSidebarOpen ? 'w-32' : 'w-10'
            }`}>
              <Image
                src="/images/EG_Logo.png"
                alt="EG Logo"
                width={128}
                height={40}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="px-6 py-4 flex-1">
            <nav className="space-y-2">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 text-teal-600 font-medium p-2 rounded-lg bg-teal-50 group hover:scale-105 transform transition-all duration-300"
              >
                <LayoutGrid className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>Dashboard</span>
              </Link>
              <button 
                onClick={() => setIsAccountPopupOpen(true)}
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg group hover:scale-105 transform transition-all duration-300 w-full text-left"
              >
                <UserCircle className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>Account</span>
              </button>
              <Link 
                href="/how-it-works" 
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg group hover:scale-105 transform transition-all duration-300"
              >
                <BookOpen className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>How to use</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg group hover:scale-105 transform transition-all duration-300"
              >
                <Info className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>About</span>
              </Link>
              <button 
                onClick={() => {logout()}}
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg w-full text-left group hover:scale-105 transform transition-all duration-300"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>Logout</span>
              </button>
            </nav>
          </div>

          {/* Toggle Button */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-teal-50 text-gray-600 transition-all duration-300 hover:text-teal-600 group"
            >
              {isSidebarOpen ? (
                <>
                  <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className={`text-sm font-medium whitespace-nowrap transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                  }`}>Collapse</span>
                </>
              ) : (
                <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ease-in-out ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      } bg-gray-50`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            {/* Logo in Top Bar when sidebar is collapsed */}
            <div className={`transition-all duration-500 ease-in-out ${
              isSidebarOpen ? 'w-0 opacity-0' : 'w-32 opacity-100'
            }`}>
              <Image
                src="/images/EG_Logo.png"
                alt="EG Logo"
                width={128}
                height={40}
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
              />
            </div>
          </div>
          
          {/* User Profile */}
          <button
            onClick={() => setIsAccountPopupOpen(true)}
            className="flex items-center gap-2 p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{getGreeting()}, {email}!</h1>
            <p className="text-gray-600">How can we help you today?</p>
          </div>

          {/* Main Image */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/Dashboard_Baner.jpg"
                alt="Dashboard Banner"
                width={1920}
                height={400}
                className="w-full h-64 object-cover"
                priority
              />
            </div>
          </div>

          {/* Get Started Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-teal-100">
                <Upload className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold">Get Start Grading</h2>
            </div>
            
            <p className="text-gray-600 mb-8">
              Click add button to start grading. Drag and drop your assignment brief and your answers.
            </p>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-teal-500 transition-colors cursor-pointer">
              <div className="p-3 rounded-full bg-teal-100">
                <Plus className="h-6 w-6 text-teal-600" />
              </div>
              <p className="text-gray-600">Click to upload or drag and drop your files</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}