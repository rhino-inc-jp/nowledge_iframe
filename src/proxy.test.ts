import { describe, expect, it } from "vitest";
import { isAllowed } from "./proxy";
import { NextRequest } from "next/server";

describe("proxyのアクセス制御", () => {
  it("ローカル環境（localhost）を許可", () => {
    const request = new NextRequest(
      "http://localhost:3000/custom-field/button"
    );
    expect(isAllowed(request)).toBe(true);
  });

  it("refererにmicroCMSが含まれていたら許可", () => {
    const request = new NextRequest(
      "https://hoge-fuga.microcms.io/apis/testurl/create",
      {
        headers: {
          referer: "microcms.io",
        },
      }
    );
    expect(isAllowed(request)).toBe(true);
  });

  it("それ以外はNG", () => {
    const request = new NextRequest("http://hogefugapiyo.com");
    expect(isAllowed(request)).toBe(false);
  });
});
