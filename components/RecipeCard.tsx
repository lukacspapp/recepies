import Image from 'next/image'

type Props = {}

export default function RecipeCard({ }: Props) {
  return (
    <div className="space-y-2 md:space-y-4">
      <Image
        alt="Blog post image"
        className="mx-auto aspect-content overflow-hidden rounded-xl object-cover object-center w-full"
        height="200"
        src="/../../next.svg"
        width="300"
      />
      <h2 className="leading-tighter text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
        Blog Post Title
      </h2>
      <p className="max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
        Brief description of the blog post. This is just a summary to give readers an idea of what the post is
        about.
      </p>
      <div>Read More</div>
    </div>
  )
}