document.addEventListener('DOMContentLoaded', () => {
    // Moved recipes data to recipes.json
    let recipes = []; // Will be populated from JSON

    const recipesSection = document.getElementById('recipes');
    const recipeModal = document.getElementById('recipe-modal');
    const modalRecipeTitleElement = document.getElementById('modal-recipe-title');
    const modalRecipeImageElement = document.getElementById('modal-recipe-image');
    const modalRecipeIngredientsElement = document.getElementById('modal-recipe-ingredients');
    const modalRecipeInstructionsElement = document.getElementById('modal-recipe-instructions');
    const closeButton = recipeModal.querySelector('.close-button');

    function openModal() {
        recipeModal.style.display = 'block';
        document.body.classList.add('modal-open'); // To prevent background scrolling
    }

    function closeModal() {
        recipeModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    function displayDetailedRecipe(recipeId) {
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        modalRecipeTitleElement.textContent = recipe.title;
        modalRecipeImageElement.src = recipe.image;
        modalRecipeImageElement.alt = recipe.title;

        modalRecipeIngredientsElement.innerHTML = '';
        recipe.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalRecipeIngredientsElement.appendChild(li);
        });

        modalRecipeInstructionsElement.innerHTML = '';
        recipe.instructions.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalRecipeInstructionsElement.appendChild(li);
        });

        openModal();
    }

    function renderRecipeCards() {
        const innovatorsGrid = recipesSection.querySelector('.innovators-grid');
        innovatorsGrid.innerHTML = ''; // Clear existing cards
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('innovator-card', 'recipe-card');
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" class="innovator-img">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <a href="#" class="cta-button recipe-button" data-recipe-id="${recipe.id}">View Recipe</a>
            `;
            innovatorsGrid.appendChild(card);
        });

        // Re-attach event listeners after rendering new cards
        document.querySelectorAll('.recipe-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const recipeId = event.target.dataset.recipeId;
                displayDetailedRecipe(recipeId);
            });
        });
    }

    // Fetch recipes from JSON
    fetch('./recipes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data; // Assign fetched data to recipes array
            renderRecipeCards(); // Render cards once data is loaded
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            recipesSection.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
        });

    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === recipeModal) {
            closeModal();
        }
    });

    // Initial display is handled after fetching data
});
