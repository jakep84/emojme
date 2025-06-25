import { emojiList } from "./emoji-list.js";

const container = document.getElementById("emoji-container");
const searchInput = document.getElementById("search-input");

const batchSize = 200;
let currentIndex = 0;
let currentEmojiList = [...emojiList];

// Utility: copy emoji and show tooltip
function copyEmoji(emoji, tile) {
  navigator.clipboard.writeText(emoji).then(() => {
    tile.style.backgroundColor = "#c6f6d5";

    const tooltip = document.createElement("div");
    tooltip.textContent = "Copied!";
    tooltip.style.position = "absolute";
    tooltip.style.background = "#000";
    tooltip.style.color = "#fff";
    tooltip.style.fontSize = "10px";
    tooltip.style.padding = "2px 5px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.zIndex = "999";
    tooltip.style.transform = "translateY(-20px)";
    tooltip.style.transition = "opacity 0.3s";
    tooltip.style.opacity = "1";

    const rect = tile.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY}px`;
    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.style.opacity = "0";
      setTimeout(() => tooltip.remove(), 300);
    }, 800);

    setTimeout(() => (tile.style.backgroundColor = ""), 400);
  });
}

// Render next batch of emojis
function renderBatch() {
  const slice = currentEmojiList.slice(currentIndex, currentIndex + batchSize);
  slice.forEach(({ emoji }) => {
    const tile = document.createElement("div");
    tile.className = "emoji-tile";
    tile.innerHTML = emoji;
    tile.onclick = () => copyEmoji(emoji, tile);
    container.appendChild(tile);
  });
  currentIndex += batchSize;
}

// Reset and render new emoji list
function resetAndRender(list) {
  container.innerHTML = "";
  currentIndex = 0;
  currentEmojiList = list;
  renderBatch();
}

// Handle scroll to load more
container.addEventListener("scroll", () => {
  const nearBottom =
    container.scrollTop + container.clientHeight >= container.scrollHeight - 20;
  if (nearBottom && currentIndex < currentEmojiList.length) {
    renderBatch();
  }
});

// Handle input search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    resetAndRender([...emojiList]);
  } else {
    const filtered = emojiList.filter(
      ({ keywords }) =>
        Array.isArray(keywords) &&
        keywords.some(
          (kw) => typeof kw === "string" && kw.toLowerCase().includes(query)
        )
    );
    resetAndRender(filtered);
  }
});

// Initial render
resetAndRender([...emojiList]);
