import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "../components/login-form"
import LoginImage from '../../../public/assets/login.jpg'


export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden bg-muted md:block md:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src={LoginImage}
            alt="Login background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
