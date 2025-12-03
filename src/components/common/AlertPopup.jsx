"use client";
import OverlayModal from "@/components/molecules/OverlayModal";

const AlertPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to continue?",
  confirmText = "Yes",
  cancelText = "No",
  confirmBtnClass = "bg-blue-700 hover:bg-blue-800 text-white",
  cancelBtnClass = "bg-red-500 hover:bg-red-600 text-white",
  icon = "!",
  iconClass = "text-4xl text-orange-400 border-2 border-red-500",
  modalClass = "!max-w-md px-4",
  loading = false,
}) => {
  return (
    <OverlayModal modalClass={modalClass} isOpen={isOpen} onClose={onClose}>
      <div className="text-center bg-white p-4 rounded flex justify-center flex-col items-center">
        {/* Icon */}
        <div
          className={`${iconClass} mb-3 flex justify-center items-center rounded-full h-16 w-16`}
        >
          {icon}
        </div>

        {/* Title */}
        <p className="text-lg font-semibold text-gray-900">{title}</p>

        {/* Message */}
        <p className="text-sm mb-4 text-gray-700">{message}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            disabled={loading}
            onClick={onClose}
            className={`${cancelBtnClass} disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2 rounded cursor-pointer`}
          >
            {cancelText}
          </button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className={`${confirmBtnClass} disabled:opacity-50 disabled:cursor-not-allowed  px-8 py-2 rounded cursor-pointer`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </OverlayModal>
  );
};

export default AlertPopup;
