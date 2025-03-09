<template>
    <header class="header">
        <div class="container">
            <form class="search-form">
                <input type="search" class="search-input" placeholder="Search..." aria-label="Search">
            </form>

        </div>
    </header>
</template>

<style scoped>
/* Header */
.header {
    padding: 12px 20px;
    background: #fff;
    border-bottom: 1px solid #ddd;
}

/* Flex container */
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

/* Search Form */
.search-form {
    width: 100%;
    max-width: 500px; /* Σταθερό μέγεθος για να φαίνεται σωστά παντού */
}

/* Search Input */
.search-input {
    width: 100%;
    padding: 12px 16px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 25px;
    outline: none;
    transition: 0.3s ease-in-out;
}

/* Hover & Focus */
.search-input:hover,
.search-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

/* Avatar */
.user-avatar {
    margin-left: 15px;
    display: flex;
    align-items: center;
}

.user-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #ddd;
    transition: 0.3s ease-in-out;
}

.user-avatar img:hover {
    border-color: #007bff;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        justify-content: space-between; /* Διατηρεί τη στοίχιση σε μικρές οθόνες */
    }

    .search-form {
        max-width: 400px; /* Ελαφρώς μικρότερο σε tablets */
    }
}

@media (max-width: 480px) {
    .container {
        flex-direction: row;
        justify-content: space-between;
    }

    .search-form {
        max-width: 300px; /* Ακόμα πιο μικρό σε κινητά */
    }
}
</style>
