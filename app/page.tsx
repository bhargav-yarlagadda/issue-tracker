import Link from "next/link";

export const metadata = {
  title: 'Issue Tracker | Home Page',
}

const Page = () => {
  const issues = [
    { id: 1, title: 'Bug in login form', description: 'User cannot log in with Google' },
    { id: 2, title: 'UI issue on mobile view', description: 'Elements overlap on smaller screens' },
    { id: 3, title: 'Performance lag on dashboard', description: 'Page takes too long to load' },
  ];

  return (
    <div className="h-screen flex flex-col items-center bg-gray-950 text-white p-6">
      {/* Header */}
      <header className="w-full max-w-3xl mb-6 text-center space-y-2">
        <h1 className="text-4xl font-bold text-blue-600 drop-shadow-lg">Issue Tracker</h1>
        <p className="text-lg text-gray-400">Efficiently manage and track issues</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-3xl space-y-8">
        {/* Create New Issue Button */}
        <Link href={'/issues'} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          + Create New Issue
        </Link>

        {/* Issues List */}
        <section className="w-full bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-medium text-gray-300 border-b border-gray-700 pb-2 mb-4">Issues List</h2>
          <ul className="space-y-4">
            {issues.map((issue) => (
              <li key={issue.id} className="bg-gray-900 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold text-blue-500 mb-2">{issue.title}</h3>
                <p className="text-gray-300">{issue.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto text-center text-gray-500 text-sm pt-4">
        <p>&copy; {new Date().getFullYear()} Issue Tracker | All rights reserved</p>
      </footer>
    </div>
  );
}

export default Page;
