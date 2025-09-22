/**
 * @file src/components/DragFileSpace.tsx
 * @description ファイルを選択またはドロップして画面から取り込むことが得きるコンポーネント
 */
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { UploadCloud } from 'lucide-react';

type Props = {
  handleFileChange: (files: FileList) => void;
};
export const DragFileSpace = ({ handleFileChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFiles = (files: FileList) => {
    handleFileChange(files);
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };
  return (
    <>
      {fileName === "" ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full h-full border-4 rounded-lg border-dashed border-sky-300
            flex items-center justify-center
            text-gray-800 cursor-pointer
            transition-colors duration-300
            ${isDragging ? 'bg-sky-100' : 'bg-white'}
          `}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <UploadCloud size={64} strokeWidth={1.5} />
            ファイルを選択 または ドロップ
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      ) : (
        <div className="relative bg-sky-100 rounded-md w-auto px-4 py-2 text-sm/6 font-medium text-gray-900">
          {fileName}
          <button
            onClick={() => setFileName("")}
            className="absolute -top-3 -right-3 w-7 h-7 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold hover:bg-sky-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
