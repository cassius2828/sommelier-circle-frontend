import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-4 bg-theme-darkest text-gray-100 w-screen h-screen mt-52">
          <div className=" w-full text-center">
            <h1 className="text-4xl md:text-8xl">Something went wrong.</h1>
            <p className="text-xl md:text-2xl">
              We're sorry, but an unexpected error has occurred.
            </p>
            <br />
            <p className="text-xl md:text-2xl">
              Please try refreshing the page or visiting another path.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
