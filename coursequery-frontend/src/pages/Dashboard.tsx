import mySvg from '../assets/womanschedule.svg'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */} 
      <div className="w-88 bg-gray-50 border-r border-gray-200 flex flex-col p-8">
        <h1 className="text-lg font-medium flex items-center mb-4 border-t border-gray-200 py-4 gap-4 order-1">
          <span>Coursequery</span>
          <img src={mySvg} alt="SVG as an image" className="w-32 h-32 mr-6 ml-6"/>
        </h1>
        <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
          {/* Search Form */}
          <form
            className="relative w-full"
            role="search"
          >
            <input
              className="w-full pl-10 pr-3 py-2 bg-white border-none rounded-lg shadow-sm placeholder-gray-400"
              aria-label="Search schedules"
              placeholder="Search"
              type="search"
              name="q"
            />
            {/* Conditional rendering for spinner */}
            <div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
              aria-hidden
              hidden={true}
            />
          </form>
          <form method="post">
            <button className="text-purple-700 font-medium py-2 px-3 bg-white border-none rounded-lg shadow-sm hover:shadow-md active:translate-y-0.5 transition">
              New
            </button>
          </form>
        </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-auto pt-4">
          <ul className="list-none m-0 p-0">
            <li className="mb-1">
              <a
                href={`/schedules/1`}
                className="flex items-center justify-between whitespace-pre py-2 px-3 rounded-lg text-current no-underline gap-4 hover:bg-gray-200"
              >
                Schedule 1
              </a>
            </li>
            <li className="mb-1">
              <a
                href={`/schedules/2`}
                className="flex items-center justify-between whitespace-pre py-2 px-3 rounded-lg text-current no-underline gap-4 hover:bg-gray-200"
              >
                Schedule 2
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Detail */}
      <div className="flex-1 p-8">
        {/* Content goes here */}
      </div>
    </div>
  );
}