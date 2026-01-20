/**
 * @file src/components/DragFileSpace.tsx
 * @description ファイルを選択またはドロップして画面から取り込むことが得きるコンポーネント
 */
import { type ChangeEvent, type DragEvent, useRef, useState, useEffect } from "react";
import { ImageUp } from 'lucide-react';
import { ClosedButton } from './ClosedButton';

type Props = {
  handleFileChange: (files: FileList | null) => void;
};
export const DragFileSpace = ({ handleFileChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

    // 既存のプレビューがあれば先に解放
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);

      //画像かどうかチェック（png, jpeg, webp, gifなど）
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null); // 画像以外ならプレビューはしない
      }
    } else {
      // ファイルリストが空の場合 (リセットなど)
      setFileName("");
      setPreviewUrl(null);
    }
  };
  const handleReset = () => {
    setFileName('');
    if(previewUrl){
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if(fileInputRef.current){
      fileInputRef.current.value = '';
    }
    handleFileChange(null);
  };

  useEffect(() => {
    // コンポーネントがアンマウントされるときに URL を解放する
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="relative w-full h-full">
      {fileName === "" ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full h-full border-2 rounded-xl border-dashed border-sky-400
            flex items-center justify-center
            text-gray-800 cursor-pointer
            transition-colors duration-300 hover:bg-sky-100
            ${isDragging ? 'bg-sky-100' : 'bg-white'}
          `}
        >
          <div className="flex flex-col items-center gap-2 text-sky-400 text-xs">
            <ImageUp size={48} strokeWidth={1.3} className='text-gray-600' />
            ファイルを選択 / ドロップ
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      ) : previewUrl ? (
        <div className='w-full h-full'>
          <div className='w-full h-full rounded-md overflow-hidden '>
            <img src={previewUrl} alt={fileName} className='w-full h-full object-contain' />
          </div>
          <div className="absolute z-10 -top-3 -right-3">
            <ClosedButton handleClose={handleReset} />
          </div>
        </div>
        
      ) : (
        <div className="bg-sky-100 rounded-md w-auto px-4 py-2 text-sm/6 font-medium text-gray-900">
          {fileName}
          <div className="absolute z-10 -top-3 -right-3">
            <ClosedButton handleClose={handleReset} />
          </div>
        </div>
      )}
    </div>
  );
};

