#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

for port in [8080, 8081, 8082, 3000, 3001]:
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print("\n[SUCCESS] Server running at http://localhost:" + str(port) + "/cv.html")
            print("[INFO] Directory: " + os.getcwd())
            print("[INFO] Press Ctrl+C to stop\n")
            httpd.serve_forever()
            break
    except OSError as e:
        if "Address already in use" in str(e):
            print("Port " + str(port) + " busy, trying next...")
            continue
        raise
