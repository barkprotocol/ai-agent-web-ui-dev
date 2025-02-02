import { useCallback, useEffect } from "react"
import type { Conversation } from "@prisma/client"
import { useConversationsStore } from "@/hooks/store/conversations"
import { renameConversation } from "@/server/actions/ai"
import { toast } from "sonner"

interface FetchConversationsError extends Error {
  status?: number
}

async function fetchConversations(userId: string): Promise<Conversation[]> {
  const response = await fetch(`/api/conversations?userId=${userId}`)
  if (!response.ok) {
    const error: FetchConversationsError = new Error("Failed to fetch conversations")
    error.status = response.status
    throw error
  }
  return response.json()
}

export function useConversations(userId?: string) {
  const {
    conversations,
    isLoading,
    activeId,
    setConversations,
    removeConversation,
    setActiveId,
    setLoading,
    markAsRead,
  } = useConversationsStore()

  const refreshConversations = useCallback(async () => {
    if (!userId) return
    try {
      setLoading(true)
      const data = await fetchConversations(userId)
      setConversations(data)
    } catch (error) {
      console.error("Failed to refresh conversations:", error)
      toast.error("Failed to refresh conversations. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [userId, setConversations, setLoading])

  useEffect(() => {
    if (!userId) return

    refreshConversations()

    return () => {
      // Cleanup if needed
    }
  }, [userId, refreshConversations])

  const deleteConversation = useCallback(
    async (id: string): Promise<void> => {
      try {
        const response = await fetch("/api/conversations", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })

        if (!response.ok) {
          throw new Error("Failed to delete conversation")
        }

        removeConversation(id)
        await refreshConversations()
        toast.success("Conversation deleted successfully")
      } catch (error) {
        console.error("Error deleting conversation:", error)
        toast.error("Failed to delete conversation. Please try again.")
        await refreshConversations()
        throw error
      }
    },
    [removeConversation, refreshConversations],
  )

  const handleRename = async (id: string, newTitle: string): Promise<void> => {
    try {
      await renameConversation({ id, title: newTitle })
      await refreshConversations()
      toast.success("Conversation renamed successfully")
    } catch (error) {
      console.error("Error renaming conversation:", error)
      toast.error("Failed to rename conversation. Please try again.")
      throw error
    }
  }

  return {
    conversations,
    isLoading,
    activeId,
    deleteConversation,
    setActiveId,
    refreshConversations,
    renameConversation: handleRename,
    markAsRead,
  }
}

