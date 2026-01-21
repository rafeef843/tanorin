import os
import hashlib

def remove_duplicates(directory):
    if not os.path.isdir(directory):
        print(f"Directory not found: {directory}")
        return

    hashes = {}
    duplicates = 0
    bytes_saved = 0

    print(f"Scanning {directory}...")
    
    files = sorted([f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))])

    for filename in files:
        filepath = os.path.join(directory, filename)
        
        try:
            with open(filepath, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()
            
            if file_hash in hashes:
                print(f"Duplicate found: {filename} is same as {hashes[file_hash]}")
                os.remove(filepath)
                duplicates += 1
                bytes_saved += os.path.getsize(os.path.join(directory, hashes[file_hash])) # approximate
            else:
                hashes[file_hash] = filename
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print(f"\nFinished.")
    print(f"Removed {duplicates} duplicate files.")

if __name__ == "__main__":
    target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../categories-images1'))
    remove_duplicates(target_dir)
