const baseUrl = "https://communitynotes.dev";

// Add request options for CORS
const requestOptions = {
	credentials: "include",
	headers: {
		"Content-Type": "application/json",
		Origin: window.location.origin,
	},
};

// Function to detect color scheme
function detectColorScheme() {
	// Check if the website has a dark mode class on html/body
	const htmlDark = document.documentElement.classList.contains("dark");
	const bodyDark = document.body.classList.contains("dark");

	// Check system preference
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// Check computed background color of body
	const bodyBg = window.getComputedStyle(document.body).backgroundColor;
	const [r, g, b] = bodyBg.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
	const isDarkBg = (r + g + b) / 3 < 128;

	return htmlDark || bodyDark || systemDark || isDarkBg;
}

// Safety check to avoid processing in iframes or problematic contexts
if (window.self === window.top) {
	// Defer initialization to not block page load
	setTimeout(initializeExtension, 1000);
}

function initializeExtension() {
	// Only run on HTML documents
	if (document.contentType !== "text/html") return;

	console.log("Community Notes: Initializing extension...");
	fetchAndDisplayNotes().catch(console.error);
}

// Function to add a note card after text
function addNoteCard(phrase, note) {
	try {
		console.log("Community Notes: Attempting to add note for phrase:", phrase);
		// Skip if phrase is empty or too long
		if (!phrase || phrase.length > 1000) return;

		const walker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_TEXT,
			{
				acceptNode: (node) => {
					// Skip script and style tags
					const parent = node.parentElement;
					if (!parent) return NodeFilter.FILTER_REJECT;

					const tagName = parent.tagName.toLowerCase();
					if (
						tagName === "script" ||
						tagName === "style" ||
						tagName === "noscript"
					) {
						return NodeFilter.FILTER_REJECT;
					}

					return NodeFilter.FILTER_ACCEPT;
				},
			},
			false,
		);

		let node;
		let processedNodes = 0;
		const MAX_NODES = 1000; // Prevent infinite loops

		while (processedNodes < MAX_NODES) {
			node = walker.nextNode();
			if (!node) break;

			processedNodes++;
			const index = node.textContent.indexOf(phrase);
			if (index >= 0) {
				try {
					// Create container for better spacing
					const container = document.createElement("div");
					container.className = "max-w-2xl";

					// Create the note card with refined design
					const card = document.createElement("div");
					const isDarkMode = detectColorScheme();

					// Apply dark mode if detected
					if (isDarkMode) {
						card.classList.add("dark");
					}

					card.className = `bg-white dark:bg-zinc-900 rounded border-l-4 overflow-hidden ${
						note.rating === "helpful"
							? "border-l-green-500"
							: note.rating === "not_helpful"
								? "border-l-red-500"
								: "border-l-zinc-300 dark:border-l-zinc-600"
					}`;

					// Create content section
					const content = document.createElement("div");
					content.className = "px-2";

					content.innerHTML = `
						<div class="flex flex-col items-center gap-2 text-sm my-2">
							<h2 class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Community Note</h2>
							<p class="mt-1 text-sm text-zinc-700 dark:text-zinc-300">${note.context}</p>
						</div>
					`;

					// Assemble the card
					card.appendChild(content);
					container.appendChild(card);

					// Insert after the parent of the text node
					const parent = node.parentElement;
					if (parent.nextSibling) {
						parent.parentNode.insertBefore(container, parent.nextSibling);
					} else {
						parent.parentNode.appendChild(container);
					}

					console.log("Community Notes: Successfully added note card");
					break; // Only add first occurrence to avoid potential issues
				} catch (e) {
					console.error("Error adding note card:", e);
				}
			}
		}
	} catch (error) {
		console.error("Error in addNoteCard:", error);
	}
}

// Function to fetch and display notes
async function fetchAndDisplayNotes() {
	try {
		console.log(
			"Community Notes: Fetching notes for URL:",
			window.location.href,
		);
		const response = await fetch(
			`${baseUrl}/api/extension/find?url=${encodeURIComponent(window.location.href)}`,
			{
				...requestOptions,
				signal: AbortSignal.timeout(5000), // 5 second timeout
			},
		);

		if (!response.ok) {
			const errorText = await response.text().catch(() => "Unknown error");
			throw new Error(`Failed to fetch notes: ${errorText}`);
		}

		const { notes } = await response.json();
		console.log("Community Notes: Received notes:", notes);

		if (!Array.isArray(notes)) return;

		// Group notes by phrase and sort by helpfulness
		const notesByPhrase = notes.reduce((acc, note) => {
			if (!note || typeof note.phrase !== "string") return acc;

			if (!acc[note.phrase]) {
				acc[note.phrase] = [];
			}
			acc[note.phrase].push(note);
			return acc;
		}, {});

		// For each phrase, display only the most helpful note
		for (const [phrase, phraseNotes] of Object.entries(notesByPhrase)) {
			// Sort notes by helpfulness
			const sortedNotes = phraseNotes.sort((a, b) => {
				if (a.rating === "helpful" && b.rating !== "helpful") return -1;
				if (a.rating !== "helpful" && b.rating === "helpful") return 1;
				return 0;
			});

			// Add card for the most helpful note
			if (sortedNotes.length > 0) {
				addNoteCard(phrase, sortedNotes[0]);
			}
		}
	} catch (error) {
		if (error.name === "AbortError") {
			console.error("Fetching notes timed out");
		} else if (
			error instanceof TypeError &&
			error.message.includes("Failed to fetch")
		) {
			console.error(
				"Network error: Make sure the server is running and accessible",
			);
		} else {
			console.error("Error fetching notes:", error);
		}
	}
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "CREATE_NOTE") {
		try {
			const selection = window.getSelection();
			const selectedText = selection?.toString().trim() ?? "";

			sendResponse({
				success: true,
				text: selectedText,
			});
		} catch (error) {
			console.error("Error handling CREATE_NOTE message:", error);
			sendResponse({
				success: false,
				error: "An error occurred while getting selected text",
			});
		}
	}
	return true;
});
