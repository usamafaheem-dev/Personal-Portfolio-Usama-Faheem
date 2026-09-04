import urllib.request
import numpy as np
import imageio
from PIL import Image
from collections import deque
import os

url = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
video_path = "temp_fox.mp4"

if not os.path.exists(video_path):
    print("Downloading video...")
    urllib.request.urlretrieve(url, video_path)

print("Reading video frames using ffmpeg plugin...")
reader = imageio.get_reader(video_path, 'ffmpeg')

processed_frames = []
total_frames = reader.count_frames()
print(f"Total video frames: {total_frames}")

for idx, frame in enumerate(reader):
    img = np.array(frame)
    h, w, c = img.shape
    
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:, :, :3] = img[:, :, :3]
    rgba[:, :, 3] = 255
    
    r = img[:, :, 0].astype(int)
    g = img[:, :, 1].astype(int)
    b = img[:, :, 2].astype(int)
    
    brightness = (r + g + b) // 3
    color_diff = np.maximum.reduce([np.abs(r - g), np.abs(g - b), np.abs(r - b)])
    
    y_coords, x_coords = np.indices((h, w))
    
    # Hard floor cutoff below shoes
    floor_mask = y_coords > int(h * 0.885)
    
    # Orange fur protection
    orange_mask = (r > 130) & (r - b > 30) & (r - g > 10)
    
    # Black clothes/shoes protection
    black_mask = brightness < 60
    
    # Floor shadow (neutral grey/white)
    shadow_mask = (y_coords > int(h * 0.73)) & (color_diff < 25) & (brightness > 90)
    
    # Studio white
    studio_white = ((color_diff < 25) & (brightness > 160)) | (brightness > 215)
    
    is_bg_candidate = (floor_mask | shadow_mask | studio_white) & (~orange_mask) & (~black_mask)
    
    # BFS Flood-Fill from outer perimeter
    visited = np.zeros((h, w), dtype=bool)
    q = deque()
    
    for x in range(w):
        if is_bg_candidate[0, x]:
            visited[0, x] = True
            q.append((0, x))
        if is_bg_candidate[h - 1, x]:
            visited[h - 1, x] = True
            q.append((h - 1, x))
            
    for y in range(h):
        if not visited[y, 0] and is_bg_candidate[y, 0]:
            visited[y, 0] = True
            q.append((y, 0))
        if not visited[y, w - 1] and is_bg_candidate[y, w - 1]:
            visited[y, w - 1] = True
            q.append((y, w - 1))
            
    while q:
        cy, cx = q.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and is_bg_candidate[ny, nx]:
                    visited[ny, nx] = True
                    q.append((ny, nx))
                    
    # Alpha = 0 for background
    rgba[visited, 3] = 0
    
    pil_img = Image.fromarray(rgba)
    processed_frames.append(pil_img)
    if idx % 15 == 0:
        print(f"Processed {idx}/{total_frames} frames...")

reader.close()

os.makedirs("public", exist_ok=True)
out_webp = "public/fox-transparent.webp"
print(f"Saving animated WebP to {out_webp}...")

# Save animated WebP with true alpha channel
processed_frames[0].save(
    out_webp,
    save_all=True,
    append_images=processed_frames[1:],
    duration=int(1000 / 25),
    loop=0,
    quality=90,
    method=6
)

print("SUCCESS: public/fox-transparent.webp created!")
