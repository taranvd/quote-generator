import { QuotationAPI } from "./quotable-api.js";

const quotaInstance = new QuotationAPI();

updateOptionsNames();

const authorsSelect = document.getElementById("authors-js");
const quotaContent = document.querySelector(".quote-content");
const quotaAuthor = document.querySelector(".quote-author");
const nextButton = document.querySelector(".next-button");

authorsSelect.addEventListener("change", (e) => {
	quotaInstance.tags = e.target.value;
	fetchRandomQuota();
});

nextButton.addEventListener("click", fetchRandomQuota);

async function updateOptionsNames() {
	const data = await quotaInstance.fetchTags();
	data.forEach((category) => {
		if (category.quoteCount < 5) {
			return;
		}
		const optionEl = document.createElement("option");
		optionEl.value = category.slug;
		optionEl.textContent = category.name;
		authorsSelect.appendChild(optionEl);
	});
}

async function fetchRandomQuota() {
	try {
		const { content, author } = await quotaInstance.fetchRandomQuota();
		quotaContent.innerHTML = content;
		quotaAuthor.textContent = "© " + author;
	} catch (error) {
		console.log(error);
	}
}
