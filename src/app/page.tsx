'use client'

import ErrorDemonstrator from '@/components/ErrorDemonstrator'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    console.log('👋 Hello World! Welcome to the Console Errors Demo')
    console.info('ℹ️ This app intentionally demonstrates various console errors')
    console.warn('⚠️ Warning: This is a demonstration - errors are intentional!')
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            👋 Hello World!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Console Errors Demonstration App
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            This application intentionally demonstrates various types of console errors, 
            warnings, and JavaScript issues for educational purposes. Open your browser's 
            developer tools to see the console output.
          </p>
        </div>

        {/* Console Status Indicator */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">Console Active</span>
            </div>
            <div className="text-sm text-gray-500">
              Press F12 to open Developer Tools
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>✅ Check the console for welcome messages and error demonstrations</p>
          </div>
        </div>

        {/* Error Demonstration Section */}
        <ErrorDemonstrator />

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <div className="text-gray-500 text-sm">
            <p>Built with Next.js, React, and Tailwind CSS</p>
            <p className="mt-2">🎯 Educational Console Errors Demo</p>
          </div>
        </footer>
      </div>
    </main>
  )
}