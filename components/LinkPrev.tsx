'use client'

import * as Tooltip from "@radix-ui/react-tooltip"
import clsx from "clsx"
import { useEffect, useState } from "react"
import Shimmer from "./Shimmer"


interface ILinkPreview {
  name: string
  href: string
  preview?: string
  alt: string
  style?: "neutral" | "blue"
  showExternalIndicator?: boolean
}

const neutralHighlight = clsx(
  "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50",
  "after:bg-gray-700 after:hover:bg-gray-900 dark:after:bg-gray-200 dark:after:hover:bg-gray-50"
)
const blueHighlight = clsx(
  "text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400",
  "after:bg-blue-600 after:hover:bg-blue-700 dark:after:bg-blue-300 dark:after:hover:bg-blue-400"
)

export default function LinkPreview({
  name,
  href,
  alt,
  preview,
  style = "blue",
  showExternalIndicator = true,
}: ILinkPreview) {

  const [isLoading, setIsLoading] = useState(true)

  const imageSrc =
    preview || `/api/screenshot?url=light`
  useEffect(() => {
    return () => setIsLoading(true)
  }, [])

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <a
          className={clsx(
            style === "neutral" ? neutralHighlight : blueHighlight,
            "relative whitespace-nowrap after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:rounded-full hover:after:w-full",
            "after:ease after:transition-[width] after:duration-200 hover:after:ease-out"
          )}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {name}
          {showExternalIndicator && " ↗"}

          {/*   Preload image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt="" aria-hidden onLoad={() => setIsLoading(false)} className="hidden" />
        </a>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={16}
          className="h-40 w-64 animate-slide-in rounded-lg border bg-white p-2 border-divider radix-state-closed:animate-slide-out dark:bg-gray-900"
        >
          {isLoading && <Shimmer h={142} w={238} />}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            className={clsx("h-[142px] w-[238px] rounded-md object-cover", isLoading && "hidden")}
          />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}