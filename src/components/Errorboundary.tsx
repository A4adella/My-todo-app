import React from "react";
import { Alert , AlertTitle , AlertDescription} from "./ui/alert"
import { AlertTriangle } from "lucide-react";
import { Button} from "../components/ui/button"
import { Link, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

type ErrorBoundaryCoreProps ={
  children: React.ReactNode;
  location: Location;
}
type ErrorBoundaryCoreState = {
  hasError: boolean;
  error: Error | null;
};
class ErrorBoundaryCore extends React.Component<ErrorBoundaryCoreProps, ErrorBoundaryCoreState> {
  constructor(props:ErrorBoundaryCoreProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error:Error): ErrorBoundaryCoreState {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  handleReload= ()=> {
    //Optional: Reset state or reload the page
    window.location.reload();
  }

  componentDidCatch(error: Error, errorInfo:React.ErrorInfo) {
    // Log error to  console
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }
componentDidUpdate(prevProps: ErrorBoundaryCoreProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-muted px-4">
            <div className="w-full max-w-md space-y-6">
                <Alert variant="destructive" className="flex flex-col justify-between">
                    <div className="flex flex-row justify-center items-center gap-3 mb-5">
                        <AlertTriangle className="h-5 w-5 text-destructive"/>
                        <AlertTitle className="alert">Something went wrong </AlertTitle>
                    </div> 
                    <AlertDescription className="description">
                        {this.state.error?.message || "An unexpected error occurred."}
                    </AlertDescription>
                </Alert>

                <div className="space-x-3 flex justify-center ">
                    <Link to="/">
                    <Button  size="normal" variant="outline" className="hover:cursor-pointer bg ">
                        Back to Home
                    </Button>
                    </Link>

                    <Button size="normal" onClick={this.handleReload} variant="destructive" className="hover:cursor-pointer">
                        Reload Page
                    </Button>
                    </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return <ErrorBoundaryCore location={location}>{children}</ErrorBoundaryCore>;
}


