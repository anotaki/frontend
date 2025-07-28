import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/use-auth";
// import { Input } from "@/components/ui/input"

export function AdminHeader({
  isSideBarOpen,
  setIsSideBarOpen,
}: {
  isSideBarOpen: boolean;
  setIsSideBarOpen: any;
}) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div
        className="flex items-center gap-4 flex-1 mr-4 cursor-pointer md:hidden"
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      >
        <Menu />
      </div>

      <div className="flex items-center gap-4 justify-between w-full">
        <div>
          {user && (
            <>
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </>
          )}
        </div>

        <div>
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
      </div>
    </header>
  );
}
