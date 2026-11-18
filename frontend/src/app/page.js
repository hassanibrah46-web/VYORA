
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialPosts = [
  {
    id: 1,
    name: "Alex Morgan",
    username: "@alexmorgan",
    initials: "AM",
    time: "15 minutes ago",
    text: "A new day, a new opportunity! Excited to connect with amazing people around the world. 🌍",
    likes: 124,
    comments: 18,
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "@sarahj",
    initials: "SJ",
    time: "1 hour ago",
    text: "What is one skill you think everyone should learn in 2026? Let's share ideas! 💡",
    likes: 86,
    comments: 32,
    color: "bg-pink-600",
  },
];

const stories = [
  { name: "Your story", initials: "+", color: "bg-violet-600" },
  { name: "Alex", initials: "AM", color: "bg-blue-600" },
  { name: "Sarah", initials: "SJ", color: "bg-pink-600" },
  { name: "David", initials: "DK", color: "bg-green-600" },
  { name: "Grace", initials: "GK", color: "bg-orange-600" },
];

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [active, setActive] = useState("Home");
  const [posts, setPosts] = useState(initialPosts);
  const [message, setMessage] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("vyora_user");
    const token = localStorage.getItem("vyora_token");

    if (!savedUser || !token) {
      router.replace("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("vyora_user");
      localStorage.removeItem("vyora_token");
      router.replace("/login");
    }
  }, [router]);

  const initials = user?.full_name
    ? user.full_name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "V";

  const navigation = [
    ["⌂", "Home"],
    ["⌕", "Explore"],
    ["✉", "Messages"],
    ["♧", "Communities"],
    ["♡", "Notifications"],
    ["◎", "Profile"],
    ["⚙", "Settings"],
  ];

  function logout() {
    localStorage.removeItem("vyora_token");
    localStorage.removeItem("vyora_user");
    router.replace("/login");
  }

  function createPost() {
    if (!message.trim()) return;

    const newPost = {
      id: Date.now(),
      name: user?.full_name || "You",
      username: "@you",
      initials,
      time: "Just now",
      text: message,
      likes: 0,
      comments: 0,
      color: "bg-violet-600",
    };

    setPosts((previous) => [newPost, ...previous]);
    setMessage("");
    setActive("Home");
  }

  function toggleLike(id) {
    setLikedPosts((previous) =>
      previous.includes(id)
        ? previous.filter((postId) => postId !== id)
        : [...previous, id]
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d12] text-white">
        <p className="text-gray-400">Loading VYORA...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d12] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">

        {/* LEFT SIDEBAR */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 p-6 md:flex md:flex-col">
          <h1 className="text-3xl font-black tracking-widest text-violet-500">
            VYORA
          </h1>

          <p className="mt-2 text-xs text-gray-500">
            Connect. Share. Belong.
          </p>

          <nav className="mt-12 space-y-3">
            {navigation.map(([icon, name]) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition ${
                  active === name
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{name}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              setActive("Home");
              document.getElementById("create-post")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="mt-10 rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-700"
          >
            + Create post
          </button>

          {/* USER PROFILE */}
          <div className="mt-auto border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500">
                  Your profile
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-5 w-full rounded-xl border border-white/10 py-3 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400"
            >
              Log out
            </button>
          </div>
        </aside>

        {/* MAIN FEED */}
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0d0d12]/95 px-5 py-5 backdrop-blur">
            <div>
              <h2 className="text-xl font-bold">{active}</h2>
              <p className="text-xs text-gray-500">
                Welcome, {user.full_name}!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActive("Notifications")}
                className="rounded-full bg-white/5 p-3 hover:bg-white/10"
                aria-label="Notifications"
              >
                ♡
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
                {initials}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">

            {/* STORIES */}
            <div className="rounded-2xl border border-white/10 bg-[#15151d] p-5">
              <h3 className="mb-5 font-bold">Stories</h3>

              <div className="flex gap-5 overflow-x-auto pb-2">
                {stories.map((story) => (
                  <button
                    key={story.name}
                    className="flex shrink-0 flex-col items-center gap-2"
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${story.color} font-bold ring-2 ring-violet-400 ring-offset-2 ring-offset-[#15151d]`}>
                      {story.initials}
                    </div>

                    <span className="text-xs text-gray-400">
                      {story.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CREATE POST */}
            <div
              id="create-post"
              className="rounded-2xl border border-white/10 bg-[#15151d] p-5"
            >
              <h3 className="mb-4 font-bold">What's happening?</h3>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share something with the world..."
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0d12] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Share your thoughts 🌍
                </span>

                <button
                  onClick={createPost}
                  disabled={!message.trim()}
                  className="rounded-xl bg-violet-600 px-6 py-2 font-semibold hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Post
                </button>
              </div>
            </div>

            {/* POSTS */}
            <div className="space-y-5">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-white/10 bg-[#15151d] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${post.color} font-bold`}>
                      {post.initials}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{post.name}</h3>
                      <p className="text-xs text-gray-500">
                        {post.username} · {post.time}
                      </p>
                    </div>

                    <button className="text-gray-500 hover:text-white">
                      ⋯
                    </button>
                  </div>

                  <p className="my-5 whitespace-pre-wrap text-sm leading-7 text-gray-200">
                    {post.text}
                  </p>

                  <div className="flex items-center gap-6 border-t border-white/10 pt-4 text-sm">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 ${
                        likedPosts.includes(post.id)
                          ? "text-pink-500"
                          : "text-gray-400 hover:text-pink-500"
                      }`}
                    >
                      ♥ {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>

                    <button className="text-gray-400 hover:text-violet-400">
                      ◯ {post.comments} Comments
                    </button>

                    <button className="text-gray-400 hover:text-violet-400">
                      ↗ Share
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="pb-8 text-center text-xs text-gray-600">
              You're part of the VYORA community.
            </p>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden w-72 shrink-0 space-y-6 border-l border-white/10 p-6 xl:block">
          <input
            placeholder="Search VYORA..."
            className="w-full rounded-xl border border-white/10 bg-[#15151d] px-4 py-3 text-sm outline-none focus:border-violet-500"
          />

          <div className="rounded-2xl border border-white/10 bg-[#15151d] p-5">
            <h3 className="mb-4 font-bold">Trending topics</h3>

            {["#Technology", "#Innovation", "#Photography", "#Community"].map((topic) => (
              <button
                key={topic}
                onClick={() => setActive("Explore")}
                className="mb-4 block text-sm text-violet-400 hover:text-violet-300"
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#15151d] p-5">
            <h3 className="mb-4 font-bold">About VYORA</h3>
            <p className="text-sm leading-6 text-gray-400">
              A place to connect with people, share ideas and build communities across the world.
            </p>
          </div>

          <p className="text-xs text-gray-600">
            About · Privacy · Terms · © 2026 VYORA
          </p>
        </aside>

      </div>
    </main>
  );
}
