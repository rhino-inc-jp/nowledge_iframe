"use client";

export default function microCMSField() {
  return (
    <div className="p-5">
      <button
        onClick={() => alert("テスト実装中")}
        className="text-xs border border-slate-500 bg-blue-400 text-slate-50 p-[5px_5px]"
      >
        スクレイピング実行（テスト中）
      </button>
    </div>
  );
}
