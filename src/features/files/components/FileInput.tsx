"use client";

import { cn } from "@/src/shared/lib/utils";
import { UploadCloud } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import UploadIllustration from "./UploadIlustration";
import UploadingAnimation from "./UploadingAnimation";

type FileStatus = "idle" | "dragging" | "uploading" | "error";

interface FileError {
  message: string;
  code: string;
}

interface FileUploadProps {
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: FileError) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  currentFile?: File | null;
  onFileRemove?: () => void;
  uploadDelay?: number;
  validateFile?: (file: File) => FileError | null;
  className?: string;
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_STEP_SIZE = 5;
const FILE_SIZES = [
  "Bytes",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB",
] as const;

const formatBytes = (bytes: number, decimals = 2): string => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const unit = FILE_SIZES[i] || FILE_SIZES[FILE_SIZES.length - 1];
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${unit}`;
};

export default function FileUpload({
  onUploadSuccess = () => {},
  onUploadError = () => {},
  acceptedFileTypes = [],
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  currentFile: initialFile = null,
  onFileRemove = () => {},
  uploadDelay = 2000,
  validateFile = () => null,
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [status, setStatus] = useState<FileStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<FileError | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    },
    []
  );

  const validateFileSize = useCallback(
    (file: File): FileError | null => {
      if (file.size > maxFileSize) {
        return {
          message: `File size exceeds ${formatBytes(maxFileSize)}`,
          code: "FILE_TOO_LARGE",
        };
      }
      return null;
    },
    [maxFileSize]
  );

  const validateFileType = useCallback(
    (file: File): FileError | null => {
      if (!acceptedFileTypes?.length) return null;

      const fileType = file.type.toLowerCase();
      if (
        !acceptedFileTypes.some((type) => fileType.match(type.toLowerCase()))
      ) {
        return {
          message: `File type must be ${acceptedFileTypes.join(", ")}`,
          code: "INVALID_FILE_TYPE",
        };
      }
      return null;
    },
    [acceptedFileTypes]
  );

  const handleError = useCallback(
    (error: FileError) => {
      setError(error);
      setStatus("error");
      onUploadError?.(error);

      setTimeout(() => {
        setError(null);
        setStatus("idle");
      }, 3000);
    },
    [onUploadError]
  );

  const simulateUpload = useCallback(
    (uploadingFile: File) => {
      let currentProgress = 0;

      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }

      uploadIntervalRef.current = setInterval(
        () => {
          currentProgress += UPLOAD_STEP_SIZE;
          if (currentProgress >= 100) {
            if (uploadIntervalRef.current) {
              clearInterval(uploadIntervalRef.current);
            }
            setProgress(0);
            setStatus("idle");
            setFile(null);
            onUploadSuccess?.(uploadingFile);
          } else {
            setStatus((prevStatus) => {
              if (prevStatus === "uploading") {
                setProgress(currentProgress);
                return "uploading";
              }
              if (uploadIntervalRef.current) {
                clearInterval(uploadIntervalRef.current);
              }
              return prevStatus;
            });
          }
        },
        uploadDelay / (100 / UPLOAD_STEP_SIZE)
      );
    },
    [onUploadSuccess, uploadDelay]
  );

  const handleFileSelect = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) return;

      // Reset error state
      setError(null);

      // Validate file
      const sizeError = validateFileSize(selectedFile);
      if (sizeError) {
        handleError(sizeError);
        return;
      }

      const typeError = validateFileType(selectedFile);
      if (typeError) {
        handleError(typeError);
        return;
      }

      const customError = validateFile?.(selectedFile);
      if (customError) {
        handleError(customError);
        return;
      }

      setFile(selectedFile);
      setStatus("uploading");
      setProgress(0);
      simulateUpload(selectedFile);
    },
    [
      simulateUpload,
      validateFileSize,
      validateFileType,
      validateFile,
      handleError,
    ]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => (prev !== "uploading" ? "dragging" : prev));
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => (prev === "dragging" ? "idle" : prev));
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (status === "uploading") return;
      setStatus("idle");
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) handleFileSelect(droppedFile);
    },
    [status, handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      handleFileSelect(selectedFile || null);
      if (e.target) e.target.value = "";
    },
    [handleFileSelect]
  );

  const triggerFileInput = useCallback(() => {
    if (status === "uploading") return;
    fileInputRef.current?.click();
  }, [status]);

  const resetState = useCallback(() => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    if (onFileRemove) onFileRemove();
  }, [onFileRemove]);

  return (
    <div
      aria-label="File upload"
      className={cn("relative mx-auto w-full max-w-sm", className || "")}
      role="complementary"
    >
      <div className="group relative w-full rounded-xl bg-white p-0.5 ring-1 ring-gray-200 dark:bg-black dark:ring-white/10">
        <div className="absolute inset-x-0 -top-px h-px w-full bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="relative w-full rounded-[10px] bg-gray-50/50 p-1.5 dark:bg-white/2">
          <div
            className={cn(
              "relative mx-auto w-full overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-white/8 dark:bg-black/50",
              error ? "border-red-500/50" : ""
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                status === "dragging" ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="absolute inset-x-0 top-0 h-[20%] bg-linear-to-b from-blue-500/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[20%] bg-linear-to-t from-blue-500/10 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[20%] bg-linear-to-r from-blue-500/10 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[20%] bg-linear-to-l from-blue-500/10 to-transparent" />
              <div className="absolute inset-[20%] animate-pulse rounded-lg bg-blue-500/5 transition-all duration-300" />
            </div>

            <div className="absolute -top-4 -right-4 h-8 w-8 bg-linear-to-br from-blue-500/20 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative h-60">
              <AnimatePresence mode="wait">
                {status === "idle" || status === "dragging" ? (
                  <motion.div
                    animate={{
                      opacity: status === "dragging" ? 0.8 : 1,
                      y: 0,
                      scale: status === "dragging" ? 0.98 : 1,
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="dropzone"
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4">
                      <UploadIllustration />
                    </div>

                    <div className="mb-4 space-y-1.5 text-center">
                      <h3 className="font-semibold text-gray-900 text-lg tracking-tight dark:text-white">
                        Arrastra y suelta o
                      </h3>
                      <p className="text-gray-500 text-xs dark:text-gray-400">
                        {acceptedFileTypes?.length
                          ? `${acceptedFileTypes
                              .map((t) => t.split("/")[1])
                              .join(", ")
                              .toUpperCase()}`
                          : "SVG, PNG, JPG or GIF"}{" "}
                        {maxFileSize && `up to ${formatBytes(maxFileSize)}`}
                      </p>
                    </div>

                    <button
                      className="group flex w-4/5 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 font-semibold text-gray-900 text-sm transition-all duration-200 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                      onClick={triggerFileInput}
                      type="button"
                    >
                      <span>Sube un Archivo</span>
                      <UploadCloud className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    </button>

                    <p className="mt-3 text-gray-500 text-xs dark:text-gray-400">
                      o arrastra y suelta tu pdf aquí
                    </p>

                    <input
                      accept={acceptedFileTypes?.join(",")}
                      aria-label="File input"
                      className="sr-only"
                      onChange={handleFileInputChange}
                      ref={fileInputRef}
                      type="file"
                    />
                  </motion.div>
                ) : status === "uploading" ? (
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    exit={{ opacity: 0, scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    key="uploading"
                  >
                    <div className="mb-4">
                      <UploadingAnimation progress={progress} />
                    </div>

                    <div className="mb-4 space-y-1.5 text-center">
                      <h3 className="truncate font-semibold text-gray-900 text-sm dark:text-white">
                        {file?.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {formatBytes(file?.size || 0)}
                        </span>
                        <span className="font-medium text-blue-500">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>

                    <button
                      className="flex w-4/5 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 font-semibold text-gray-900 text-sm transition-all duration-200 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                      onClick={resetState}
                      type="button"
                    >
                      Cancel
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2"
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                >
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {error.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

FileUpload.displayName = "FileUpload";
