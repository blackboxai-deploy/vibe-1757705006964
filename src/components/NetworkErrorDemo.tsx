'use client'

import { useState } from 'react'

interface NetworkErrorDemoProps {
  onErrorCount: (count: number) => void
}

const NetworkErrorDemo = ({ onErrorCount }: NetworkErrorDemoProps) => {
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, string>>({})

  const trigger404Error = async () => {
    setLoading('404')
    console.error('🌐 Triggering 404 Not Found Error')
    
    try {
      const response = await fetch('/api/nonexistent-endpoint')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('🚨 404 Network Error:', error)
      setResults(prev => ({ ...prev, '404': `Error: ${error}` }))
      onErrorCount(1)
    } finally {
      setLoading(null)
    }
  }

  const triggerCORSError = async () => {
    setLoading('cors')
    console.error('🌐 Triggering CORS Error')
    
    try {
      const response = await fetch('https://httpbin.org/status/403', {
        mode: 'cors'
      })
      if (!response.ok) {
        throw new Error(`CORS Error: ${response.status}`)
      }
    } catch (error) {
      console.error('🚨 CORS Network Error:', error)
      setResults(prev => ({ ...prev, cors: `CORS Error: ${error}` }))
      onErrorCount(1)
    } finally {
      setLoading(null)
    }
  }

  const triggerTimeoutError = async () => {
    setLoading('timeout')
    console.error('🌐 Triggering Timeout Error')
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 1000)
      
      const response = await fetch('https://httpbin.org/delay/5', {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      console.log(response)
    } catch (error) {
      console.error('🚨 Timeout Network Error:', error)
      setResults(prev => ({ ...prev, timeout: `Timeout Error: ${error}` }))
      onErrorCount(1)
    } finally {
      setLoading(null)
    }
  }

  const triggerJSONParseError = async () => {
    setLoading('json')
    console.error('🌐 Triggering JSON Parse Error')
    
    try {
      const response = await fetch('https://httpbin.org/html')
      const data = await response.json() // This will fail since it returns HTML
      console.log(data)
    } catch (error) {
      console.error('🚨 JSON Parse Error:', error)
      setResults(prev => ({ ...prev, json: `JSON Parse Error: ${error}` }))
      onErrorCount(1)
    } finally {
      setLoading(null)
    }
  }

  const triggerNetworkError = async () => {
    setLoading('network')
    console.error('🌐 Triggering Network Connection Error')
    
    try {
      const response = await fetch('https://nonexistent-domain-12345.com/api/test')
      console.log(response)
    } catch (error) {
      console.error('🚨 Network Connection Error:', error)
      setResults(prev => ({ ...prev, network: `Network Error: ${error}` }))
      onErrorCount(1)
    } finally {
      setLoading(null)
    }
  }

  const triggerServerError = async () => {
    setLoading('server')
    console.error('🌐 Triggering Server Error (500)')
    
    try {
      const response = await fetch('https://httpbin.org/status/500')
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('🚨 Server Error:', error)
      setResults(prev => ({ ...prev, server: `Server Error: ${error}` }))
      onErrorCount(1)
    } finally {
      setLoading(null)
    }
  }

  const clearResults = () => {
    setResults({})
    console.clear()
    console.log('🧹 Network error results cleared')
  }

  const networkButtons = [
    {
      id: '404',
      label: '404 Not Found',
      description: 'Request to non-existent endpoint',
      action: trigger404Error,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'cors',
      label: 'CORS Error',
      description: 'Cross-origin request blocked',
      action: triggerCORSError,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'timeout',
      label: 'Request Timeout',
      description: 'Request takes too long',
      action: triggerTimeoutError,
      color: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      id: 'json',
      label: 'JSON Parse Error',
      description: 'Invalid JSON response',
      action: triggerJSONParseError,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'network',
      label: 'Network Error',
      description: 'DNS/Connection failure',
      action: triggerNetworkError,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      id: 'server',
      label: 'Server Error (500)',
      description: 'Internal server error',
      action: triggerServerError,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-orange-800">
          🌐 Network Error Demonstrations
        </h3>
        <p className="text-gray-600 mb-4">
          These buttons will trigger various network-related errors including HTTP status errors,
          CORS issues, timeouts, and connection failures.
        </p>
      </div>

      {/* Network Error Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {networkButtons.map((button) => (
          <div key={button.id} className="bg-gray-50 border rounded-lg p-4">
            <button
              onClick={button.action}
              disabled={loading === button.id}
              className={`${button.color} text-white px-4 py-2 rounded-lg w-full mb-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading === button.id ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </span>
              ) : (
                button.label
              )}
            </button>
            <p className="text-sm text-gray-600">{button.description}</p>
            
            {/* Show result if available */}
            {results[button.id] && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                {results[button.id]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={clearResults}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Clear Results
        </button>
      </div>

      {/* Network Error Information */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 mb-2">About Network Errors</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• <strong>404 Not Found:</strong> The requested resource doesn't exist</li>
          <li>• <strong>CORS Error:</strong> Cross-Origin Resource Sharing policy violation</li>
          <li>• <strong>Timeout Error:</strong> Request takes longer than allowed time</li>
          <li>• <strong>JSON Parse:</strong> Response is not valid JSON format</li>
          <li>• <strong>Network Error:</strong> DNS resolution or connection failures</li>
          <li>• <strong>Server Error:</strong> Internal server error (5xx status codes)</li>
        </ul>
        <p className="text-sm text-orange-600 mt-3">
          💡 Note: Some external APIs may be blocked by browser security policies.
        </p>
      </div>
    </div>
  )
}

export default NetworkErrorDemo