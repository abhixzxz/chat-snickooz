import Image from "next/image"
import Link from "next/link"
import { RegisterForm } from "../components/register-form"
import RegisterImage from '../../../public/assets/register.jpg'


export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your details to create your account</p>
          </div>
          <RegisterForm />
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* right side - Image */}
      <div className="hidden bg-muted md:block md:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src={RegisterImage}
            alt="Registration background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
