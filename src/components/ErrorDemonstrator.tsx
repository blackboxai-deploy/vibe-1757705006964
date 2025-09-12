'use client'

import { useState, useEffect } from 'react'
import RuntimeErrorDemo from './RuntimeErrorDemo'
import NetworkErrorDemo from './NetworkErrorDemo'
import StateErrorDemo from './StateErrorDemo'

const ErrorDemonstrator = () => {
  const [errorCounts, setErrorCounts] = useState({
    runtime: 0,
    network: 0,
    state: 0,
    warnings: 0
  })
  
  const [activeDemo, setActiveDemo] = useState<string>('overview')

  useEffect(() => {
    // Intentional console error on component mount
    console.error('🚨 ErrorDemonstrator mounted - This is an intentional error!')
    console.warn('⚠️ Warning: ErrorDemonstrator component loaded')
    
    // Intentional undefined reference warning
    const undefinedVar: any = undefined
    try {
      console.log(undefinedVar.someProperty)
    } catch (error) {
      console.error('🚨 Undefined reference error caught:', error)
    }

    setErrorCounts(prev => ({
      ...prev,
      runtime: prev.runtime + 1,
      warnings: prev.warnings + 1
    }))
  }, [])

  const triggerGeneralError = () => {
    console.error('🚨 Manual Error Triggered by User!')
    console.trace('📍 Stack trace for manual error')
    setErrorCounts(prev => ({ ...prev, runtime: prev.runtime + 1 }))
  }

  const triggerWarning = () => {
    console.warn('⚠️ Manual Warning Triggered!')
    console.info('ℹ️ This is an informational message')
    setErrorCounts(prev => ({ ...prev, warnings: prev.warnings + 1 }))
  }

  const triggerDeprecationWarning = () => {
    console.warn('⚠️ DEPRECATION WARNING: Using deprecated feature (simulated)')
    console.warn('⚠️ This feature will be removed in future versions')
    setErrorCounts(prev => ({ ...prev, warnings: prev.warnings + 2 }))
  }

  const errorCategories = [
    {
      id: 'runtime',
      title: 'Runtime Errors',
      description: 'JavaScript runtime exceptions and null references',
      color: 'bg-red-100 border-red-300 text-red-800',
      count: errorCounts.runtime,
      icon: '💥'
    },
    {
      id: 'network',
      title: 'Network Errors',
      description: 'Failed API calls, CORS issues, and timeouts',
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      count: errorCounts.network,
      icon: '🌐'
    },
    {
      id: 'state',
      title: 'State Errors',
      description: 'React state and hook misuse errors',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      count: errorCounts.state,
      icon: '🔄'
    },
    {
      id: 'warnings',
      title: 'Warnings',
      description: 'Console warnings and deprecation notices',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      count: errorCounts.warnings,
      icon: '⚠️'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Console Error Demonstrations
        </h2>

        {/* Error Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {errorCategories.map((category) => (
            <div key={category.id} className={`p-4 rounded-lg border-2 ${category.color}`}>
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-lg">{category.title}</h3>
              <p className="text-sm opacity-80 mb-2">{category.description}</p>
              <div className="text-2xl font-bold">
                {category.count}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Error Triggers */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Error Triggers</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerGeneralError}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Trigger Error 🚨
            </button>
            <button
              onClick={triggerWarning}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Trigger Warning ⚠️
            </button>
            <button
              onClick={triggerDeprecationWarning}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Deprecation Warning 📢
            </button>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Choose Error Demo</h3>
          <div className="flex flex-wrap gap-2">
            {['overview', 'runtime', 'network', 'state'].map((demo) => (
              <button
                key={demo}
                onClick={() => setActiveDemo(demo)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeDemo === demo
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {demo.charAt(0).toUpperCase() + demo.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <div className="border-t pt-8">
          {activeDemo === 'overview' && (
            <div className="text-center py-8">
              <h3 className="text-2xl font-semibold mb-4">Welcome to Console Errors Demo</h3>
              <p className="text-gray-600 mb-4">
                Select a demo above to explore different types of console errors.
                Each demo will trigger specific error patterns for educational purposes.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Pro Tip:</strong> Open your browser's Developer Tools (F12) 
                  and navigate to the Console tab to see all error messages and stack traces.
                </p>
              </div>
            </div>
          )}
          
          {activeDemo === 'runtime' && (
            <RuntimeErrorDemo onErrorCount={(count) => 
              setErrorCounts(prev => ({ ...prev, runtime: prev.runtime + count }))
            } />
          )}
          
          {activeDemo === 'network' && (
            <NetworkErrorDemo onErrorCount={(count) => 
              setErrorCounts(prev => ({ ...prev, network: prev.network + count }))
            } />
          )}
          
          {activeDemo === 'state' && (
            <StateErrorDemo onErrorCount={(count) => 
              setErrorCounts(prev => ({ ...prev, state: prev.state + count }))
            } />
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorDemonstrator