import React from 'react'

const Model = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null; // Only render if open

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      {/* Model Content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Model Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Model Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Model
