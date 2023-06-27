sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

get_main_items = () => {
  items = document.evaluate(
    "/html/body/div[1]/div/div[2]/div[2]/div/div/div/div[2]/div[3]/div[1]/div[3]/div[1]/div",
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );
  item_list = []
  item = items.iterateNext();
  while (item) {
    item_list.push(item)
    item = items.iterateNext();
  }
  return item_list;
}

get_items = (pattern, count = 1) => {
  return new Promise(async (resolve) => {
    loop_count = 0;
    myitems = document.querySelectorAll(pattern);
    while (myitems.length < count && loop_count < 60) {
      console.log(`Found ${items.length} items, fetching more!`);
      myitems = document.querySelectorAll(pattern);
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(500);
      loop_count += 1;
    }
    resolve(myitems);
  });
}

delete_item = (currentItem) => {
  return new Promise(async (resolve) => {

    console.log("Deleting item: ", i, currentItem);

    const menubutton = currentItem.querySelector("i.icon-overflow_horizontal");
    console.log("menubutton", menubutton)
    if (menubutton === null) {
      resolve();
    }

    menubutton.click();
    await sleep(100);
    // list of all menuitems
    const menuoptions = await get_items("span._2-cXnP74241WI7fpcpfPmg");
    clicked = false;
    menuoptions.forEach(option => {
      if (option.innerText === 'Delete') {
        console.log("\t\tClicking Delete option");
        option.click();
        clicked = true;
      }
    })
    if (!clicked) {
      console.log("\t\tThis item is not a post or comment!");
      resolve();
    }
    await sleep(100);
    // delete button on the modal asking for confirmation
    confirmdelete = document.querySelector("button._17UyTSs2atqnKg9dIq5ERg");
    console.log("\t\tConfirming Delete");
    confirmdelete.click();
    await sleep(100);
    currentItem.style.border = '1px solid red';
    currentItem.style.display = 'none';
    resolve();
  })
}
main = async () => {
  clear();
  items = get_main_items();
  console.log("Items found:", items.length);
  console.log(items)

  for (i = 0; i < items.length; i++) {
    await delete_item(items[i]);
    await sleep(100);
  }
  items = get_main_items();
  if (items.length > 0){
    main();
  }
  //window.location.reload();
}
main();
