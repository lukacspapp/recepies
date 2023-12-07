"use client"

import { cn } from "@/lib/utils"
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Loader2, Mail } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import path from "path"

const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type userAuthSchemaType = z.infer<typeof userAuthSchema>


export function UserAuthForm({ className } : { className?: string }) {

  const { register, handleSubmit, formState: { errors }, } = useForm<userAuthSchemaType>({
    resolver: zodResolver(userAuthSchema)
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const pathname = usePathname()

  async function logIn(formData: userAuthSchemaType) {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    router.push('/')
    setIsLoading(false)
  }

  async function signUpWithEmail(formData: userAuthSchemaType) {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })
    if (!error) {
      logIn(formData)
    }
    setIsLoading(false)
  }

  async function onSubmit(data: userAuthSchemaType) {
    setIsLoading(true)
    pathname === '/login' ? logIn(data) : signUpWithEmail(data)
    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="text-lg"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email', { required: true })}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              className="text-lg"
              placeholder="*******"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password', { required: true })}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            name="submit"
            type="submit"
            disabled={isLoading}
            className="hover:bg-primary/80 mt-2"
          >
            {isLoading ? (
              <Loader2
                size={15}
                className='animate-spin mr-2'
              />
            ) : (
              <Mail className="w-5 h-5 mr-2" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <Button
        onClick={() => signInWithProvider('github')}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2
            size={15}
            className='animate-spin mr-2'
          />
        ) : (
          <GithubIcon className="w-5 h-5 mr-2" />
        )}{" "}
        Github
      </Button>
      <Button
        onClick={() => signInWithProvider('google')}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2
            size={15}
            className='animate-spin mr-2'
          />
        ) : (
          <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9c0 .66.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49Z" />
          </svg>
        )}{" "}
        Google
      </Button> */}
    </div>
  )
}