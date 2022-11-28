document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const titleOfNote = document.querySelector(`[id="${id}"]`).innerText;
    localStorage.setItem(id, titleOfNote);
    event.target.closest(
      "li"
    ).innerHTML = `<input type="text" id="${id}" name="newTitleOfNote" value="${titleOfNote}" required/>
                    <div class="buttons">
                        <button class="btn btn-primary" data-type="save" data-id="${id}">save</button>
                        <button class="btn btn-danger" type="reset" data-type="cancel" data-id="${id}" >cancel</button>
                    </div>`;
  }
  if (event.target.dataset.type === "save") {
    const id = event.target.dataset.id;
    const titleOfNote = document.querySelector(`[id="${id}"]`).value;
    edit(id, titleOfNote).then(() => {
      event.target.closest(
        "li"
      ).innerHTML = `<span id='${id}'>${titleOfNote}</span>
      <div class="buttons">
        <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit title</button>
        <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
      </div>`;
    });
  }
  if (event.target.dataset.type === "cancel") {
    const id = event.target.dataset.id;
    const titleOfNote = localStorage.getItem(id);
    event.target.closest(
      "li"
    ).innerHTML = `<span id='${id}'>${titleOfNote}</span>
    <div class="buttons">
      <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit title</button>
      <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
    </div>`;
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, data) {
  await fetch(`/${id}/${data}`, {
    method: "PUT",
  });
}
