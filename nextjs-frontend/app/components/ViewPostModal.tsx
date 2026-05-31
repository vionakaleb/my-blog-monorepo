export const ViewPostModal = ({ isOpen, post, onClose }) => {
  if (!post) return null;

  const postDate = new Date(post.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box w-11/12 max-w-4xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-4xl mb-2">{post.title}</h3>
        <div className="text-sm text-base-content/70 mb-6">
          By {post.author.name} on {postDate}
        </div>
        <div className="prose max-w-none">
          <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
        </div>
        <div className="modal-action mt-6">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
