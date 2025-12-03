"use client";

import { useMemo } from "react";
import useFile from "@/hooks/useFile";
import { errorToast } from "@/utils/toastMessage";
import Spinner from "./loaders/spinner";
import Link from "next/link";

const DEFAULT_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE_MB = 2;

const MultiFileInput = ({
  label,
  value = [], // array of uploaded file objects
  onChange,
  onSuccess,
  onDelete,
  onError,
  onLoading,
  error,
  acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
  name = "multiFileUpload",
}) => {
  const { uploadFile, fileUploading, deleteFile } = useFile();
  const maxSizeInBytes = useMemo(() => MAX_FILE_SIZE_MB * 1024 * 1024, []);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(
      (file) =>
        file.size <= maxSizeInBytes && acceptedFileTypes.includes(file.type)
    );

    const invalidFiles = files.length - validFiles.length;
    if (invalidFiles > 0) {
      const message = `${invalidFiles} file(s) were skipped (invalid type or size > ${MAX_FILE_SIZE_MB}MB).`;
      errorToast(message);
      onError?.(message);
    }

    if (validFiles.length === 0) return;

    try {
      onLoading?.(true);
      const uploads = [];

      for (const file of validFiles) {
        const uploaded = await uploadFile(file);
        uploads.push(uploaded);
      }

      const newFiles = [...value, ...uploads];
      onChange?.(newFiles);
      onSuccess?.(uploads);
    } catch (err) {
      const message = "One or more files failed to upload.";
      errorToast(message);
      onError?.(message);
    } finally {
      onLoading?.(false);
    }
  };

  const handleDelete = async (indexToRemove) => {
    const fileToDelete = value[indexToRemove];
    if (!fileToDelete?.url) return;

    onDelete?.(fileToDelete);

    const newFiles = value.filter((_, index) => index !== indexToRemove);
    onChange?.(newFiles);

    await deleteFile(fileToDelete.url);
  };

  return (
    <div className="text-text-primary flex w-full flex-col gap-1 text-sm">
      {label && <label className="font-medium text-gray-700">{label}</label>}

      <div
        className={`flex h-[45px] items-center rounded-sm p-2 transition-all duration-300 ease-in-out outline-none ${
          error
            ? "border border-red-400 ring-2 ring-red-300 focus:ring-red-500"
            : "border border-gray-200 focus-within:ring-2 focus-within:ring-gray-200"
        }`}
      >
        {!fileUploading && value?.length < 1 && (
          <input
            type="file"
            name={name}
            multiple
            onChange={handleFileChange}
            className="file:bg-dark block w-full text-sm text-gray-400 file:mr-2 file:rounded-sm file:border-0 file:px-2 file:py-2 file:text-xs file:font-semibold file:text-white"
            accept={acceptedFileTypes.join(",")}
          />
        )}

        {fileUploading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Spinner color="#000" />
            Uploading...
          </div>
        )}

        {/* Uploaded files row */}
        <div className="flex flex-row items-center justify-center gap-2 overflow-x-auto">
          {value?.length > 0 &&
            value?.map((file, index) => (
              <div
                key={file.url || index}
                className="flex flex-shrink-0 gap-1 rounded-md bg-gray-800 px-3 py-1 text-[11px] text-white"
              >
                <Link
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {file.alt || `File ${index + 1}`}
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="ml-1 text-white"
                  aria-label="Remove File"
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default MultiFileInput;
