
"use client";

import React, { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [liked, setLiked] = useState(false);
  const [active, setActive] = useState("Home");
  const [post, setPost] = useState("");

  const menu = ["Home", "Explore", "Messages", "Communities", "Saved"];
  const stories = ["You", "Alex", "Sarah", "David", "Grace"];

  return React.createElement(
    "main",
    {
      className: dark
        ? "min-h-screen bg-[#101114] text-white"
        : "min-h-screen bg-gray-100 text-gray-900",
    },
    React.createElement(
      "div",
      { className: "mx-auto flex min-h-screen max-w-[1500px]" },
      React.createElement(
        "aside",
        { className: "hidden w-64 shrink-0 border-r border-gray-700/30 p-6 md:block" },
        React.createElement(
          "h1",
          { className: "mb-10 text-3xl font-black tracking-wider text-violet-500" },
          "VYORA"
        ),
        React.createElement(
          "nav",
          { className: "space-y-3" },
          menu.map((item) =>
            React.createElement(
              "button",
              {
                key: item,
                onClick: () => setActive(item),
                className:
                  "block w-full rounded-xl px-4 py-3 text-left transition " +
                  (active === item ? "bg-violet-600 text-white" : "hover:bg-gray-700/30"),
              },
              item
            )
          )
        ),
        React.createElement(
          "button",
          {
            onClick: () => setDark(!dark),
            className: "mt-10 w-full rounded-xl border border-gray-500/30 px-4 py-3",
          },
          dark ? "☀️ Light mode" : "🌙 Dark mode"
        ),
        React.createElement(
          "div",
          { className: "mt-12 text-sm text-gray-500" },
          "Connect. Share. Belong."
        )
      ),
      React.createElement(
        "section",
        { className: "mx-auto w-full max-w-2xl px-5 py-6" },
        React.createElement(
          "header",
          { className: "mb-8 flex items-center justify-between" },
          React.createElement("h2", { className: "text-2xl font-bold" }, active),
          React.createElement(
            "button",
            {
              onClick: () => setDark(!dark),
              className:
                "rounded-full border border-gray-500/30 px-4 py-2 md:hidden",
            },
            dark ? "☀️" : "🌙"
          ),
          React.createElement("div", { className: "text-sm text-violet-400" }, "● Online")
        ),
        React.createElement(
          "div",
          { className: "mb-8" },
          React.createElement("h3", { className: "mb-4 font-semibold" }, "Stories"),
          React.createElement(
            "div",
            { className: "flex gap-5 overflow-x-auto pb-3" },
            stories.map((name, i) =>
              React.createElement(
                "div",
                { key: name, className: "min-w-14 text-center" },
                React.createElement(
                  "div",
                  {
                    className:
                      "mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-500 text-xl " +
                      (i === 0 ? "bg-gray-700" : "bg-gradient-to-br from-violet-600 to-pink-500"),
                  },
                  i === 0 ? "+" : name[0]
                ),
                React.createElement(
                  "p",
                  { className: "mt-2 text-xs text-gray-400" },
                  name
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "mb-7 rounded-2xl border border-gray-500/20 bg-gray-500/5 p-5" },
          React.createElement("h3", { className: "mb-4 font-semibold" }, "What's happening?"),
          React.createElement("textarea", {
            value: post,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setPost(e.target.value),
            placeholder: "Share something with the world...",
            className:
              "min-h-20 w-full resize-none bg-transparent outline-none placeholder:text-gray-500",
          }),
          React.createElement(
            "div",
            { className: "flex justify-end border-t border-gray-500/20 pt-4" },
            React.createElement(
              "button",
              {
                onClick: () => setPost(""),
                className:
                  "rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold hover:bg-violet-700",
              },
              "Post"
            )
          )
        ),
        React.createElement(
          "article",
          { className: "rounded-2xl border border-gray-500/20 bg-gray-500/5 p-5" },
          React.createElement(
            "div",
            { className: "mb-4 flex items-center gap-3" },
            React.createElement(
              "div",
              { className: "flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold" },
              "A"
            ),
            React.createElement(
              "div",
              null,
              React.createElement("h3", { className: "font-semibold" }, "Alex Morgan"),
              React.createElement(
                "p",
                { className: "text-xs text-gray-500" },
                "2 hours ago · Public"
              )
            )
          ),
          React.createElement(
            "p",
            { className: "mb-5 leading-7" },
            "Every great journey begins with a single step. Keep learning, keep growing and never stop believing in yourself! 🌍"
          ),
          React.createElement(
            "div",
            { className: "flex justify-between border-t border-gray-500/20 pt-4 text-sm" },
            React.createElement(
              "button",
              {
                onClick: () => setLiked(!liked),
                className: liked ? "font-semibold text-pink-500" : "text-gray-400",
              },
              liked ? "♥ Liked" : "♡ Like",
              " ",
              liked ? "13" : "12"
            ),
            React.createElement("button", { className: "text-gray-400" }, "💬 Comment"),
            React.createElement("button", { className: "text-gray-400" }, "↗ Share")
          )
        ),
        React.createElement(
          "footer",
          { className: "py-10 text-center text-xs text-gray-500" },
          "© 2026 VYORA. Connect. Share. Belong."
        )
      ),
      React.createElement(
        "aside",
        { className: "hidden w-72 shrink-0 border-l border-gray-700/30 p-6 xl:block" },
        React.createElement("input", {
          placeholder: "Search VYORA...",
          className:
            "mb-8 w-full rounded-full border border-gray-500/30 bg-transparent px-4 py-3 text-sm outline-none",
        }),
        React.createElement(
          "div",
          { className: "mb-8 rounded-2xl border border-gray-500/20 p-5" },
          React.createElement("h3", { className: "mb-4 font-bold" }, "Trending topics"),
          React.createElement("p", { className: "mb-4 text-sm text-violet-400" }, "#Technology"),
          React.createElement("p", { className: "mb-4 text-sm text-violet-400" }, "#WorldNews"),
          React.createElement("p", { className: "mb-4 text-sm text-violet-400" }, "#Photography"),
          React.createElement("p", { className: "text-sm text-violet-400" }, "#Innovation")
        ),
        React.createElement(
          "div",
          { className: "rounded-2xl border border-gray-500/20 p-5" },
          React.createElement("h3", { className: "mb-4 font-bold" }, "Who to follow"),
          React.createElement("p", { className: "mb-3 text-sm" }, "Sarah Johnson"),
          React.createElement("p", { className: "mb-3 text-sm" }, "David Kim"),
          React.createElement("p", { className: "text-sm" }, "Grace Wilson")
        )
      )
    )
  );
}
