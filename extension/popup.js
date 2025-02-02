const baseUrl = "https://communitynotes.dev";

document.addEventListener("DOMContentLoaded", () => {
	const createNoteBtn = document.getElementById("create-note");
	const requestNoteBtn = document.getElementById("request-note");
	const noteForm = document.getElementById("note-form");
	const noteContent = document.getElementById("note-content");
	const messageDiv = document.getElementById("message");
	const initialState = document.getElementById("initial-state");

	let selectedText = "";

	const setLoading = (button, isLoading) => {
		if (isLoading) {
			button.disabled = true;
			button.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 inline-block text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>Loading...`;
		} else {
			button.disabled = false;
			button.innerHTML = button.dataset.originalText;
		}
	};

	// Store original button text
	for (const btn of [createNoteBtn, requestNoteBtn]) {
		btn.dataset.originalText = btn.innerHTML;
	}
	
	const submitBtn = noteForm.querySelector('button[type="submit"]');
	submitBtn.dataset.originalText = submitBtn.innerHTML;

	createNoteBtn.addEventListener("click", async () => {
		setLoading(createNoteBtn, true);
		
		try {
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});

			chrome.tabs.sendMessage(tab.id, { type: "CREATE_NOTE" }, (response) => {
				selectedText = response?.success ? response.text : "";
				initialState.classList.add("hidden");
				noteForm.classList.remove("hidden");
				messageDiv.textContent = response?.success ? "You can now write your note" : "";
				messageDiv.className = response?.success ? "mt-2 text-green-600 text-sm" : "";
			});
		} catch (error) {
			messageDiv.textContent = "An error occurred";
			messageDiv.className = "mt-2 text-red-600 text-sm";
		} finally {
			setLoading(createNoteBtn, false);
		}
	});

	requestNoteBtn.addEventListener("click", async () => {
		setLoading(requestNoteBtn, true);
		messageDiv.textContent = "";
		
		try {
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});

			chrome.tabs.sendMessage(
				tab.id,
				{ type: "CREATE_NOTE" },
				async (response) => {
					try {
						messageDiv.textContent = "Requesting note...";
						messageDiv.className = "mt-2 text-blue-600 text-sm";
						
						const apiResponse = await fetch(
							`${baseUrl}/api/extension/request`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									url: tab.url,
									context: response?.success ? response.text : "",
								}),
							},
						);

						if (!apiResponse.ok) {
							throw new Error("Failed to request note");
						}

						const data = await apiResponse.json();

						switch (data.status) {
							case "created": {
								// Fetch and display the created note
								if (!data.note_id) {
									messageDiv.textContent = "Note created! Refresh to see it.";
									messageDiv.className = "mt-2 text-green-600 text-sm";
									break;
								}

								const noteResponse = await fetch(
									`${baseUrl}/api/extension/find?note_id=${data.note_id}`,
									{
										headers: {
											"Content-Type": "application/json",
										},
									}
								);
								
								if (noteResponse.ok) {
									const noteData = await noteResponse.json();
									messageDiv.innerHTML = `
										<div class="mt-2">
											<div class="text-green-600 text-sm mb-2">Note created successfully!</div>
											<div class="text-sm bg-gray-50 p-2 rounded">${noteData.note?.context ?? "Note content will appear shortly..."}</div>
										</div>
									`;
								} else {
									messageDiv.textContent = "Note created! Refresh to see it.";
									messageDiv.className = "mt-2 text-green-600 text-sm";
								}
								break;
							}
							
							case "no_note":
								messageDiv.textContent = "AI decided not to create a note for this selection.";
								messageDiv.className = "mt-2 text-yellow-600 text-sm";
								break;
							
							case "error":
								throw new Error(data.error ?? "An error occurred while creating the note");
							
							default:
								messageDiv.textContent = "Unknown response status";
								messageDiv.className = "mt-2 text-red-600 text-sm";
						}

						// Only auto-close on successful creation
						if (data.status === "created") {
							setTimeout(() => {
								chrome.tabs.reload(tab.id);
								window.close();
							}, 3000);
						}
					} catch (error) {
						messageDiv.textContent = error.message;
						messageDiv.className = "mt-2 text-red-600 text-sm";
					} finally {
						setLoading(requestNoteBtn, false);
					}
				},
			);
		} catch (error) {
			messageDiv.textContent = "An error occurred";
			messageDiv.className = "mt-2 text-red-600 text-sm";
			setLoading(requestNoteBtn, false);
		}
	});

	noteForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const note = noteContent.value.trim();
		if (!note) {
			messageDiv.textContent = "Please write a note";
			messageDiv.className = "mt-2 text-red-600 text-sm";
			return;
		}

		setLoading(submitBtn, true);
		messageDiv.textContent = "Creating note...";
		messageDiv.className = "mt-2 text-blue-600 text-sm";

		try {
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});

			const response = await fetch(`${baseUrl}/api/extension/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: tab.url,
					context: selectedText,
					note,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create note");
			}

			messageDiv.textContent = "Note created successfully!";
			messageDiv.className = "mt-2 text-green-600 text-sm";

			noteContent.value = "";

			setTimeout(() => {
				chrome.tabs.reload(tab.id);
				window.close();
			}, 1500);
		} catch (error) {
			messageDiv.textContent = error.message;
			messageDiv.className = "mt-2 text-red-600 text-sm";
		} finally {
			setLoading(submitBtn, false);
		}
	});
});
