import emoji
import json

def sanitize_keyword(name):
    return name.replace(":", "").replace("_", " ").lower()

def generate_emoji_list():
    emoji_dict = emoji.EMOJI_DATA
    emoji_list = []

    for e, meta in emoji_dict.items():
        if not emoji.is_emoji(e):  # skip non-standard
            continue

        name = meta.get('en', '')
        aliases = meta.get('alias', [])
        keywords = list(set(
            [sanitize_keyword(name)] +
            [sanitize_keyword(alias) for alias in aliases]
        ))
        emoji_list.append({
            "emoji": e,
            "keywords": keywords[:10]  # limit to 10 keywords
        })

    return emoji_list

def write_js_file(emoji_list, path="emoji-list.js"):
    js_content = "export const emojiList = " + json.dumps(emoji_list, ensure_ascii=False, indent=2) + ";"
    with open(path, "w", encoding="utf-8") as f:
        f.write(js_content)

if __name__ == "__main__":
    emojis = generate_emoji_list()
    write_js_file(emojis)
    print(f"Generated emoji-list.js with {len(emojis)} entries.")
