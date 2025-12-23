document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.querySelector('.quiz-container');

    try {
        // Moved questions data to quiz.json
        let questions = []; // Will be populated from JSON

        let currentQuestionIndex = 0;
        let totalImpact = 0;

        const quizQuestionElement = document.getElementById('quiz-question');
        const quizOptionsElement = document.getElementById('quiz-options');
        const nextButton = document.getElementById('next-button');
        const quizResultsElement = document.getElementById('quiz-results');
        const resultsTextElement = document.getElementById('results-text');
        const progressBarFill = document.getElementById('progress-bar-fill');

        if (!quizQuestionElement || !quizOptionsElement || !nextButton || !quizResultsElement || !resultsTextElement || !progressBarFill) {
            throw new Error("Quiz elements not found in the DOM.");
        }

        function updateProgressBar() {
            const progress = (currentQuestionIndex / questions.length) * 100;
            progressBarFill.style.width = `${progress}%`;
        }

        function loadQuestion() {
            if (questions.length === 0) { // Check if questions are loaded yet
                quizQuestionElement.textContent = "Loading Questions...";
                return;
            }
            const currentQuestion = questions[currentQuestionIndex];
            quizQuestionElement.textContent = currentQuestion.question;
            quizOptionsElement.innerHTML = '';

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('quiz-option-button', 'cta-button');
                button.textContent = option.text;
                button.dataset.impact = option.impact;
                button.addEventListener('click', selectAnswer);
                quizOptionsElement.appendChild(button);
            });

            nextButton.style.display = 'none';
            updateProgressBar();
        }

        function selectAnswer(event) {
            document.querySelectorAll('.quiz-option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.target.classList.add('selected');
            nextButton.style.display = 'block';
        }

        nextButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.quiz-option-button.selected');
            if (selectedOption) {
                totalImpact += parseInt(selectedOption.dataset.impact);
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            } else {
                alert('Please select an answer!');
            }
        });

        function showResults() {
            quizOptionsElement.style.display = 'none';
            nextButton.style.display = 'none';
            quizQuestionElement.style.display = 'none';
            quizResultsElement.style.display = 'block';

            let resultMessage = "";
            if (totalImpact <= 5) {
                resultMessage = "Excellent! You have a very low food footprint. Keep up the great work in sustainable eating!";
            } else if (totalImpact <= 9) {
                resultMessage = "Good job! You have a moderate food footprint. Small changes can make an even bigger impact.";
            } else {
                resultMessage = "Your food footprint is on the higher side. Exploring more plant-based and alternative protein options can significantly reduce your environmental impact.";
            }
            resultsTextElement.textContent = resultMessage;
            progressBarFill.style.width = '100%';
        }

        // Fetch questions from JSON
        fetch('./quiz.json')
            .then(response => response.json())
            .then(data => {
                questions = data; // Assign fetched data to questions array
                loadQuestion(); // Load the first question once data is available
            })
            .catch(error => {
                console.error('Error fetching quiz questions:', error);
                quizContainer.innerHTML = `
                    <h2>Oops! Something went wrong.</h2>
                    <p>We couldn't load the quiz questions. Please try refreshing the page.</p>
                    <p style="font-size: 0.8em; color: #666;">Error: ${error.message}</p>
                `;
            });

    } catch (error) {
        console.error("An error occurred while initializing the quiz:", error);
        if (quizContainer) {
            quizContainer.innerHTML = `
                <h2>Oops! Something went wrong.</h2>
                <p>We couldn't load the quiz. Please try refreshing the page.</p>
                <p style="font-size: 0.8em; color: #666;">Error: ${error.message}</p>
            `;
        }
    }
});