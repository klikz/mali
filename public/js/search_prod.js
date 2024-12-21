const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('text').toLocaleLowerCase();

let products
const wl_path = window.location.pathname
let lang = wl_path.split("/")
lang = lang.at(-2)
/**
 * Fetches product data from the products.json file and
 * calls the sortSearch function to filter and display the results.
 * 
 * @returns {Promise<void>}
 */
async function get_data() {
    try {
        // Fetch product data from the products.json file
        const response = await fetch("/files/products.json");
        const data = await response.json();

        if (data) {
            // Store the fetched data in the products variable
            products = data;
            // Call the sortSearch function to filter and display the results
            sortSearch();
        } else {
            console.error("No products data found");
        }
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error fetching products data:", error);
    }
}
get_data()

/**
 * Filters and displays products based on search parameters and language.
 */
function sortSearch() {
    // Filter products that have an image
    let filteredProducts = products.filter(product => product.img);

    // Clear current search list
    document.querySelector(".search__list").innerHTML = "";
    const searchList = document.querySelector(".search__list");

    // Filter products based on search parameter and language
    filteredProducts = filteredProducts.filter(product => {
        const searchTerm = myParam;
        const matchesType = product.type?.["ru"].toLocaleLowerCase().includes(searchTerm) ||
                            product.type?.["en"].toLocaleLowerCase().includes(searchTerm) ||
                            product.type?.["uz"].toLocaleLowerCase().includes(searchTerm);
        const matchesName = product.name?.["ru"].toLocaleLowerCase().includes(searchTerm) ||
                            product.name?.["en"].toLocaleLowerCase().includes(searchTerm) ||
                            product.name?.["uz"].toLocaleLowerCase().includes(searchTerm);
        return matchesType || matchesName;
    });

    // Update the count of found items
    document.getElementById("count").innerText = `Найдено ${filteredProducts.length} вариантов`;

    // Create and append product items to the search list
    filteredProducts.forEach(product => {
        const listItem = document.createElement("li");
        listItem.classList.add("search__item");

        // Determine weight and count display based on language
        const weightDisplay = product.count ? (
            lang === "en" ? product.weight.map(weight => `<h3>${weight} g / ${product.count} pcs</h3>`).join("") :
            lang === "uz" ? product.weight.map(weight => `<h3>${weight} g / ${product.count} dona</h3>`).join("") :
                            product.weight.map(weight => `<h3>${weight} г / ${product.count} шт</h3>`).join("")
        ) : product.weight.map(weight => `<h3>${weight} г</h3>`).join("");

        // Construct product detail link based on language
        const detailLink = wl_path.includes("/en") ? `detail/en?id=${product.id}` :
                           wl_path.includes("/uz") ? `detail/uz?id=${product.id}` :
                                                      `detail/ru?id=${product.id}`;

        // Set inner HTML for the product item
        listItem.innerHTML = `
            <a href="/${detailLink}" class="search__item-link">
                <div class="search__item-top">
                    <div class="search__item-zone">
                        <span class="active"></span>
                    </div>
                    <div class="search__item-img">
                        <img src="${"/img/products/" + product.img}" alt="${product?.name?.[lang]}" class="active">
                    </div>
                    <div class="search__item-pagination">
                        <span class="active"></span>
                    </div>
                </div>
                <div class="search__item-box">
                    <h3 class="search__item-title">${product?.type?.[lang] ? product?.type?.[lang] : ""} «${product?.name?.[lang]}»</h3>
                    <p class="search__item-text">${product.info[lang]}</p>
                    <div class="search__item-bottom">
                        ${weightDisplay}
                    </div>
                </div>
            </a>
        `;

        // Append the product item to the search list
        searchList.appendChild(listItem);
    });
}
