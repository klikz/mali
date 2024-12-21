const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('text').toLocaleLowerCase();

let products
const wl_path = window.location.pathname
let lang = wl_path.split("/")
lang = lang.at(-2)
// console.log("myParam: ", myParam)
async function get_data() {
    await fetch("/files/products.json").then(e => e.json().then(e=> products = e))
    sortSearch()
}
get_data()

function sortSearch() {
    let e = products.filter((e => e.img));
    document.querySelector(".search__list").innerHTML = "";
    const t = document.querySelector(".search__list");
    let listPro = e
    // listPro.forEach((item, id)=> console.log(
    //     myParam == item.type?.["ru"].toLocaleLowerCase(), 
    //     item.type?.["ru"].toLocaleLowerCase().includes(myParam),
    //     myParam,
    //     item.type?.["ru"].toLocaleLowerCase()
    // ))



    listPro = listPro.filter((list_1) => {
       if (list_1.type?.["ru"].toLocaleLowerCase().includes(myParam) || list_1.type?.["en"].toLocaleLowerCase().includes(myParam) || list_1.type?.["uz"].toLocaleLowerCase().includes(myParam) || list_1.name?.["ru"].toLocaleLowerCase().includes(myParam) || list_1.name?.["en"].toLocaleLowerCase().includes(myParam) || list_1.name?.["uz"].toLocaleLowerCase().includes(myParam)){
        
        return true
       }

    })

    document.getElementById("count").innerText  = `Найдено ${listPro.length} вариантов`

    listPro.forEach((e => {
        const s = document.createElement("li");
        let i, n;
        // console.log("count: ", e.count, " ", e.count ? "en" === lang : "false"),
        s.classList.add("search__item"),
            i = e.count ? "en" === lang ? e.weight.map((t => `
                <h3>${t} g / ${e.count} pcs</h3>`)).join("") 
                : "uz" === lang ? e.weight.map((t =>
                `<h3>${t} g / ${e.count} dona</h3>`)).join("") 
                : e.weight.map((t =>
                    `<h3>${t} г / ${e.count} шт</h3>`)).join("") 
                    : e.weight.map((e =>
                        `<h3>${e} г</h3>`)).join(""),
            n = wl_path.includes("/en") ? `detail/en?id=${e.id}` : wl_path.includes("/uz") ? `detail/uz?id=${e.id}` : `detail/ru?id=${e.id}`,
            
            s.innerHTML = `\n                  
                <a href="/${n}" class="search__item-link">\n                    
                <div class="search__item-top">\n                      
                <div class="search__item-zone">\n                        
                <span class="active"></span>\n                      
                </div>\n                      
                <div class="search__item-img">\n                        
                <img src="${"/img/products/" + e.img}" alt="${e?.name?.[lang]}" class="active">\n
                </div>\n                      
                <div class="search__item-pagination">\n                        
                <span class="active"></span>\n                      
                </div>\n                    
                </div>\n                    
                <div class="search__item-box">\n                      
                <h3 class="search__item-title">${e?.type?.[lang] ? e?.type?.[lang] : ""} «${e?.name?.[lang]}»</h3>\n                      
                <p class="search__item-text">${e.info[lang]}</p>\n                      
                <div class="search__item-bottom">\n                        
                ${i}\n                      
                </div>\n                    
                </div>\n                  
                </a>\n                `

        return t.appendChild(s)
    }
    ))
}