'use client'

import { useState } from 'react'

interface RuntimeErrorDemoProps {
  onErrorCount: (count: number) => void
}

const RuntimeErrorDemo = ({ onErrorCount }: RuntimeErrorDemoProps) => {
  const [crashComponent, setCrashComponent] = useState(false)

  const triggerNullReference = () => {
    console.error('🚨 Triggering Null Reference Error')
    try {
      const nullObj: any = null
      console.log(nullObj.someProperty.nestedProperty)
    } catch (error) {
      console.error('🚨 Null Reference Error:', error)
      onErrorCount(1)
    }
  }

  const triggerUndefinedFunction = () => {
    console.error('🚨 Triggering Undefined Function Error')
    try {
      const undefinedFunc: any = undefined
      undefinedFunc()
    } catch (error) {
      console.error('🚨 Undefined Function Error:', error)
      onErrorCount(1)
    }
  }

  const triggerTypeError = () => {
    console.error('🚨 Triggering Type Error')
    try {
      const numberValue: any = 42
      numberValue.push('invalid')
    } catch (error) {
      console.error('🚨 Type Error:', error)
      onErrorCount(1)
    }
  }

  const triggerReferenceError = () => {
    console.error('🚨 Triggering Reference Error')
    try {
      // @ts-ignore - Intentional error for demonstration
      console.log(nonExistentVariable)
    } catch (error) {
      console.error('🚨 Reference Error:', error)
      onErrorCount(1)
    }
  }

  const triggerRangeError = () => {
    console.error('🚨 Triggering Range Error')
    try {
      const arr = new Array(-1)
      console.log(arr)
    } catch (error) {
      console.error('🚨 Range Error:', error)
      onErrorCount(1)
    }
  }

  const triggerSyntaxErrorSimulation = () => {
    console.error('🚨 Simulating Syntax Error (via eval)')
    try {
      eval('const invalid syntax = true')
    } catch (error) {
      console.error('🚨 Syntax Error:', error)
      onErrorCount(1)
    }
  }

  const triggerComponentCrash = () => {
    console.error('🚨 Triggering Component Crash')
    setCrashComponent(true)
    onErrorCount(1)
  }

  // Intentional component that will crash
  const CrashingComponent = () => {
    if (crashComponent) {
      throw new Error('💥 Intentional Component Crash for Error Boundary Demo!')
    }
    return null
  }

  const errorButtons = [
    {
      label: 'Null Reference Error',
      description: 'Accessing property of null object',
      action: triggerNullReference,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      label: 'Undefined Function Error',
      description: 'Calling undefined function',
      action: triggerUndefinedFunction,
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      label: 'Type Error',
      description: 'Invalid method call on wrong type',
      action: triggerTypeError,
      color: 'bg-red-700 hover:bg-red-800'
    },
    {
      label: 'Reference Error',
      description: 'Accessing undefined variable',
      action: triggerReferenceError,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      label: 'Range Error',
      description: 'Invalid array size',
      action: triggerRangeError,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'Syntax Error (Eval)',
      description: 'Invalid JavaScript syntax',
      action: triggerSyntaxErrorSimulation,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ]

  return (
    <div>
      <CrashingComponent />
      
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-red-800">
          💥 Runtime Error Demonstrations
        </h3>
        <p className="text-gray-600 mb-4">
          These buttons will trigger various JavaScript runtime errors. 
          Each error is caught and logged to the console with detailed information.
        </p>
      </div>

      {/* Error Trigger Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {errorButtons.map((button, index) => (
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

      {/* Component Crash Demo */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-red-800 mb-3">
          Error Boundary Test
        </h4>
        <p className="text-red-700 mb-4">
          This button will crash the entire component, which should be caught by the Error Boundary.
        </p>
        <button
          onClick={triggerComponentCrash}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          💥 Crash Component
        </button>
        <p className="text-sm text-red-600 mt-2">
          ⚠️ Warning: This will crash the component and trigger the Error Boundary
        </p>
      </div>

      {/* Error Information */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">About Runtime Errors</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Null Reference:</strong> Occurs when accessing properties of null/undefined</li>
          <li>• <strong>Type Error:</strong> Using methods not available on the current data type</li>
          <li>• <strong>Reference Error:</strong> Accessing variables that don't exist</li>
          <li>• <strong>Range Error:</strong> Using values outside the valid range</li>
          <li>• <strong>Syntax Error:</strong> Invalid JavaScript code structure</li>
        </ul>
      </div>
    </div>
  )
}

export default RuntimeErrorDemo