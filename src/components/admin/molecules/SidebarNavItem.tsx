interface SidebarNavItemProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
}

const SidebarNavItem = ({
  label,
  active = false,
  disabled = false,
}: SidebarNavItemProps) => (
  <button
    type="button"
    disabled={disabled}
    aria-current={active ? "page" : undefined}
    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-bold transition-colors ${
      active
        ? "bg-primary text-text-light"
        : "text-greyscale-400"
    } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-default"}`}
  >
    <span>{label}</span>
    {disabled && (
      <span className="rounded-full bg-extra-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-greyscale-300">
        Soon
      </span>
    )}
  </button>
);

export default SidebarNavItem;
