import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"

export function AdminHeader({
  isSideBarOpen,
  setIsSideBarOpen,
}: {
  isSideBarOpen: boolean;
  setIsSideBarOpen: any;
}) {
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div
          className="flex items-center gap-4 flex-1"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          <Menu className="cursor-pointer block md:hidden" />
        </div>

        <div className="flex items-center gap-4">
          {/* Search
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Buscar..." className="pl-10 w-64" />
        </div> */}

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>
    </>
  );
}
