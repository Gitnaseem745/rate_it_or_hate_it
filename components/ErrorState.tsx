import Button from "./Button";

interface ErrorStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function ErrorState({
  title,
  message,
  actionLabel = "Go Back",
  onAction,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gray-400 text-xl mb-4">{title}</p>
        {message && <p className="text-gray-500 text-sm mb-6">{message}</p>}
        {onAction && (
          <Button onClick={onAction} variant="primary" size="md">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
