"use client"

import { useEffect } from "react"
import { usePage } from "@inertiajs/react" // Adjust based on your framework
import { toast } from "sonner"

export function FlashNotifications() {
  const { props } = usePage()
  const { errors, flash } = props as any

  useEffect(() => {
    // 1. Handle Validation Errors
    if (errors && Object.keys(errors).length > 0) {
      // Loop through errors or just show the first one
      Object.values(errors).forEach((error: any) => {
        toast.error(error, { duration: 3000 })
      })
    }

    // 2. Handle Success Messages
    if (flash?.success) {
      toast.success(flash.success, { duration: 3000 })
    }
    
    // 3. Handle General Info/Messages
    if (flash?.message) {
      toast(flash.message, { duration: 3000 })
    }
  }, [errors, flash])

  return null // This component doesn't render anything visually
}