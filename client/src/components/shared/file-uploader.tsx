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
      'application/pdf': ['.pdf', '.PDF', ".doc", ".docx", ".txt"],
    },
  });

  return (
    <div className="flex space-x-2 items-center w-full">
      <div
        {...getRootProps()}
        className="w-20 h-20 cursor-pointer rounded-full flex items-center justify-center"
      >
        <input className="cursor-pointer" {...getInputProps()} />
        {isDragActive && <Icons.user className="w-10 h-10 text-blue-800" />}
        {!isDragActive && (
          <img
            src={preview || '/images/placehold-avatar.jpg'}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
      </div>
      <div>
        <Button className='h-7' type="button" variant={'outline'} size={'sm'}>
          <Typography>Upload</Typography>
        </Button>
        <Typography className='text-slate-500'>
          {file.length > 0 ? file[0].name : 'No file selected'}
        </Typography>
      </div>
    </div>
  );
};

export default FileUploader;
