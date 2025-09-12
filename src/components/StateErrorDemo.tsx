'use client'

import { useState, useEffect, useRef } from 'react'

interface StateErrorDemoProps {
  onErrorCount: (count: number) => void
}

const StateErrorDemo = ({ onErrorCount }: StateErrorDemoProps) => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<string[]>([])
  const [showComponent, setShowComponent] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Intentional missing dependency in useEffect
  useEffect(() => {
    console.warn('⚠️ useEffect with missing dependency - this will cause stale closure issues')
    console.log('Current count in effect:', count)
    // Missing 'count' in dependency array - this is intentional for demo
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const triggerStateUpdateError = () => {
    console.error('🚨 Triggering State Update Error')
    try {
      // Attempt to mutate state directly (anti-pattern)
      const currentItems = items
      currentItems.push(`Item ${Date.now()}`) // This mutates the original array
      setItems(currentItems) // React may not detect this change
      
      console.warn('⚠️ Direct state mutation detected - this may cause render issues')
      onErrorCount(1)
    } catch (error) {
      console.error('🚨 State Update Error:', error)
    }
  }

  const triggerAsyncStateError = async () => {
    console.error('🚨 Triggering Async State Update Error')
    
    // Simulate component unmount scenario
    setShowComponent(false)
    
    setTimeout(() => {
      try {
        // This will trigger a warning about updating state on unmounted component
        setCount(prev => prev + 1)
        console.warn('⚠️ Attempted to update state on unmounted component')
        onErrorCount(1)
      } catch (error) {
        console.error('🚨 Async State Error:', error)
      }
    }, 1000)
  }

  const triggerInfiniteRenderLoop = () => {
    console.error('🚨 WARNING: About to trigger infinite render loop!')
    console.warn('⚠️ This may freeze the browser temporarily')
    
    // Create a component that will cause infinite renders
    const InfiniteComponent = () => {
      const [value, setValue] = useState(0)
      
      // This will cause infinite renders
      setValue(Math.random())
      
      return <div>Value: {value}</div>
    }
    
    // We won't actually render this, just log the warning
    console.error('🚨 Infinite render loop pattern detected (prevented)')
    onErrorCount(1)
  }

  const triggerMemoryLeak = () => {
    console.error('🚨 Triggering Memory Leak Pattern')
    
    // Start an interval that won't be cleaned up properly
    intervalRef.current = setInterval(() => {
      console.log('Memory leak interval running...', Date.now())
      setCount(prev => prev + 1)
    }, 100)
    
    console.warn('⚠️ Memory leak created - interval not cleaned up on unmount')
    onErrorCount(1)
    
    // Clean it up after 3 seconds to prevent actual issues
    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        console.log('🧹 Memory leak cleaned up after demo')
      }
    }, 3000)
  }

  const triggerKeyWarning = () => {
    console.error('🚨 Triggering Missing Key Warning')
    
    // This demonstrates missing key props in lists
    console.warn('⚠️ List items rendered without proper key props')
    console.warn('⚠️ Each child in a list should have a unique "key" prop')
    
    setItems(['Generated item without key'])
    onErrorCount(1)
  }

  const triggerDeprecationWarning = () => {
    console.error('🚨 Triggering Deprecation Warning')
    console.warn('⚠️ DEPRECATED: Using deprecated React patterns')
    console.warn('⚠️ componentWillMount and componentWillReceiveProps are deprecated')
    console.warn('⚠️ String refs are deprecated, use callback refs instead')
    onErrorCount(3)
  }

  const fixStateIssues = () => {
    console.log('✅ Applying state fixes...')
    
    // Properly update state with new array
    setItems(['Fixed Item 1', 'Fixed Item 2', 'Fixed Item 3'])
    
    // Clear any intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    console.log('✅ State issues resolved')
  }

  const stateButtons = [
    {
      label: 'State Mutation Error',
      description: 'Direct state mutation (anti-pattern)',
      action: triggerStateUpdateError,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'Async State Error',
      description: 'Update state after unmount',
      action: triggerAsyncStateError,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      label: 'Infinite Loop Warning',
      description: 'Infinite render pattern',
      action: triggerInfiniteRenderLoop,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      label: 'Memory Leak',
      description: 'Uncleaned intervals/listeners',
      action: triggerMemoryLeak,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      label: 'Missing Keys Warning',
      description: 'List items without key props',
      action: triggerKeyWarning,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      label: 'Deprecation Warnings',
      description: 'Deprecated React patterns',
      action: triggerDeprecationWarning,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-purple-800">
          🔄 React State Error Demonstrations
        </h3>
        <p className="text-gray-600 mb-4">
          These demonstrations show common React state management errors, hook misuse,
          and performance anti-patterns.
        </p>
      </div>

      {/* State Info Display */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h4 className="font-semibold mb-2">Current State:</h4>
        <div className="text-sm space-y-1">
          <p>Count: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{count}</span></p>
          <p>Items: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{items.length} items</span></p>
          <p>Component Shown: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{showComponent.toString()}</span></p>
        </div>
      </div>

      {/* State Error Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stateButtons.map((button, index) => (
          <div key={index} className="bg-gray-50 border rounded-lg p-4">
            <button
              onClick={button.action}
              className={`${button.color} text-white px-4 py-2 rounded-lg w-full mb-2 transition-colors`}
            >
              {button.label}
            </button>
            <p className="text-sm text-gray-600">{button.description}</p>
          </div>
        ))}
      </div>

      {/* Fix Button */}
      <div className="mb-6">
        <button
          onClick={fixStateIssues}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          ✅ Fix State Issues
        </button>
      </div>

      {/* Current Items Display */}
      {items.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">Current Items:</h4>
          <ul className="text-sm text-blue-700">
            {items.map((item, index) => (
              <li key={`item-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* State Error Information */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">About State Errors</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• <strong>State Mutation:</strong> Directly modifying state objects/arrays</li>
          <li>• <strong>Async Updates:</strong> Updating state after component unmounts</li>
          <li>• <strong>Infinite Loops:</strong> setState in render causing endless re-renders</li>
          <li>• <strong>Memory Leaks:</strong> Not cleaning up intervals, listeners, or subscriptions</li>
          <li>• <strong>Missing Keys:</strong> List items without unique key props</li>
          <li>• <strong>Deprecation:</strong> Using outdated React lifecycle methods</li>
        </ul>
        <p className="text-sm text-purple-600 mt-3">
          💡 These patterns can cause performance issues, memory leaks, and unexpected behavior.
        </p>
      </div>
    </div>
  )
}

export default StateErrorDemo