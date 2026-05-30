import { AppSidebar } from "@/src/features/dashboard/components/dashboard-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/src/shared/components/ui/breadcrumb"
import { Separator } from "@/src/shared/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/src/shared/components/ui/sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Magus - Dashboard'
}

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-full"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Build Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
  )
}
