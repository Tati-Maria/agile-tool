/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Icons } from '../ui/icons';
import { Typography } from '.';
import { Button } from '../ui/button';

interface FileUploaderProps {
  mediaUrl?: string;
  fielChange: (file: File[]) => void;
}

const FileUploader = ({ mediaUrl, fielChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [preview, setPreview] = useState<string>(mediaUrl || '');

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fielChange(acceptedFiles);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
    [fielChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg', '.webp'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav'],
      'application/pdf': ['.pdf', '.PDF', '.doc', '.docx', '.txt'],
    },
  });

  return (
    <div className="flex space-x-2 items-center w-full">
      <div
        {...getRootProps()}
        className="w-20 h-20 cursor-pointer rounded-full flex items-center justify-center border-2 border-gray-200"
      >
        <input className="cursor-pointer" {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <Icons.user className="w-10 h-10 text-gray-400" />
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <Typography className="text-sm font-semibold">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag and drop file here'}
        </Typography>
        <Typography className="text-xs">
          {isDragActive
            ? 'Drop the file here ...'
            : 'Drag and drop file here or click to select files'}
        </Typography>
        <Typography className="text-xs">
          {file.length > 0 && `${file.length} files selected`}
        </Typography>
      </div>
    </div>
  );
};

export default FileUploader;
