import Modal from "../Modal/Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
    >
      <p className="mb-6">
        {message}
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded border px-5 py-2"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="rounded bg-red-600 px-5 py-2 text-white"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}