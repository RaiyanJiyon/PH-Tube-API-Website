const loadButton = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        const data = await res.json();
        const categories = data.categories;
        categoriesButton(categories);
    } catch (error) {
        console.error("Error occurs", error)
    }
}

const categoriesButton = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList.add('btn');
        button.textContent = category.category;

        categoriesContainer.append(button);
    });
}

loadButton();