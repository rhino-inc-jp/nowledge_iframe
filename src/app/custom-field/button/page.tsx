"use client";

import { useState } from "react";

export default function MicroCMSField() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  async function extract() {
    const response = await fetch("/api/extract-meta", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setResult(data);
  }

  return (
    <div className="p-5">
      <div className="mb-3">
        <input
          type="text"
          placeholder="URL 入力"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-[1_5] w-full"
        />
      </div>
      <div>
        <button
          onClick={extract}
          className="text-xs border border-slate-500 bg-blue-400 text-slate-50 p-[5px_5px]"
        >
          スクレイピング実行（テスト中）
        </button>
      </div>

      {result && <div>{JSON.stringify(result, null, 2)}</div>}
    </div>
  );
}
