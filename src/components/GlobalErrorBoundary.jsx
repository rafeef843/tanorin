import React from 'react';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                <pre className="bg-gray-100 p-4 rounded text-left text-sm overflow-auto max-w-full text-black">
                    {this.state.error && this.state.error.toString()}
                </pre>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded font-bold">
                    Reload Page
                </button>
            </div>
        )
    }

    return this.props.children; 
  }
}
export default GlobalErrorBoundary;
