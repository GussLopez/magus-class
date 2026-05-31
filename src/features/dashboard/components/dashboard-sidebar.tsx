import * as React from "react"

import { VersionSwitcher } from "@/src/features/dashboard/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/shared/components/ui/sidebar"
import Link from "next/link"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Inicio",
          url: "/dashboard",
        },
        {
          title: "Metricas",
          url: "/dashboard/metricas",
        },
      ],
    },
    {
      title: "Contenido",
      url: "#",
      items: [
        {
          title: "Resumenes",
          url: "/dashboard/resumenes",
        },
        {
          title: "Flashcards",
          url: "/dashboard/flashcards",
          isActive: true,
        },
        {
          title: "Archivos",
          url: "/dashboard/archivos",
        }
      ],
    },
    {
      title: "Social",
      url: "#",
      items: [
        {
          title: "Amigos",
          url: "/dashboard/amigos",
        }
      ],
    },
  ],
}

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
