document.addEventListener('DOMContentLoaded', () => {
    const recipes = [
        {
            id: 'lentil-soup',
            title: 'Hearty Lentil Soup',
            image: 'assets/images/recipe-lentil-soup.jpg',
            description: 'A comforting and nutritious soup packed with plant-based protein and vegetables. Perfect for a quick meal.',
            ingredients: [
                '1 tbsp olive oil',
                '1 onion, chopped',
                '2 carrots, diced',
                '2 celery stalks, diced',
                '2 cloves garlic, minced',
                '1 cup brown or green lentils, rinsed',
                '6 cups vegetable broth',
                '1 (14.5 oz) can diced tomatoes, undrained',
                '1 tsp dried thyme',
                'Salt and black pepper to taste',
                'Fresh parsley, chopped (for garnish)'
            ],
            instructions: [
                'Heat olive oil in a large pot or Dutch oven over medium heat. Add onion, carrots, and celery; cook until softened, about 5-7 minutes.',
                'Stir in garlic and cook for another minute until fragrant.',
                'Add rinsed lentils, vegetable broth, diced tomatoes, and thyme to the pot. Bring to a boil, then reduce heat, cover, and simmer for 25-30 minutes, or until lentils are tender.',
                'Season with salt and pepper. Ladle into bowls and garnish with fresh parsley.',
                'Serve hot and enjoy!'
            ]
        },
        {
            id: 'tofu-scramble',
            title: 'Spicy Tofu Scramble',
            image: 'assets/images/recipe-tofu-scramble.jpg',
            description: 'A quick and flavorful plant-based alternative to scrambled eggs. Great for breakfast or brunch.',
            ingredients: [
                '1 tbsp olive oil',
                '1 block (14 oz) extra-firm tofu, pressed and crumbled',
                '1/2 onion, finely chopped',
                '1/2 bell pepper (any color), finely chopped',
                '2 cloves garlic, minced',
                '1/2 tsp turmeric powder (for color)',
                '1/2 tsp black salt (kala namak, for eggy flavor - optional)',
                '1/4 tsp cayenne pepper (or to taste)',
                'Salt and black pepper to taste',
                'Fresh cilantro, chopped (for garnish)'
            ],
            instructions: [
                'Heat olive oil in a non-stick skillet over medium heat. Add chopped onion and bell pepper; cook until softened, about 5 minutes.',
                'Stir in minced garlic and cook for 1 minute until fragrant.',
                'Add crumbled tofu to the skillet. Sprinkle with turmeric powder, black salt (if using), and cayenne pepper. Stir well to combine and coat the tofu.',
                'Cook for 8-10 minutes, stirring occasionally, until the tofu is heated through and slightly browned.',
                'Season with salt and black pepper. Garnish with fresh cilantro.',
                'Serve hot with toast, avocado, or your favorite breakfast sides.'
            ]
        },
        {
            id: 'black-bean-burgers',
            title: 'Homemade Black Bean Burgers',
            image: 'assets/images/recipe-black-bean-burger.jpg',
            description: 'Whip up delicious and satisfying black bean burgers from scratch. A healthier twist on a classic.',
            ingredients: [
                '1 (15 oz) can black beans, rinsed and drained',
                '1/2 cup cooked brown rice or quinoa',
                '1/4 cup breadcrumbs (gluten-free if needed)',
                '1/4 cup finely chopped onion',
                '2 tbsp finely chopped fresh cilantro',
                '1 clove garlic, minced',
                '1 tbsp soy sauce or tamari',
                '1 tsp cumin powder',
                '1/2 tsp smoked paprika',
                'Salt and pepper to taste',
                '1 tbsp olive oil (for cooking)'
            ],
            instructions: [
                'In a large bowl, mash the black beans with a fork until mostly crushed but still a bit chunky.',
                'Add cooked brown rice (or quinoa), breadcrumbs, onion, cilantro, minced garlic, soy sauce, cumin, and smoked paprika. Mix well until everything is combined and the mixture can be formed into patties.',
                'Season with salt and pepper to taste. Form the mixture into 4 patties.',
                'Heat olive oil in a non-stick skillet over medium heat. Cook the patties for 5-7 minutes per side, or until golden brown and heated through.',
                'Serve on buns with your favorite toppings like lettuce, tomato, onion, and vegan mayo.'
            ]
        },
        {
            id: 'chickpea-curry',
            title: 'Quick Chickpea Curry',
            image: 'assets/images/recipe-chickpea-curry.jpg',
            description: 'An aromatic and rich chickpea curry that\'s easy to make and bursting with Indian flavors.',
            ingredients: [
                '1 tbsp coconut oil',
                '1 onion, chopped',
                '2 cloves garlic, minced',
                '1 inch ginger, grated',
                '1 green chili, chopped (optional)',
                '1 tsp cumin powder',
                '1 tsp coriander powder',
                '1/2 tsp turmeric powder',
                '1/4 tsp cayenne pepper (or to taste)',
                '1 (14.5 oz) can diced tomatoes, undrained',
                '1 (13.5 oz) can full-fat coconut milk',
                '1 (15 oz) can chickpeas, rinsed and drained',
                'Fresh spinach, a handful (optional)',
                'Salt and pepper to taste',
                'Fresh cilantro, chopped (for garnish)',
                'Cooked rice or naan, for serving'
            ],
            instructions: [
                'Heat coconut oil in a large pot or Dutch oven over medium heat. Add chopped onion; cook until softened and translucent, about 5-7 minutes.',
                'Stir in minced garlic, grated ginger, and green chili (if using); cook for 1 minute until fragrant.',
                'Add cumin powder, coriander powder, turmeric powder, and cayenne pepper. Cook for 1 minute, stirring constantly, until fragrant.',
                'Pour in the diced tomatoes and coconut milk. Bring to a simmer, then add the rinsed chickpeas. Stir well.',
                'Reduce heat to low, cover, and simmer for 15-20 minutes, allowing the flavors to meld. If using, stir in fresh spinach until wilted.',
                'Season with salt and pepper. Garnish with fresh cilantro.',
                'Serve hot with cooked rice or warm naan bread.'
            ]
        }
    ];

    const recipesSection = document.getElementById('recipes');
    const detailedRecipeSection = document.getElementById('detailed-recipe');
    const recipeTitleElement = document.getElementById('recipe-title');
    const recipeImageElement = document.getElementById('recipe-image');
    const recipeIngredientsElement = document.getElementById('recipe-ingredients');
    const recipeInstructionsElement = document.getElementById('recipe-instructions');
    const backToRecipesButton = document.getElementById('back-to-recipes');

    function displayRecipes() {
        recipesSection.style.display = 'block';
        detailedRecipeSection.style.display = 'none';
    }

    function displayDetailedRecipe(recipeId) {
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        recipesSection.style.display = 'none';
        detailedRecipeSection.style.display = 'block';

        recipeTitleElement.textContent = recipe.title;
        recipeImageElement.src = recipe.image;
        recipeImageElement.alt = recipe.title;

        recipeIngredientsElement.innerHTML = '';
        recipe.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            recipeIngredientsElement.appendChild(li);
        });

        recipeInstructionsElement.innerHTML = '';
        recipe.instructions.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            recipeInstructionsElement.appendChild(li);
        });
    }

    // Attach event listeners to "View Recipe" buttons
    document.querySelectorAll('.recipe-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const card = event.target.closest('.recipe-card');
            if (card) {
                // Find recipe by title to get its ID
                const recipeTitle = card.querySelector('h3').textContent;
                const recipeId = recipes.find(r => r.title === recipeTitle).id;
                displayDetailedRecipe(recipeId);
            }
        });
    });

    backToRecipesButton.addEventListener('click', displayRecipes);

    // Initial display
    displayRecipes();
});
