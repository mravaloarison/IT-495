import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
	return (
		<div className="[--header-height:calc(theme(spacing.14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<div className="flex flex-1 flex-col gap-4 p-4">
							<div className="grid auto-rows-min gap-4 md:grid-cols-3">
								<div className="aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50" />
								<div className="aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50" />
								<div className="aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50" />
							</div>
							<div className="min-h-[100vh] flex-1 rounded-xl bg-neutral-100/50 md:min-h-min dark:bg-neutral-800/50" />
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
