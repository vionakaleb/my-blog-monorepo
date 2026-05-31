export const PostFormModal = ({ isOpen, mode, post, onClose, onSubmit }) => {
  const isNew = mode === "new";

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box w-11/12 max-w-3xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-5 border-b-4 border-primary pb-2">
          {isNew ? "Create New Post" : "Edit Post"}
        </h3>
        <form onSubmit={onSubmit}>
          <div className="form-control space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                className="input input-bordered"
                defaultValue={post?.title || ""}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                name="content"
                className="textarea textarea-bordered h-48"
                placeholder="Write your post content here..."
                defaultValue={post?.content || ""}
                required
              ></textarea>
            </div>
            <div className="modal-action mt-6">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
