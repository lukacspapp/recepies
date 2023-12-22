'use client'

import { Transition } from "@headlessui/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { descriptionStyle, titleStyle } from "../styles/styles"
import { DescriptionType } from "../lib/types/types"


export default function AnimatedDescription({
  title,
  description,
  hideBreak = true
}: DescriptionType) {
  const transition = "transition-all duration-500"
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Transition className='mb-10' show={show}>
      <Transition.Child
        enter={clsx(transition)}
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
      >
        <h1 data-test-id="page-title" className={titleStyle}>{title}</h1>
      </Transition.Child>
      <Transition.Child
        enter={clsx(transition, "delay-[300ms]")}
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
      >
        <p data-test-id="page-description" className={descriptionStyle}>{description}</p>
      </Transition.Child>
      {!hideBreak && (
        <Transition.Child enter={clsx(transition)} enterFrom="scale-x-0" enterTo="scale-x-100">
          <hr />
        </Transition.Child>
      )}
    </Transition>
  )
}
