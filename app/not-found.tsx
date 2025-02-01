import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center justify-center min-h-screen",
        "bg-background text-foreground",
        "transition-colors duration-300",
      )}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-4">Page not found</p>
        <a href="/" className="text-primary underline">
          Go back home
        </a>
      </div>
    </motion.div>
  )
}

