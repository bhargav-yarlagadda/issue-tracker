'use client'
import { useState } from 'react';

const page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true)
    const response = await fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Fixed typo
      },
      body: JSON.stringify({ title, description }),
    });
    setLoading(false)
    if (response.ok) {
      alert('Issue created successfully');
      setTitle('');
      setDescription('');
    } else {
      alert('Error creating issue');
    }
  };

  const Loading = () => {
    return (
      <div className="w-screen h-screen absolute inset-0 z-10 bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center">
        <div className="w-[300px] p-6 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
          <div className="text-lg font-semibold">Please Wait, We are updating your Issue</div>
          <div className="w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-[91.1vh] flex flex-col items-center bg-gray-950 w-full p-6 space-y-4">
      {loading && <Loading/>}
      <div className="w-[50%] space-y-7 bg-gray-700 p-5 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="max-w-3xl">
            <label htmlFor="title" className="block text-sm font-medium text-black">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter issue title"
            />
          </div>

          <div className="max-w-3xl">
            <label htmlFor="description" className="block text-sm font-medium text-black">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the issue"
            />
          </div>

          <div className="max-w-3xl">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-thin rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              New Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
