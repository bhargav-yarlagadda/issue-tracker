"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the Issue type based on your Prisma schema
interface Issue {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string; // Dates are typically returned as strings from APIs
  updatedAt: string;
}

const Loading = () => {
  return (
    <div className="w-screen h-screen absolute inset-0 bg-white bg-opacity-70 backdrop-blur-lg flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const Page = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<
    "status" | "createdAt" | "updatedAt"
  >("createdAt");

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/issues");
        const result = await response.json();
        if (response.ok) {
          setIssues(result.data);
        } else {
          setError("Failed to fetch issues.");
        }
      } catch (err) {
        setError("Error fetching issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value as "status" | "createdAt" | "updatedAt");
  };

  const sortedIssues = [...issues].sort((a, b) => {
    if (sortCriteria === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortCriteria === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortCriteria === "updatedAt") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return 0;
  });

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Issue Tracker</h1>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="text-gray-400 mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortChange}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="createdAt">Created At</option>
          <option value="updatedAt">Updated At</option>
          <option value="status">Status</option>
        </select>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : sortedIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedIssues.map((issue) => (
            <Link key={issue.id} href={`/issues/${issue.id}/`}>
              <div className="p-4 bg-gray-800 cursor-pointer rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <h2 className="text-xl font-semibold mb-2">{issue.title}</h2>
                <p className="text-gray-300">{issue.description}</p>
                <p className="text-gray-500 text-sm">Status: {issue.status}</p>
                <p className="text-gray-500 text-sm">
                  Created At: {new Date(issue.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Updated At: {new Date(issue.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center text-xl mt-10">
          No issues found
        </p>
      )}
    </div>
  );
};

export default Page;
