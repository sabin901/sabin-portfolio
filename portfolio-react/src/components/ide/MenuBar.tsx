interface MenuBarProps {
  onToggleTerminal: () => void;
  terminalVisible: boolean;
  onQuickOpen?: () => void;
}

export const MenuBar = ({ onToggleTerminal, terminalVisible, onQuickOpen }: MenuBarProps) => {
  return (
    <div className="h-7 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-2 text-xs text-[#cccccc] select-none">
      <div className="flex items-center gap-4">
        <span 
          className="hover:bg-[#3e3e42] px-2 py-1 rounded cursor-pointer"
          onClick={onQuickOpen}
        >
          File
        </span>
        <span className="hover:bg-[#3e3e42] px-2 py-1 rounded cursor-pointer">Edit</span>
        <span className="hover:bg-[#3e3e42] px-2 py-1 rounded cursor-pointer">View</span>
        <span 
          className={`hover:bg-[#3e3e42] px-2 py-1 rounded cursor-pointer ${terminalVisible ? 'bg-[#3e3e42]' : ''}`}
          onClick={onToggleTerminal}
        >
          Terminal
        </span>
        <span className="hover:bg-[#3e3e42] px-2 py-1 rounded cursor-pointer">Help</span>
      </div>
      <div className="ml-auto flex items-center gap-2 text-[#858585]">
        <span className="font-mono">Sabin Raut - Portfolio</span>
      </div>
    </div>
  );
};
