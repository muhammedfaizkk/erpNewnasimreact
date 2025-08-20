import React from 'react'

function SiteCardSkeleton() {
    return (
        <div>
            <div className="none sm:block animate-pulse p-4 border rounded-lg bg-white shadow-sm">
                <div className="h-6 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>

            <div className="block sm:none animate-pulse">
                <div className="h-10 bg-gray-200 rounded mb-3"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded mb-2"></div>
                ))}
            </div>
        </div>
    )
}

export default SiteCardSkeleton
