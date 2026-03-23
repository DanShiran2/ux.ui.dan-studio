import http.server
import os

os.chdir("/Users/danshiran/Documents/Claude code/Studio landing page")
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(("", 8080), handler)
httpd.serve_forever()
