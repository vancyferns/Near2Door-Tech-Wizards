<p><strong>Project: Near2Door E-commerce App</strong></p>
<p>This guide provides step-by-step instructions to set up and run the project's backend (Flask) and frontend (React Native with Expo).</p>

<hr>

<h2>1. Prerequisites</h2>
<p>All team members must have the following installed:</p>
<ul>
    <li><strong>Git</strong>: For cloning the repository.</li>
    <li><strong>Node.js</strong>: The latest LTS version is recommended.</li>
    <li><strong>Python 3</strong>: The backend is built with Python and Flask.</li>
    <li><strong>Expo Go App</strong>: Install this on your iOS or Android device from the App Store or Google Play Store.</li>
</ul>

<hr>

<h2>2. General Setup</h2>
<p>Follow these steps to get the project files ready:</p>
<ol>
    <li><strong>Clone the Repository</strong>: Open your terminal and run:
        <pre><code>git clone [repository_url]</code></pre>
    </li>
    <li><strong>Navigate into the Project</strong>: Change into the project's root directory:
        <pre><code>cd [repository_name]</code></pre>
    </li>
    <li><strong>Install Frontend Dependencies</strong>: Go to the <code>near2door</code> directory and install the packages.
        <pre><code>cd near2door
npm install</code></pre>
    </li>
    <li><strong>Install Backend Dependencies</strong>: Go to the <code>backend</code> directory and install the Python packages.
        <pre><code>cd ../backend
pip install -r requirements.txt</code></pre>
    </li>
</ol>

<hr>

<h2>3. Running the Backend (Flask)</h2>
<p>The backend server must be running and accessible before the frontend can connect to it.</p>

<h3>On Replit or GitHub Codespaces</h3>
<ul>
    <li>Navigate to the <code>backend</code> directory.</li>
    <li>Run the server using the command specified in your <code>app.py</code> or <code>.replit</code> file, typically <code>python app.py</code> or <code>flask run</code>.</li>
    <li>The platform will provide a public URL. <strong>Copy this URL</strong>, as you will need it for the frontend.</li>
</ul>

<h3>On a Local Machine (VS Code)</h3>
<ul>
    <li>Navigate to the <code>backend</code> directory.</li>
    <li>Run the server with <code>python app.py</code> or <code>flask run</code>.</li>
    <li>The server will typically start at <code>http://127.0.0.1:5000</code> or <code>http://localhost:5000</code>.</li>
</ul>

<hr>

<h2>4. Running the Frontend (React Native with Expo)</h2>
<p>The frontend connects to the backend to get data. Ensure you have the backend URL ready.</p>

<h3>On Replit or GitHub Codespaces</h3>
<ol>
    <li>Navigate back to the <code>near2door</code> directory.</li>
    <li><strong>Update the Backend URL</strong>: Open <code>utils/api.js</code>.
        <ul>
            <li>Change <code>API_BASE_URL</code> to the public URL from your running backend.</li>
            <li>Example: <code>export const API_BASE_URL = 'https://[your-unique-id].replit.dev:5000';</code></li>
        </ul>
    </li>
    <li><strong>Start the Expo Server</strong>: Run the following command with the <code>--tunnel</code> flag to allow your phone to connect to the cloud environment.
        <pre><code>npx expo start --tunnel</code></pre>
    </li>
    <li>A QR code will appear in the terminal. Scan it with the Expo Go app on your phone to run the app.</li>
</ol>

<h3>On a Local Machine (VS Code)</h3>
<ol>
    <li>Navigate back to the <code>near2door</code> directory.</li>
    <li><strong>Update the Backend URL</strong>: Open <code>utils/api.js</code>.
        <ul>
            <li>If your backend is also running locally, set <code>API_BASE_URL</code> to <code>'http://localhost:5000'</code>.</li>
        </ul>
    </li>
    <li><strong>Start the Expo Server</strong>: Run <code>npx expo start --tunnel</code>.</li>
    <li>Scan the QR code with the Expo Go app. The <code>--tunnel</code> flag is required for your phone to connect to your computer's local server.</li>
</ol>

<hr>

<h2>5. Troubleshooting</h2>
<ul>
    <li><strong><code>Failed to fetch</code> Error</strong>: The frontend cannot reach the backend.
        <ul>
            <li><strong>Check the URL</strong>: Ensure <code>API_BASE_URL</code> in <code>utils/api.js</code> is correct and up-to-date. Replit URLs change if the server restarts.</li>
            <li><strong>Check the Backend</strong>: Make sure the backend server is actively running without any errors.</li>
        </ul>
    </li>
    <li><strong><code>Unable to resolve module</code> Error</strong>: This is a file path issue.
        <ul>
            <li>Verify that <code>import</code> statements are using the correct relative paths (e.g., <code>../../utils/api</code>).</li>
        </ul>
    </li>
    <li><strong>Project Structure</strong>: The expected file structure is:
        <pre><code>
- project_root/
  - backend/
  - near2door/
    - app/
    - utils/
    - etc.
        </code></pre>
    </li>
</ul>