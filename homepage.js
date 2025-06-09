const books = [
    {
        title: "صحيح البخاري",
        description: "أصح كتب الحديث النبوي الشريف",
        cover: "b1.jpg"
    },
    {
        title: "صحيح مسلم",
        description: "مجموعة شاملة من الأحاديث الصحيحة",
        cover: "b2.jpg"
    },
    {
        title: "رياض الصالحين",
        description: "كتاب جامع للأحاديث النبوية في الأخلاق والآداب",
        cover: "b3.jpg"
    }
    // Additional books will be cycled from these three
];

// Create and append book cards
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-description">${book.description}</p>
            <a href="#" class="read-more">اقرأ المزيد</a>
        </div>
    `;
    
    return card;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle scroll animations
function handleScrollAnimations() {
    document.querySelectorAll('.book-card:not(.visible)').forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

// Initialize the page
function init() {
    const booksGrid = document.querySelector('.books-grid');
    
    // Create 14 book cards
    for (let i = 0; i < 14; i++) {
        const book = books[i % books.length];
        const card = createBookCard(book);
        booksGrid.appendChild(card);
    }

    // Initial check for visible cards
    handleScrollAnimations();

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);