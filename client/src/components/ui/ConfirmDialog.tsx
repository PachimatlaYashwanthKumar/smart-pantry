import Button from "../Button/Button";

interface Props {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            className="w-auto bg-gray-300 text-gray-700 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="w-auto bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}