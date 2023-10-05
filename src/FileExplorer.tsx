import React, { useState } from 'react';

export interface Node {
  type: "folder" | "file";
  name: string;
  data?: Node[];
  meta?: string;
}

interface ContextMenu {
  left: number;
  top: number;
}

const FileExplorer: React.FC<{ data: Node }> = ({ data }) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [selectedFile, setSelectedFile] = useState<Node | null>(null);

  const toggleFolder = (folderName: string) => {
    if (expandedFolders.includes(folderName)) {
      setExpandedFolders(expandedFolders.filter((name) => name !== folderName));
    } else {
      setExpandedFolders([...expandedFolders, folderName]);
    }
  };

  const handleContextMenu = (event: React.MouseEvent, file: Node) => {
    event.preventDefault();
    setSelectedFile(file);
    setContextMenu({
      left: event.pageX,
      top: event.pageY,
    });
  };

  const handleCopy = () => {
    if (selectedFile) {
      console.log(`Copying ${selectedFile.name}`);
    }
    setContextMenu(null);
  };

  const handleDelete = () => {
    if (selectedFile) {
      console.log(`Deleting ${selectedFile.name}`);
    }
    setContextMenu(null);
  };

  const handleRename = () => {
    if (selectedFile) {
      console.log(`Renaming ${selectedFile.name}`);
    }
    setContextMenu(null);
  };

  const renderNode = (node: Node) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders.includes(node.name);

    return (
      <div key={node.name}>
        <div className="node">
          <span
            className={`icon ${isFolder ? 'folder-icon' : 'file-icon'}`}
            onClick={() => isFolder && toggleFolder(node.name)}
            onContextMenu={(event) => !isFolder && handleContextMenu(event, node)}
          >
            {isFolder ? '📁' : '📄'}
          </span>
          <span className="name">{node.name}</span>
        </div>
        {isFolder && isExpanded && (
          <div className="child-nodes">
            {node.data?.map(renderNode)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="file-explorer container">
      {renderNode(data)}

      {contextMenu && (
        <ul
          className="context-menu"
          style={{ left: contextMenu.left, top: contextMenu.top }}
        >
          <li className="menu-item" onClick={handleCopy}>
            Copy
          </li>
          <li className="menu-item" onClick={handleDelete}>
            Delete
          </li>
          <li className="menu-item" onClick={handleRename}>
            Rename
          </li>
        </ul>
      )}
    </div>
  );
};

export default FileExplorer;
