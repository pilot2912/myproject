const About = () => {
  return (
    <div>
      <h1>About This Project</h1>
      <p>
        This is a comprehensive React starter template built with modern technologies.
      </p>
      
      <h2>Features</h2>
      <ul style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>React 18 with TypeScript support</li>
        <li>Redux Toolkit for state management</li>
        <li>React Router v6 for routing</li>
        <li>Vite for fast development</li>
        <li>Modern CSS and responsive design</li>
        <li>Pre-configured ESLint and TypeScript</li>
      </ul>
      
      <h2>Project Structure</h2>
      <p style={{ textAlign: 'left', display: 'inline-block' }}>
        <code>
          src/
          <br/>
          ├── components/ - Reusable components
          <br/>
          ├── pages/ - Page components
          <br/>
          ├── store/ - Redux store and slices
          <br/>
          ├── App.tsx - Main app component
          <br/>
          └── main.tsx - Entry point
        </code>
      </p>
      
      <h2>Next Steps</h2>
      <p>Start building your application by:</p>
      <ol style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>Adding more pages to the pages/ directory</li>
        <li>Creating new Redux slices in store/</li>
        <li>Building reusable components in components/</li>
        <li>Styling with CSS modules or Tailwind CSS</li>
      </ol>
    </div>
  )
}

export default About
