"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { BookOpen, Bookmark, Brain, HomeIcon } from "lucide-react"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { APP_VERSION, IS_BETA } from "@/lib/constants"

import { AppSidebarAutomations } from "./app-sidebar-automations"
import { AppSidebarConversations } from "./app-sidebar-conversations"
import { AppSidebarUser } from "./app-sidebar-user"

const ExploreItems = [
  {
    title: "Home",
    url: "/home",
    segment: "home",
    icon: HomeIcon,
    external: false,
  },
  {
    title: "Docs",
    url: "https://whitepaper.ai.barkprotocol.net",
    segment: "docs",
    icon: BookOpen,
    external: true,
  },
  {
    title: "Memories",
    url: "/memories",
    segment: "memories",
    icon: Brain,
    external: false,
  },
  {
    title: "Saved Prompts",
    url: "/saved-prompts",
    segment: "saved-prompts",
    icon: Bookmark,
    external: false,
  },
] as const

export function AppSidebar() {
  const pathname = usePathname()

  const getIsActive = useMemo(
    () => (itemSegment: string) => {
      if (itemSegment === "home") {
        return pathname === "/home"
      }
      return pathname.startsWith(`/${itemSegment}`)
    },
    [pathname],
  )

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex" aria-label="Main navigation">
      <SidebarHeader>
        <img src="/logo.svg" alt="logo" className="h-6 w-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {ExploreItems.map((item) => (
            <SidebarMenuItem key={item.title} isActive={getIsActive(item.segment)}>
              <SidebarMenuButton>
                {item.external ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                  </a>
                ) : (
                  <Link href={item.url}>
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppSidebarAutomations />
            <AppSidebarConversations />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-xs text-muted-foreground">
              Version {APP_VERSION}
              {IS_BETA && " (Beta)"}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <AppSidebarUser />
    </Sidebar>
  )
}

