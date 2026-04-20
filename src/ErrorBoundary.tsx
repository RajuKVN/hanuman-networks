import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // In production, wire this to an error reporting service
    console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0d0618',
              color: '#fff',
              textAlign: 'center',
              padding: '2rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div>
              <div style={{ fontSize: '3rem' }}>⚠️</div>
              <h1 style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
                Something went wrong
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Reload the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '9999px',
                  background: '#7c3aed',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Reload
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
