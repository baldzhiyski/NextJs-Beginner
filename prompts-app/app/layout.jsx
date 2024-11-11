import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

// Metadata for the application, which sets the title and description of the page
export const metadata = {
  title: "Promtopia",
  description: "Discover and Share AI Prompts",
};

// RootLayout wraps the entire app, providing consistent structure and styling
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* Provider component wraps the app, enabling session management throughout */}
        <Provider> 
          {/* Main container with a gradient background */}
          <div className="main">
            <div className="gradient"></div>
          </div>

          {/* Main application area where navigation and content are rendered */}
          <main className="app">
            <Nav /> {/* Navigation bar */}
            {children} {/* Renders page content */}
          </main>

        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
