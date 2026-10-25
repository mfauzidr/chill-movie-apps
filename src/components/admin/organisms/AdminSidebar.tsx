import SidebarNavItem from "../molecules/SidebarNavItem";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", disabled: true },
  { label: "Film & Series", active: true },
  { label: "Users", disabled: true },
  { label: "Subscriptions", disabled: true },
  { label: "Settings", disabled: true },
];

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => (
  <>
    {isOpen && (
      <button
        type="button"
        aria-label="Close navigation menu"
        className="fixed inset-x-0 bottom-0 top-14 z-20 bg-black/55 md:top-16 lg:hidden"
        onClick={onClose}
      />
    )}
    <aside
      id="admin-sidebar"
      aria-label="Admin navigation"
      className={`fixed bottom-0 left-0 top-14 z-30 w-70 overflow-y-auto border-r border-text-light/15 bg-header-background px-4 py-6 transition-transform md:top-16 lg:static lg:h-full lg:shrink-0 lg:translate-x-0 lg:pt-8 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-6 flex items-center justify-between px-4 lg:hidden">
        <span className="font-bold text-text-light">Admin menu</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2 py-1 text-sm text-greyscale-300 hover:bg-extra-background"
        >
          Close
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <SidebarNavItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  </>
);

export default AdminSidebar;
