export const PostCard = ({ post, user, onView, onEdit, onDelete }) => {
  const canModify = user && user.id === post.user_id;
  const postDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card w-full bg-base-100 shadow-lg border border-base-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold mb-2">{post.title}</h2>
        <div className="text-sm text-base-content/70 mb-4">
          By {post.author.name} on {postDate}
        </div>
        <p className="line-clamp-3">{post.content}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost" onClick={onView}>
            Read More
          </button>
          {canModify && (
            <>
              <button className="btn btn-outline btn-sm" onClick={onEdit}>
                Edit
              </button>
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
