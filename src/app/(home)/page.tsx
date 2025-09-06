import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to the Home Page</h1>
        <p className='mb-2'>Please sign in to access your dashboard.</p>
        <SignInButton />
      </div>
    </div>
  )
}
