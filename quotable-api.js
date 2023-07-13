export class QuotationAPI {
	#BASE_URL = "https://api.quotable.io";

	query = "";
	tags = "";

	async fetchRandomQuota() {
		try {
			const params = new URLSearchParams({
				tags: this.tags,
			});
			const response = await fetch(`${this.#BASE_URL}/random?${params}&limit=300`);
			return response.json();
		} catch (error) {
			console.log(error);
		}
	}

	async fetchTags() {
		const response = await fetch("https://api.quotable.io/tags");
		return response.json();
	}
}
