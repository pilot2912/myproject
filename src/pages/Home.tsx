const Home = () => {
  return (
    <div>
      <h1>Welcome to My React Project!</h1>
      <p>This is a modern React application with TypeScript, Redux Toolkit, and React Router.</p>
      
      <div className="features">
        <div className="feature-card">
          <h3>⚡ React 18</h3>
          <p>Modern React with hooks and concurrent rendering</p>
        </div>
        <div className="feature-card">
          <h3>📦 Redux Toolkit</h3>
          <p>Simplified state management with Redux Toolkit</p>
        </div>
        <div className="feature-card">
          <h3>🛣️ React Router v6</h3>
          <p>Client-side routing with modern API</p>
        </div>
        <div className="feature-card">
          <h3>TypeScript</h3>
          <p>Full type safety for your application</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Vite</h3>
          <p>Lightning-fast development server</p>
        </div>
        <div className="feature-card">
          <h3>🎨 Modern CSS</h3>
          <p>Clean and responsive styling</p>
        </div>
      </div>
      
      <h2>Getting Started</h2>
      <p>Check out the Counter page to see Redux in action!</p>
    </div>
  )
}

export default Home
