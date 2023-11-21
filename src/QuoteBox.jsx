import { useEffect, useState } from "react";

export const QuoteBox = () => {
	const [newQuote, setNewQuote] = useState();
	const [isLoading, setLoading] = useState(true);
	const fetchQuote = async () => {
		try {
			const response = await fetch("https://api.quotable.io/random", {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("error");
			}
			const data = await response.json();
			setNewQuote(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	async function handleNewQuote() {
		await fetchQuote();
	}

	return (
		<div
			id="quote-box"
			style={{
				backgroundColor:
					"#" + Math.floor(Math.random() * 13400).toString(16),
			}}
		>
			<p id="text">{isLoading ? "loading..." : newQuote.content}</p>
			<p id="author">-{isLoading ? "" : newQuote.author}</p>
			<button id="new-quote" onClick={handleNewQuote}>
				New quote
			</button>
			<button>
				<a
					className="twitter-share-button"
					href={`https://twitter.com/intent/tweet?text=${
						isLoading
							? ""
							: newQuote.content + " -" + newQuote.author
					}`}
					target="_blank"
					rel="noreferrer"
					id="tweet-quote"
				>
					Tweet quote
				</a>
			</button>
		</div>
	);
};
