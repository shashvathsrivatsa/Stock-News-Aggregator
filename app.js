function fetchFunc () {
    const ticker = document.getElementById('input-field').value;
    fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&limit=200&apikey=LI6KQURHNB85O9B4`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    
        const newsArticles = response.feed
    
        const container = document.querySelector(".news-container");

        container.innerHTML = '';
    
        newsArticles.forEach(article => {
            const newsArticleElement = document.createElement("div");
            newsArticleElement.classList.add("news-article");
            newsArticleElement.style.flexDirection = 'column';
            newsArticleElement.style.justifyContent = 'space-between';
    
            const imageElement = document.createElement("img");
            if (article.banner_image) {
                imageElement.src = article.banner_image;
            } else {
                imageElement.src = 'images/unavailable-image.jpg';
            }
            newsArticleElement.appendChild(imageElement);
    
            const titleElement = document.createElement("h2");
            titleElement.textContent = article.title;
            newsArticleElement.appendChild(titleElement);
    
            const sourceElement = document.createElement("p");
            sourceElement.classList.add("source");
            sourceElement.innerHTML = `<a href="https://${article.source_domain}" target="_blank">${article.source}</a>`;
            newsArticleElement.appendChild(sourceElement);
    
            const relatedTickersElemenet = document.createElement("p");
            relatedTickersElemenet.classList.add("related-tickers");
            relatedTickersElemenet.textContent = article.ticker_sentiment.map(ticker => ticker.ticker).join(', ');
            newsArticleElement.appendChild(relatedTickersElemenet);

            // const sentimentElement = document.createElement("p");
            // sentimentElement.classList.add("sentiment-label");
            // sentimentElement.textContent = article.overall_sentiment_label;
            // newsArticleElement.appendChild(sentimentElement);
    
            const scoreElement = document.createElement("p");
            scoreElement.classList.add("sentiment-score");
            const score = article.overall_sentiment_score.toFixed(2);
            scoreElement.textContent = score;
            if (score <= -0.35) {
                scoreElement.style.color = '#f00' // bearish - red
            } else if (-0.35 < score && score <= -0.15) {
                scoreElement.style.color = '#FFA500' // somewhat bearish - orange
            } else if (-0.15 < score && score < 0.15) {
                scoreElement.style.color = '#FFD700' // neutral - yellow
            } else if (0.15 <= score && score < 0.35) {
                scoreElement.style.color = '#ddff00' // somewhat bullish - yellow-green
            } else {
                scoreElement.style.color = '#00FF7F' // bullish - green
            }
            newsArticleElement.appendChild(scoreElement);
    
            const timeElement = document.createElement("p");
            timeElement.classList.add("time");
            const time = article.time_published;
            const month = time.slice(4, 6);
            const day = time.slice(6, 8);
            const year = time.slice(0, 4);
            const hour = time.slice(9, 11);
            const minute = time.slice(11, 13);
            timeElement.textContent = `${hour}:${minute}, ${month}/${day}/${year}`;
            // timeElement.textContent = `${month} ${day}, ${year}, ${hour}:${minute}`;
            newsArticleElement.appendChild(timeElement);
    
            const topicsElement = document.createElement("p");
            topicsElement.classList.add("topics");
            const topics = article.topics.map(item => item.topic)
            topicsElement.textContent = topics.join(', ');
            newsArticleElement.appendChild(topicsElement);
    
            const urlElement = document.createElement("p");
            urlElement.innerHTML = `<a href="${article.url}" target="_blank">Read More</a>`;
            newsArticleElement.appendChild(urlElement);
    
            container.appendChild(newsArticleElement);
        });
    });
}
