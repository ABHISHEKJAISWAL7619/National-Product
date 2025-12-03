"use client";

import { useMemo } from "react";
import useFile from "@/hooks/useFile";
import { errorToast } from "@/utils/toastMessage";
import Spinner from "./loaders/spinner";
import Link from "next/link";

const DEFAULT_ACCEPTED_TYPES = [
  "image/jpeg", // .jpg or .jpeg
  "image/png", // .png
  "image/webp", // .webp
  "image/gif", // .gif
];

const MAX_FILE_SIZE_MB = 2;

const SingleFileInput = ({
  label,
  value, // ⬅ controlled file data (object with `url`, `alt`, etc.)
  onChange, // ⬅ controlled state setter
  onSuccess,
  onDelete,
  onError,
  onLoading,
  error,
  acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
  name = "fileUpload",
}) => {
  const { uploadFile, fileUploading, deleteFile } = useFile();

  const maxSizeInBytes = useMemo(() => MAX_FILE_SIZE_MB * 1024 * 1024, []);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeInBytes) {
      const message = `File is too large (max ${MAX_FILE_SIZE_MB}MB).`;
      errorToast(message);
      onError?.(message);
      return;
    }

    if (!acceptedFileTypes.includes(file.type)) {
      const message = "Invalid file type.";
      errorToast(message);
      onError?.(message);
      return;
    }

    try {
      onLoading?.(true);
      const uploaded = await uploadFile(file);
      onChange?.(uploaded); // ✅ set from parent
      onSuccess?.(uploaded);
    } catch (err) {
      const message = "File upload failed. Please try again.";
      errorToast(message);
      onError?.(message);
    } finally {
      onLoading?.(false);
    }
  };

  const handleDelete = async () => {
    if (!value?.url) return;
    onChange?.(null); // ✅ clear from parent
    onDelete?.();
    await deleteFile(value.url);
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
        {fileUploading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Spinner color="#000" />
            Uploading...
          </div>
        ) : value?.url ? (
          <div className="flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1 text-[11px] text-white">
            <Link href={value.url} target="_blank" rel="noopener noreferrer">
              {value.alt || "View File"}
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="text-sm text-white"
              aria-label="Remove File"
            >
              &times;
            </button>
          </div>
        ) : (
          <input
            type="file"
            name={name}
            onChange={handleFile}
            className="file:bg-dark block w-full text-sm text-gray-400 file:mr-2 file:rounded-sm file:border-0 file:px-2 file:py-2 file:text-xs file:font-semibold file:text-white"
            accept={acceptedFileTypes.join(",")}
          />
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default SingleFileInput;
