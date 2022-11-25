document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const data = prompt("Enter new title for note");
    console.log(data);
    if (data) {
      edit(id, data).then(() => {
        event.target.closest("li").innerHTML = `${data}
                    <div>
                        <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit title</button>
                        <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
                    </div>`;
      });
    }
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
