"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function NewChatModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  // inside NewChatModal component
const handleCreate = async () => {
  if (!title.trim()) return;
  console.log("[NewChatModal] create clicked, title:", title);
  try {
    // await the onCreate in case the parent returns a promise (so we can log resolution)
    await onCreate(title.trim());
    console.log("[NewChatModal] onCreate resolved");
    setTitle("");
    onClose();
  } catch (err) {
    console.error("[NewChatModal] onCreate error:", err);
    // keep the modal open so user can retry
    alert("Failed to create chat. See console for details.");
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-card backdrop-blur "
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="bg-card z-100 rounded-2xl p-6 mx-3 w-full max-w-md  border border-primary/20 shadow-dreamy"
          >
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Name your chat
            </h2>
            <input
              type="text"
              placeholder="Enter chat title"
              className="w-full p-2 border border-primary/50 rounded mb-4 text-foreground bg-primary/10 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={title}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreate();
                }
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreate}
                className="text-sm px-4 py-2 rounded bg-gradient-to-r from-primary to-primary/80 border border-violet-200 hover:from-primary/80 hover:to-primary/50 text-white transition"
              >
                Create
              </button>
              <button
                onClick={onClose}
                className="text-sm px-4 py-2 rounded bg-gradient-to-r from-primary to-primary/80 border border-violet-200 hover:from-primary/80 hover:to-primary/50 text-white transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
