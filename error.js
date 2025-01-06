"use client"
import Link from 'next/link'
const Error = ({error}) => {
    const statusCode = error?.statusCode || 404;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-xl font-semibold mb-2">Error {statusCode}!</div>
            <div className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                <Link href="/" className="text-white no-underline">
                    Please try again.
                </Link>
            </button>
        </div>
    )
}

export default Error;