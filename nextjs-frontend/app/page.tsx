"use client";

import { useState, useEffect } from "react";
import { AppNavbar } from "./components/AppNavbar";
import { PostCard } from "./components/PostCard";
import { Pagination } from "./components/Pagination";
import { AuthModal } from "./components/AuthModal";
import { PostFormModal } from "./components/PostFormModal";
import { ViewPostModal } from "./components/ViewPostModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api`;

async function getCsrfToken() {
  try {
    await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
  }
}

export default function Page() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [modalState, setModalState] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  async function checkAuth() {
    try {
      const response = await fetch(`${API_URL}/user`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("No authenticated user found.");
      setUser(null);
    }
  }

  async function fetchPosts() {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch(`${API_URL}/posts?page=${currentPage}`, {
        credentials: "include", // Include credentials if posts are user-specific
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch posts. Server responded unexpectedly."
        );
      }

      const data = await response.json();
      setPosts(data.data || []);
      setTotalPages(data.last_page || 1);
      setCurrentPage(data.current_page || 1);
    } catch (error) {
      console.error("Fetch posts error:", error);
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError(null);
    await getCsrfToken();

    try {
      const formData = new FormData(e.target);
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      await checkAuth();
      await fetchPosts();
      setModalState(null);
    } catch (error) {
      console.error("Login error:", error);
      setApiError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError(null);
    await getCsrfToken();

    try {
      const formData = new FormData(e.target);
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed.");
      }

      await checkAuth();
      await fetchPosts();
      setModalState(null);
    } catch (error) {
      console.error("Sign up error:", error);
      setApiError(error.message);
    }
  };

  const handleLogout = async () => {
    setApiError(null);
    await getCsrfToken();

    try {
      await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setCurrentPage(1); 
      fetchPosts();
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    setApiError(null);
    await getCsrfToken();

    const formData = new FormData(e.target);
    const postData = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    let url = `${API_URL}/posts`;
    const method = "POST";

    if (modalState === "edit" && selectedPost) {
      url = `${API_URL}/posts/${selectedPost?.id}`;
      formData.append("_method", "PUT");
    }

    try {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        body: {
          ...formData,
          ...postData
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save post.");
      }

      setModalState(null);
      setSelectedPost(null);
      if (modalState === "new") {
        setCurrentPage(1);
      }
      fetchPosts();
    } catch (error) {
      console.error("Save post error:", error);
      setApiError(error.message);
    }
  };

  const handleDeletePost = (post) => {
    setPostToDelete(post);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    setApiError(null);
    await getCsrfToken();

    try {
      const response = await fetch(`${API_URL}/posts/${postToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      setPostToDelete(null);
      fetchPosts();
    } catch (error) {
      console.error("Delete post error:", error);
      setApiError(error.message);
    }
  };

  const openModal = (state, post = null) => {
    setModalState(state);
    if (post) {
      setSelectedPost(post);
    }
    setApiError(null);
  };

  const closeModal = () => {
    setModalState(null);
    setSelectedPost(null);
  };

  const closeDeleteModal = () => {
    setPostToDelete(null);
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <AppNavbar
        user={user}
        onLoginClick={() => openModal("login")}
        onSignUpClick={() => openModal("signup")}
        onLogoutClick={handleLogout}
      />

      <main className="container p-4 mx-auto my-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">All Posts</h1>
          {user && (
            <button
              className="btn btn-primary"
              onClick={() => openModal("new")}
            >
              New Post
            </button>
          )}
        </div>

        {apiError && (
          <div role="alert" className="alert alert-error shadow-lg mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              <strong>Error:</strong> {apiError}
            </span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setApiError(null)}
            >
              ✕
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-lg loading-spinner"></span>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  user={user}
                  onView={() => openModal("view", post)}
                  onEdit={() => openModal("edit", post)}
                  onDelete={() => handleDeletePost(post)}
                />
              ))
            ) : (
              <p className="text-center text-base-content/70 py-10">
                No posts found.
              </p>
            )}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      <AuthModal
        isOpen={modalState === "login" || modalState === "signup"}
        mode={modalState}
        onClose={closeModal}
        onSubmit={modalState === "login" ? handleLogin : handleSignUp}
      />

      <PostFormModal
        isOpen={modalState === "new" || modalState === "edit"}
        mode={modalState}
        post={selectedPost}
        onClose={closeModal}
        onSubmit={handleSavePost}
      />

      <ViewPostModal
        isOpen={modalState === "view"}
        post={selectedPost}
        onClose={closeModal}
      />

      {/* --- Delete Confirmation Modal --- */}
      <dialog className="modal" open={!!postToDelete}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Delete Post</h3>
          <p className="py-4">
            Are you sure you want to delete this post?
            <br />
            <strong>&ldquo;{postToDelete?.title}&ldquo;</strong>
            <br />
            This action cannot be undone.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={closeDeleteModal}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeDeleteModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}
