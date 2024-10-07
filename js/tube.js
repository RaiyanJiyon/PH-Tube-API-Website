const loadVideos = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await res.json();
        const videos = data.videos;
        displayVideo(videos);
    } catch (error) {
        console.log('Error occurs', error);
    }
}

const displayVideo = (videos) => {
    const videoCardContainer = document.getElementById('video-card-container');

    videos.forEach(video => {
        const videoCards = document.createElement('div');

        videoCards.classList.add('card');
        videoCards.innerHTML = `
        <div class="">
            <figure class="w-full rounded-lg">
            <img class="object-cover w-full h-48" src="${video.thumbnail}" alt="${video.thumbnail} image" />
            </figure>
        </div>
        <div class="card-body p-0 mt-5">
        <div class="flex justify-center gap-3">
            <!-- avatar -->
            <div class="w-1/5">
                <div class="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div class="avatar">
                        <div class="w-12">
                            <img class="w-full object-cover" src="${video.authors[0].profile_picture}" alt="${video.thumbnail} image" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- video title and description -->
            <div class="w-4/5 space-y-2">
                <h3 class="font-bold">
                    ${video.title}
                </h3>
                <p class="text-sm text-[#171717B3]">
                    ${video.authors[0].profile_name} 
                    <span>${video.authors[0].verified ? `<img src="assets/verified.png" alt="Verified badge" class="inline-block w-4 h-4" />` : ''}</span>
                </p>
                <p class="text-sm text-[#171717B3]">
                    ${video.others.views}
                </p>
            </div>
        </div>
        </div>
        `;

        videoCardContainer.append(videoCards);
    });
}

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

loadVideos();
loadButton();
