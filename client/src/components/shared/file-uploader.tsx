/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Icons } from '../ui/icons';
import { Typography } from '.';

interface FileUploaderProps {
  mediaUrl: string;
  fielChange: (file: File[]) => void;
}

const FileUploader = ({ mediaUrl, fielChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [preview, setPreview] = useState<string>(mediaUrl);

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
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        {...getRootProps()}
        className="w-32 h-32 cursor-pointer rounded-full flex items-center justify-center"
      >
        <input className='cursor-pointer' {...getInputProps()} />
        {isDragActive && <Icons.user className="w-10 h-10 text-blue-800" />}
        {!isDragActive && (
          <img
            src={preview || '/images/placehold-avatar.jpg'}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
      </div>
      <Typography className="mt-2">Drag & drop your avatar here</Typography>
    </div>
  );
};

export default FileUploader;
