document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.querySelector('.quiz-container');

    try {
        const questions = [
            {
                question: "How many meat-based meals do you typically eat per week?",
                options: [
                    { text: "0-2 meals", impact: 1 },
                    { text: "3-5 meals", impact: 2 },
                    { text: "6-10 meals", impact: 3 },
                    { text: "10+ meals", impact: 4 }
                ]
            },
            {
                question: "When you eat meat, what type do you consume most often?",
                options: [
                    { text: "Poultry (chicken, turkey)", impact: 1 },
                    { text: "Pork", impact: 2 },
                    { text: "Beef/Lamb", impact: 3 },
                    { text: "Fish/Seafood", impact: 2 }
                ]
            },
            {
                question: "How often do you consider plant-based alternatives?",
                options: [
                    { text: "Frequently (most meals)", impact: 1 },
                    { text: "Sometimes (a few meals a week)", impact: 2 },
                    { text: "Rarely (once a month or less)", impact: 3 },
                    { text: "Never", impact: 4 }
                ]
            },
            {
                question: "What motivates your food choices the most?",
                options: [
                    { text: "Environmental impact", impact: 1 },
                    { text: "Health benefits", impact: 1 },
                    { text: "Taste and preference", impact: 3 },
                    { text: "Cost", impact: 2 }
                ]
            }
        ];

        let currentQuestionIndex = 0;
        let totalImpact = 0;

        const quizQuestionElement = document.getElementById('quiz-question');
        const quizOptionsElement = document.getElementById('quiz-options');
        const nextButton = document.getElementById('next-button');
        const quizResultsElement = document.getElementById('quiz-results');
        const resultsTextElement = document.getElementById('results-text');

        if (!quizQuestionElement || !quizOptionsElement || !nextButton || !quizResultsElement || !resultsTextElement) {
            throw new Error("Quiz elements not found in the DOM.");
        }

        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            quizQuestionElement.textContent = currentQuestion.question;
            quizOptionsElement.innerHTML = ''; // Clear previous options

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('quiz-option-button', 'cta-button');
                button.textContent = option.text;
                button.dataset.impact = option.impact;
                button.addEventListener('click', selectAnswer);
                quizOptionsElement.appendChild(button);
            });

            nextButton.style.display = 'none';
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
        }

        loadQuestion();

    } catch (error) {
        console.error("An error occurred while loading the quiz:", error);
        if (quizContainer) {
            quizContainer.innerHTML = `
                <h2>Oops! Something went wrong.</h2>
                <p>We couldn't load the quiz. Please try refreshing the page.</p>
                <p style="font-size: 0.8em; color: #666;">Error: ${error.message}</p>
            `;
        }
    }
});