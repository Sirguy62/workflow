"use client";

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="
          w-12 h-12
          border-4 border-purple-200
          border-t-purple-500
          rounded-full
          animate-spin
        "
      />
    </div>
  );
}
