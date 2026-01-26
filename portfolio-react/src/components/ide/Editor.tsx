import type { File } from './IDELayout';

interface EditorProps {
  file: File;
}

export const Editor = ({ file }: EditorProps) => {
  return (
    <div className="h-full bg-[#1e1e1e] overflow-auto">
      {/* Line Numbers and Content */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="w-12 bg-[#1e1e1e] text-right pr-4 py-4 text-[#858585] text-xs font-mono select-none border-r border-[#3e3e42]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1">
          {file.content ? (
            <div className="p-4">
              {file.content}
            </div>
          ) : (
            <div className="p-4 text-[#cccccc] font-mono text-sm">
              <div className="text-[#569cd6]">//</div>
              <div className="text-[#569cd6]">// Loading {file.name}...</div>
              <div className="text-[#569cd6]">//</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
