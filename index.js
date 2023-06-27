sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

get_items = async (func, count = 1) => {
  return new Promise(async (resolve) => {
    loop_count = 0;
    items = []
    while (items.length < count && loop_count < 60) {
      console.log(`Found ${items.length} items, fetching more!`);
      items = func();
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(500);
    }
    resolve(items);
  });
}


main = async () => {
  clear();

  items = await get_items(() => document.querySelectorAll("i.icon-overflow_horizontal"), 200);
  console.log("Items found:", items.length);

  for (let i = 0; i < items.length; i++) {
    console.log("Deleting item number: ", i);
    items[i].click();
    await sleep(100);

    // list of all menuitems
    let d = document.querySelectorAll("span._2-cXnP74241WI7fpcpfPmg");
    clicked = false;
    d.forEach(option => {
      if (option.innerText === 'Delete') {
        console.log("\t\tClicking Delete option");
        option.click();
        clicked = true;
      }
    })
    if (!clicked) {
      console.log("\t\tThis item is not a post or comment!");
      continue;
    }
    await sleep(100);
    // delete button on the modal asking for confirmation
    d = document.querySelector("button._17UyTSs2atqnKg9dIq5ERg");
    await sleep(100);
    console.log("\t\tConfirming Delete");
    d.click();
    await sleep(100);
  }
  window.location.reload();
}
main();
