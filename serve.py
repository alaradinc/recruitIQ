#!/usr/bin/env python3
"""
Always serve files from this script's directory (the recruitIQ project root),
so you get 200 + index.html even if your terminal cwd is somewhere else.
"""
from __future__ import annotations

import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(ROOT, "index.html")

if not os.path.isfile(INDEX):
    print(f"ERROR: Missing index.html in:\n  {ROOT}", file=sys.stderr)
    sys.exit(1)

os.chdir(ROOT)

PORT = int(os.environ.get("PORT", "8080"))
HOST = "127.0.0.1"


def main() -> None:
    try:
        with socketserver.TCPServer((HOST, PORT), http.server.SimpleHTTPRequestHandler) as httpd:
            print("RecruitIQ — local static server")
            print(f"  Serving: {ROOT}")
            print(f"  URL:     http://{HOST}:{PORT}/")
            print("  Stop: Ctrl+C\n")
            httpd.serve_forever()
    except OSError as e:
        if e.errno in (48, 98, 10048):  # Address already in use (mac/linux/win-ish)
            print(
                f"ERROR: Port {PORT} is already in use.\n"
                f"  Stop the other process (e.g. another http.server), or run:\n"
                f"  PORT=8090 python3 serve.py",
                file=sys.stderr,
            )
        raise SystemExit(1) from e


if __name__ == "__main__":
    main()
