import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
  /** Compact mode for panel-level boundaries */
  compact?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { compact = false, fallbackMessage } = this.props;

      if (compact) {
        return (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-foreground/50">
            <AlertTriangle size={20} className="text-red-400" />
            <p className="text-xs">{fallbackMessage || 'Something went wrong'}</p>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-1 rounded bg-surface-2 px-2 py-1 text-xs text-foreground/70 hover:bg-surface-3 transition"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        );
      }

      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-foreground/60">
          <AlertTriangle size={40} className="text-red-400" />
          <h2 className="text-lg font-semibold text-foreground/80">
            {fallbackMessage || 'An unexpected error occurred'}
          </h2>
          {this.state.error && (
            <pre className="max-w-lg overflow-auto rounded bg-surface-1 p-3 text-xs text-red-300">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm text-white hover:bg-accent-primary/80 transition"
          >
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
