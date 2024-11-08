export const metadata = {
  title: 'Issue Tracker | Home Page',
}

const page = () => {
  const issues = [
    { id: 1, title: 'Bug in login form', description: 'User cannot log in with Google' },
    { id: 2, title: 'UI issue on mobile view', description: 'Elements overlap on smaller screens' },
    { id: 3, title: 'Performance lag on dashboard', description: 'Page takes too long to load' },
  ];

  return (
    <div className="h-screen flex flex-col items-center bg-gray-950 text-white p-6">
      <header className="w-full max-w-3xl mb-6 text-center">
        <h1 className="text-3xl font-semibold text-blue-600">Issue Tracker</h1>
        <p className="text-lg text-gray-400">Manage your issues and track progress</p>
      </header>

      <main className="flex flex-col items-center space-y-6 w-full max-w-3xl">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Create New Issue
        </button>

        <div className="w-full bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-medium text-gray-300">Issues List</h2>
          <ul className="mt-4 space-y-4">
            {issues.map((issue) => (
              <li key={issue.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-blue-500">{issue.title}</h3>
                <p className="text-gray-300">{issue.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="mt-auto text-center text-gray-500 text-sm">
        <p>Issue Tracker | All rights reserved</p>
      </footer>
    </div>
  );
}

export default page;
