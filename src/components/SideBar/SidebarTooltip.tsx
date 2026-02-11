interface SidebarTooltipProps {
  label: string;
}

export default function SidebarTooltip({ label }: SidebarTooltipProps) {
  return (
    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-[70px] z-50 pointer-events-none hidden lg:block xl:hidden">
      <div className="relative bg-blue-normal text-blue-light typo-p2-semibold px-4 py-2 rounded-[4px] shadow-normal whitespace-nowrap">
        {label}
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-normal rotate-45" />
      </div>
    </div>
  );
}
