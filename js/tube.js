function formatYouTubeTime(postedDate) {
    const now = new Date();
    let date;

    if (postedDate === null || postedDate === undefined || postedDate.trim() === "") {
        return "Not defined"; // Handle missing or empty dates
    }

    if (typeof postedDate === 'number') { // Timestamp (seconds)
        date = new Date(postedDate * 1000); 
    } else if (typeof postedDate === 'string') {
        if (postedDate.includes('T')) { // ISO 8601
            date = new Date(postedDate);
        } else {
            // Attempt to parse other formats, but handle potential errors
            try {
                date = new Date(postedDate); 
            } catch (error) {
                console.error("Error parsing date string:", error, "Date string:", postedDate);
                return "Invalid date"; 
            }
        }
    } else {
        console.error("Invalid date format:", postedDate);
        return "Invalid date"; 
    }

    // ... (rest of the time calculation remains the same)
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} min ago`;
    } else if (hours < 24) {
        return `${hours} hrs ago`;
    } else if (days < 30) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}

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
    const noSearchMessage = document.getElementById('no-search-message');

    videoCardContainer.textContent = '';

    if (videos.length === 0) {
        noSearchMessage.classList.remove('hidden');
        videoCardContainer.classList.add('hidden');
        return;
    }

    noSearchMessage.classList.add('hidden');
    videoCardContainer.classList.remove('hidden');

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
                <div class="inline-flex items-center gap-2">
                <p class="text-sm text-[#171717B3]">
                ${video.others.views}
                </p>
                <p class="text-sm text-[#171717B3]">
                ・ ${formatYouTubeTime(video.others.posted_date)}
                </p>
                </div>
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

        button.addEventListener('click', async () => {
            const allButtons = document.querySelectorAll('button');

            allButtons.forEach(button => {
                button.classList.remove('bg-[#FF1F3D]', 'text-white', 'font-bold');
            });
            button.classList.add('bg-[#FF1F3D]', 'text-white', 'font-bold');
            await categoryWiseButton(category.category_id);
        })

        categoriesContainer.append(button);
    });
}

const categoryWiseButton = async (category_id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
        const data = await res.json();
        const videos = data.category;
        displayVideo(videos);
    } catch (error) {
        console.error('Error occurs', error);
    }
}

const handleSearch = async () => {
    const searchInput = document.getElementById('search-input');
    const videoTitle = searchInput.value;

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${videoTitle}`)
        const data = await res.json();
        const videos = data.videos
        console.log(videos);
        displayVideo(videos);
    } catch (error) {
        console.log('Error occurs', error);
    }
}

loadVideos();
loadButton();