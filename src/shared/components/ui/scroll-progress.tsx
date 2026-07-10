"use client"

import { motion, useScroll, type MotionProps } from "motion/react"
import { cn } from "../../lib/utils"

interface ScrollProgressProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    keyof MotionProps
  > {
  ref?: React.Ref<HTMLDivElement>
  target?: React.RefObject<HTMLElement | null>
}

export function ScrollProgress({
  className,
  ref,
  target,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start center", "end center"],
  })

  return (
    <motion.div
      ref={ref}
      className={cn(
        // origin-top hace que scaleY crezca de arriba hacia abajo
        "absolute bottom-0 left-1/2 top-0 z-10 w-1",
        "-translate-x-1/2 origin-top",
        "bg-linear-to-b from-[#1366EB] via-[#25a4b3] to-[#1417d9]",
        className
      )}
      style={{
        scaleY: scrollYProgress,
      }}
      {...props}
    />
  )
}