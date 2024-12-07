"use client";

export default function CreateUserModal({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
  return (
    <div
      onClick={closeModalAction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div onClick={(e) => e.stopPropagation()} className="rounded-xl bg-white p-4">
        <h1 className="mb-3 text-3xl font-bold">Create User</h1>
      </div>
    </div>
  );
}
