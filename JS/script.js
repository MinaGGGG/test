let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let addCart = document.querySelectorAll(".addCart");
let CheckOut = document.querySelector('.checkOut');
let totalPriceHTML = document.querySelector('.total-price');
let btn = document.getElementById("Check Out");
const counter = document.getElementById("counter");
const totalPriceEl = document.getElementById("totalPrice")
let totalPrice = 0

let prodactListCartCounter = [];
for (let index = 0; index < addCart.length; index++) {
    prodactListCartCounter.push(0);
    ;
}

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

addCart.forEach(function (item) {

    item.addEventListener("click", (e) => {

        const index = [].slice.call(document.getElementsByClassName("addCart"), 0).findIndex(fnIndex => fnIndex == e.target);
        const ChartItems = [].slice.call(listCartHTML.getElementsByClassName("chartListItem"), 0)
        const item = addCart.item(index);
        const newData = `name : ${e.target.name}\nprice : $ ${item.attributes.getNamedItem("price").value}\nQuantity : ${++prodactListCartCounter[index]}`;


        if (ChartItems.find(el => el.id == `chart_${index}`)) {
            document.querySelector(`#chart_${index}`).getElementsByTagName("span")[0].innerText = newData;

        } else {

            const newChartIetm = document.createElement("div");
            newChartIetm.id = `chart_${index}`;
            newChartIetm.classList.add("chartListItem");
            const newChartItemParagraph = document.createElement("span");
            newChartItemParagraph.innerText = newData;


            let addBtn = document.createElement("button")
            addBtn.innerText = "+";
            addBtn.id = `btn_add_${index}`;
            addBtn.classList.add("add_btn")

            let removeBtn = document.createElement("button")
            removeBtn.id = `btn_remove_${index}`;
            removeBtn.classList.add("remove_btn")
            removeBtn.innerText = "-";


            newChartIetm.append(newChartItemParagraph);
            newChartIetm.appendChild(addBtn)
            newChartIetm.appendChild(removeBtn)

            listCartHTML.appendChild(newChartIetm)

            addBtn.addEventListener("click", () => {
                const newData = `name : ${e.target.name}\nprice : $ ${item.attributes.getNamedItem("price").value}\nQuantity : ${++prodactListCartCounter[index]}`;
                document.querySelector(`#chart_${index}`).getElementsByTagName("span")[0].innerText = newData;
                totalPrice += +(item.attributes.getNamedItem("price").value);
                counter.innerText = prodactListCartCounter.reduce((a, b) => a + b);
                totalPriceEl.innerText = totalPrice;

            })

            removeBtn.addEventListener("click", (remove_el) => {


                const newData = `name : ${e.target.name}\nprice : $ ${item.attributes.getNamedItem("price").value}\nQuantity : ${--prodactListCartCounter[index]}`;

                if (prodactListCartCounter[index] < 1) {
                    listCartHTML.removeChild(remove_el.target.parentElement);
                    prodactListCartCounter[index] = 0;
                } else document.querySelector(`#chart_${index}`).getElementsByTagName("span")[0].innerText = newData;

                counter.innerText = prodactListCartCounter.reduce((a, b) => a + b);
                totalPrice -= +(item.attributes.getNamedItem("price").value);
                totalPriceEl.innerText = totalPrice;

            })

        }

        totalPrice += +(item.attributes.getNamedItem("price").value);
        counter.innerText = prodactListCartCounter.reduce((a, b) => a + b);

        totalPriceEl.innerText = totalPrice;


    })
})

CheckOut.addEventListener('click', () => {
    totalPriceHTML.classList.toggle('hidden');
})
