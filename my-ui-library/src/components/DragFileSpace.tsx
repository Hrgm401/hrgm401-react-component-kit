/**
 * @file src/components/DragFileSpace.tsx
 * @description ファイルを選択またはドロップして画面から取り込むことが得きるコンポーネント
 */
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

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
          style={{
            width: "560px",
            height: "400px",
            border: "2px dashed #999",
            backgroundColor: isDragging ? "#eee" : "#f9f9f9",
            textAlign: "center",
            lineHeight: "400px",
            color: "#555",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          ファイルを選択 または ドロップ
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div className="bg-stone-100 rounded-md w-auto px-4 py-2 text-sm/6 font-medium text-gray-900">
          {fileName}
        </div>
      )}
    </>
  );
};
