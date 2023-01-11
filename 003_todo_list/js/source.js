// todo: make the delete button display even when list item is active

let count = 0;
document.getElementById('add').addEventListener('click', ()=>{
    if(document.getElementById('todo_item').value !== "")
    {
        count++;
        let new_todo = "" +
            "<div class='flex list list-active' id='list" + count + "'>" +
                "<div class='flex'>" +
                    "<div class='checkbox' id='checkbox" + count + "'>" +
                    "</div>" +
                    "<div class='flex todo_text'>" +
                        document.getElementById('todo_item').value +
                    "</div>" +
                "</div>" +
                "<div class='flex delete delete-inactive' id='del" + count + "'>🗑" +
                "</div>" +
            "</div>";
        document.getElementById('display').insertAdjacentHTML('beforeend', new_todo);
        document.getElementById('todo_item').value = "";

        let id = "list" + count;
        let del = "del" + count;
        let check = "checkbox" + count;
        document.getElementById(id).addEventListener('click',()=>{
            if(document.getElementById(id).classList.contains("list-active"))
            {
                document.getElementById(id).classList.replace("list-active", "list-inactive");
                document.getElementById(del).classList.replace("delete-inactive", "delete-active");
            }
            else if(document.getElementById(id).classList.contains("list-inactive"))
            {
                document.getElementById(id).classList.replace("list-inactive", "list-active");
                document.getElementById(del).classList.replace("delete-active", "delete-inactive");
            }
        });
        document.getElementById(del).addEventListener('click',()=>{
            document.getElementById(id).style.display = "none";
        });
        document.getElementById(del).addEventListener('mouseover',()=>{
            document.getElementById(check).classList.remove("checkbox");
            document.getElementById(check).classList.add("check-del");

        });
        document.getElementById(del).addEventListener('mouseout',()=>{
            document.getElementById(check).classList.remove("check-del");
            document.getElementById(check).classList.add("checkbox");
        });
    }
});