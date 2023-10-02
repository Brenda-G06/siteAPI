document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'fe5a768c5f00450b95f5e9206e29e980';
  const searchButton = document.getElementById('search-button');
  const recipeInput = document.getElementById('search-bar');
  const recipeDetails = document.getElementById('recipeDetails');
  const showDetailsButton = document.getElementById('showDetailsButton');
  const nutritionalInfo = document.getElementById('nutritionalInfo');
  const nutritionalList = document.getElementById('nutritionalList');
  
  let selectedRecipe = null;
  let detailsVisible = false;

  searchButton.addEventListener('click', () => {
      const query = recipeInput.value.trim();
      if (query === '') {
          alert('Please enter the name of the recipe.');
          return;
      }

     
      fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
          .then(response => response.json())
          .then(data => {
             
              if (data.results && data.results.length > 0) {
                  const firstRecipe = data.results[0]; 

                
                  recipeDetails.innerHTML = `
                      <h2>${firstRecipe.title}</h2>
                      <img src="${firstRecipe.image}" alt="${firstRecipe.title}" />
                  `;

                  selectedRecipe = firstRecipe;

                  showDetailsButton.style.display = 'block';
              } else {
                  recipeDetails.innerHTML = 'No recipes found.';
                  showDetailsButton.style.display = 'none';
              }
          })
          .catch(error => {
              console.error('Error when searching for recipes:', error);
              recipeDetails.innerHTML = 'Error when searching for recipes.';
              showDetailsButton.style.display = 'none';
          });
  });

  

  showDetailsButton.addEventListener('click', () => {
      if (selectedRecipe) {
          if (!detailsVisible) {
          
              fetch(`https://api.spoonacular.com/recipes/${selectedRecipe.id}/information?apiKey=${apiKey}`)
                  .then(response => response.json())
                  .then(data => {
           
                      recipeDetails.innerHTML = `
                      <div class="recipe-details-container">
                      <div class="recipe-details-header">
                          <h2>${selectedRecipe.title}</h2>
                          <img src="${selectedRecipe.image}" alt="${selectedRecipe.title}" />
                          </div>
                          <h3>Ingredients</h3>
                          <ul id="ingredientList">
                              ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                          </ul>
                          <h3>Preparation method</h3>
                         <ul id="instructions-text">${data.instructions || 'Instruções não disponíveis.'}</ul>
                         </div>
                      `;
                      

              
                      showDetailsButton.textContent = 'Hide Details';
                      detailsVisible = true;
                  })
                  .catch(error => {
                      console.error('Error fetching recipe details:', error);
                      recipeDetails.innerHTML = 'Error fetching recipe details:';
                  });
          } else {
              
              recipeDetails.innerHTML = '';
              showDetailsButton.textContent = 'Show Details';
              detailsVisible = false;
          }
      }
  });
});








document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-bar');
    const suggestionsList = document.getElementById('suggestions');
  
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value; 
  
  
      if (query.trim() !== '') {
  
        fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=584a37d0ea104db79189f851125c4cf2&query=${query}`)
     
          .then(response => response.json())
          .then(data => {
  
            suggestionsList.innerHTML = '';
  
            data.forEach(item => { 
              const listItem = document.createElement('li'); 
              listItem.textContent = item.name; 
  
    
                listItem.addEventListener('click', () => {
                    searchInput.value = item.name;
    
    
                    suggestionsList.innerHTML = ''; 
                });
    
                suggestionsList.appendChild(listItem);
                });
            })
            .catch(error => console.error(error));
        } else {
    
            suggestionsList.innerHTML = '';
        }
        });
    });
    
    
    
