import { cn } from "@shared/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-300 dark:bg-[#363b45] animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
