import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render/runtime errors anywhere below it in the tree and shows a
 * readable message instead of a blank white page. Without this, an error
 * thrown during module load or render (e.g. missing env vars) unmounts the
 * whole app silently.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          background: '#0f0a1f',
          color: '#f5f3ff',
        }}>
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Something went wrong loading the app
            </h1>
            <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
              {this.state.error.message}
            </p>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
              Check the browser console for details. If this mentions Supabase
              environment variables, make sure you have a <code>.env</code> file
              (see <code>.env.example</code>) with valid values, then restart
              the dev server.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
