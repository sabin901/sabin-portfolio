import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Editor } from './Editor';
import { TabBar } from './TabBar';
import { Terminal } from './Terminal';
import { MenuBar } from './MenuBar';
import { QuickOpen } from './QuickOpen';
import { HomeFile } from '../files/HomeFile';
import { ResumeFile } from '../files/ResumeFile';
import { ProjectsFile } from '../files/ProjectsFile';
import { AboutFile } from '../files/AboutFile';
import { SkillsFile } from '../files/SkillsFile';
import { ContactFile } from '../files/ContactFile';

export interface File {
  id: string;
  name: string;
  type: 'tsx' | 'json' | 'md' | 'ts';
  content: ReactNode;
  path: string;
}

interface IDELayoutProps {
  children?: ReactNode; // Reserved for future use
}

const fileComponents: Record<string, ReactNode> = {
  'home': <HomeFile />,
  'resume': <ResumeFile />,
  'projects': <ProjectsFile />,
  'about': <AboutFile />,
  'skills': <SkillsFile />,
  'contact': <ContactFile />,
};

export const IDELayout = ({ children: _children }: IDELayoutProps) => {
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [quickOpenVisible, setQuickOpenVisible] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+P or Ctrl+P for quick open
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setQuickOpenVisible(true);
      }
      // Escape to close quick open
      if (e.key === 'Escape' && quickOpenVisible) {
        setQuickOpenVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickOpenVisible]);

  const openFile = (file: File) => {
    const fileWithContent: File = {
      ...file,
      content: fileComponents[file.id] || null
    };

    if (!openFiles.find(f => f.id === file.id)) {
      setOpenFiles([...openFiles, fileWithContent]);
    }
    setActiveFileId(file.id);
  };

  const closeFile = (fileId: string) => {
    const newFiles = openFiles.filter(f => f.id !== fileId);
    setOpenFiles(newFiles);
    if (activeFileId === fileId) {
      setActiveFileId(newFiles.length > 0 ? newFiles[newFiles.length - 1].id : null);
    }
  };

  const activeFile = openFiles.find(f => f.id === activeFileId);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-[#cccccc] overflow-hidden">
      {/* Menu Bar */}
      <MenuBar 
        onToggleTerminal={() => setTerminalVisible(!terminalVisible)}
        terminalVisible={terminalVisible}
        onQuickOpen={() => setQuickOpenVisible(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenFile={openFile}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          {openFiles.length > 0 && (
            <TabBar
              files={openFiles}
              activeFileId={activeFileId}
              onSelectFile={setActiveFileId}
              onCloseFile={closeFile}
            />
          )}

          {/* Editor */}
          <div className="flex-1 overflow-hidden" style={{ height: terminalVisible ? `calc(100% - ${terminalHeight + 36}px)` : 'calc(100% - 0px)' }}>
            {activeFile ? (
              <Editor file={activeFile} />
            ) : (
              <div className="h-full flex items-center justify-center bg-[#1e1e1e]">
                <div className="text-center">
                  <div className="text-6xl mb-4">💻</div>
                  <h2 className="text-2xl font-bold text-[#cccccc] mb-2">Welcome to Sabin's Portfolio</h2>
                  <p className="text-[#858585] font-mono">Open a file from the sidebar to get started</p>
                  <p className="text-[#858585] font-mono mt-2">Or type <span className="text-green-400">help</span> in the terminal</p>
                </div>
              </div>
            )}
          </div>

          {/* Terminal */}
          {terminalVisible && (
            <Terminal
              height={terminalHeight}
              onHeightChange={setTerminalHeight}
              onOpenFile={openFile}
            />
          )}
        </div>
      </div>

      {/* Quick Open Modal */}
      {quickOpenVisible && (
        <QuickOpen
          files={openFiles}
          onSelectFile={openFile}
          onClose={() => setQuickOpenVisible(false)}
        />
      )}
    </div>
  );
};
