interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeStyles = {
  sm: "w-8 h-8 border-2",
  md: "w-16 h-16 border-4",
  lg: "w-24 h-24 border-4",
};

export default function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`${sizeStyles[size]} border-purple-500 border-t-transparent rounded-full animate-spin`}
        ></div>
        {text && <p className="text-gray-400 text-lg">{text}</p>}
      </div>
    </div>
  );
}
