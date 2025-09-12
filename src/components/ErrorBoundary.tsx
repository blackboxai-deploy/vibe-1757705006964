'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(error: Error): State {
    console.error('🚨 Error Boundary Caught Error:', error)
    return {
      hasError: true,
      error
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error Boundary - Component Stack:', errorInfo.componentStack)
    console.error('🚨 Error Boundary - Full Error:', error)
    
    this.setState({
      hasError: true,
      error,
      errorInfo
    })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <div className="text-red-600 text-6xl mb-4">💥</div>
            <h1 className="text-2xl font-bold text-red-800 mb-4">
              Oops! Something went wrong
            </h1>
            <div className="bg-red-100 border border-red-300 rounded p-4 mb-4">
              <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
              <p className="text-red-700 font-mono text-sm">
                {this.state.error?.toString()}
              </p>
            </div>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <p className="text-sm text-gray-600 mt-4">
              Check the console for more detailed error information.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary