"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { GithubIcon, Loader2, Mail } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Provider } from "@supabase/supabase-js"
import { usePathname, useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const pathName = usePathname()

  const isLogin = pathName === '/login'

  async function signInWithProvider(provider: Provider) {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    })
    if (error) {
      console.log(error)
    } else {
      router.push("/dashboard")
    }
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: 'lukacs.papp5@gmail.com',
    })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    signInWithEmail()
    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button
            disabled={isLoading}
            className="hover:bg-primary/80"
          >
            {isLoading ? (
              <Loader2
                size={15}
                className='animate-spin mr-2'
              />
            ) : (
              <Mail className="w-5 h-5 mr-2" />
            )}
            {isLogin ? 'Login' : 'Sign Up'} with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        onClick={()=> signInWithProvider('github')}
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
    </div>
  )
}