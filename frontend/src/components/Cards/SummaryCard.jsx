import React from 'react'
import { LuTrash2 } from "react-icons/lu";
import { getIntials } from '../../utilis/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-lg transition cursor-pointer group relative"
      onClick={onSelect}
    >
      {/* Top colored header */}
      <div
        className="rounded-lg p-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 shadow-sm">
            <span className="text-lg font-semibold text-black">
                {getIntials(role)}
            </span>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h2 className="text-base font-semibold text-gray-900">
              {role}
            </h2>
            <p className="text-sm text-gray-700">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete button (appears on hover) */}
        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-600 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-200 absolute top-3 right-3"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2/>
        </button>
      </div>

      {/* Bottom section */}
      <div className="px-3 pb-4">
        {/* Tags */}
        <div className="flex items-center justify-start space-x-3 mt-4">
          <div className="text-xs font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
          </div>
          <div className="text-xs font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            {questions} Q&A
          </div>
          <div className="text-xs font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  )
}

export default SummaryCard
