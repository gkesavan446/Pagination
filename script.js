"use strict";
const body = document.body;
const tableDiv = document.createElement("div");
tableDiv.classList.add("table-responsive");
body.append(tableDiv);

// Creating table function
function addItems(dataArray, page) {
  let table = document.createElement("table");
  table.classList.add("table", "table-bordered");
  table.innerHTML = `<thead>
   <tr>
     <th>S.no</th>
     <th>Name</th>
     <th>Email</th>
   </tr>
 </thead>
`;
  let tableBody = document.createElement("TBODY");
  tableBody.setAttribute("id", "t-body");
  table.append(tableBody);
  let start = page * 10 - 10;
  let end = page * 10;
  for (let i = start; i < end; i++) {
    let currentData = dataArray[i];
    let currentRow = document.createElement("TR");
    let data1 = document.createElement("TD");
    let data2 = document.createElement("TD");
    let data3 = document.createElement("TD");
    data1.innerText = `${currentData.id}`;
    data2.innerText = `${currentData.name}`;
    data3.innerText = `${currentData.email}`;
    currentRow.append(data1, data2, data3);
    tableBody.append(currentRow);
    table.append(tableBody);
    tableDiv.append(table);
  }
}
async function getjsonData() {
  let res = await fetch(
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );
  let data = await res.json();
  // showing first page as default;
  addItems(data, 1);
  let buttonBox = document.createElement("div");
  buttonBox.classList.add("buttons");
  buttonBox.setAttribute("id", "allButtons");

  //  To create page buttons
  function createButtons(name) {
    let ButtonName = name;
    ButtonName = document.createElement("button");
    ButtonName.setAttribute("id", `${name}`);
    ButtonName.setAttribute("name", "pageButtons");
    ButtonName.innerText = `${name}`;
    return ButtonName;
  }

  const pages = ["First", "Previous"];
  for (let i = 1; i <= 10; i++) pages.push(i);
  pages.push("Next");
  pages.push("Last");
  for (let buttons of pages) {
    buttons = createButtons(buttons);
    buttonBox.append(buttons);
  }
  body.append(buttonBox);
  // adding page click functionality
  const btngroup = document.getElementsByName("pageButtons");
  let currentPage = 1;
  for (let buttons of btngroup) {
    buttons.addEventListener("click", () => {
      // console.log(buttons.id);
      let temp = document.getElementById(currentPage.toString());
      console.log(temp);
      let pageNumber;
      tableDiv.innerHTML = ``;
      switch (buttons.id) {
        case "First":
          pageNumber = 1;
          currentPage = 1;
          break;
        case "Last":
          pageNumber = 10;
          currentPage = 10;
          break;
        case "Previous":
          if (currentPage > 1) {
            pageNumber = currentPage - 1;
            currentPage = currentPage - 1;
          } else {
            pageNumber = currentPage;
          }
          break;
        case "Next":
          if (currentPage < 10) {
            pageNumber = currentPage + 1;
            currentPage = currentPage + 1;
          } else {
            pageNumber = currentPage;
          }
          break;
        default:
          currentPage = parseInt(buttons.id);
          pageNumber = currentPage;
      }
      let finish = document.getElementById(pageNumber);
      temp.classList.remove("active");
      finish.classList.add("active");
      addItems(data, pageNumber);
    });
  }
}

getjsonData();
