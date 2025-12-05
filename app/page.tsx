// app/page.tsx
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

type Post = {
  id: number;
  user: string;
  text: string;
  date: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    user: "ochin",
    text: "これはテスト投稿です。SNSっぽい見た目だけ先に作ってみた。",
    date: "2025-01-01",
  },
  {
    id: 2,
    user: "guest_user",
    text: "本当のデータベースはまだ無いけど、タイムラインごっこはできる。",
    date: "2025-01-02",
  },
  {
    id: 3,
    user: "ochin",
    text: "そのうち投稿フォーム付けたり、ログインつけたりする予定（かもしれない）。",
    date: "2025-01-03",
  },
  {
    id: 4,
    user: "someone",
    text: "とりあえず Vercel でデプロイできた時点で初心者卒業レベルではある。",
    date: "2025-01-04",
  },
  {
    id: 5,
    user: "ochin",
    text: "意見は無いけど SNS は作る男。",
    date: "2025-01-05",
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newPost: Post = {
      id: Date.now(),
      user: "visitor",
      text: trimmed,
      date: new Date().toISOString().slice(0, 10),
    };

    setPosts([newPost, ...posts]);
    setText("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "16px",
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            marginBottom: "16px",
            paddingBottom: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            おちんSNS（その場投稿版）
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginTop: "4px",
            }}
          >
            上のフォームから投稿すると、下のタイムラインに追加されます。
            データはこのページを開いているあいだだけ有効な、お試しSNSです。
          </p>
          <Link
            href="/jinsei-generator"
            style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: "#8b5cf6",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            ✨ 人生論ジェネレーター
          </Link>
        </header>

        {/* 投稿フォーム */}
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "16px",
            backgroundColor: "#ffffff",
            padding: "12px 14px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "6px",
              color: "#4b5563",
            }}
          >
            いま考えてること（適当でOK）
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="ここに書いて「投稿」ボタンを押すと、下のタイムラインに追加されます。"
            style={{
              width: "100%",
              resize: "vertical",
              fontSize: "14px",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              disabled={!text.trim()}
              style={{
                fontSize: "14px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "none",
                color: "#ffffff",
                backgroundColor: text.trim() ? "#2563eb" : "#9ca3af",
                cursor: text.trim() ? "pointer" : "not-allowed",
              }}
            >
              投稿
            </button>
          </div>
        </form>

        {/* タイムライン */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "12px 14px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                <span>@{post.user}</span>
                <span>{post.date}</span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {post.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
