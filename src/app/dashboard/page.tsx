export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 border-r border-gray-200">
        <div className="space-y-4">
          <div className="font-bold text-xl">Twitter Clone</div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="w-1/2 bg-white p-8">
        <div className="font-bold text-2xl mb-4">Home</div>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">What's happening?</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-bold">User Name</p>
            <p className="text-gray-600">This is a tweet-like post.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-bold">User Name</p>
            <p className="text-gray-600">This is another tweet-like post.</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 bg-white p-4 border-l border-gray-200">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-bold">Trends for you</p>
            <ul className="space-y-2">
              <li className="text-blue-500 hover:underline">#TrendingTopic1</li>
              <li className="text-blue-500 hover:underline">#TrendingTopic2</li>
              <li className="text-blue-500 hover:underline">#TrendingTopic3</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
