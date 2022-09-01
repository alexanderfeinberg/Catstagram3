export const createCommentSection = () => {
    const container = document.querySelector(".container");

    const commentForm = createCommentForm();
    const commentsList = createCommentsList();

    container.appendChild(commentForm);
    container.appendChild(commentsList);
    const commentStorageItem = localStorage.getItem("comment")
    if(commentStorageItem) {
        const commentArray = commentStorageItem.split(";")
        commentArray.forEach(comment => {
            createComment(comment)
        })
    } 
};

const createCommentsList = () => {
    // Create comments section
    const comments = document.createElement("div");
    comments.className = "comments";
    comments.style.border = "solid grey 1px";
    comments.style.height = "400px";
    comments.style.width = "80%";
    comments.style.margin = "10px";
    comments.style.padding = "5px";
    comments.style.overflow = "scroll";


    return comments;
};

const createCommentForm = () => {
    // Create form
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    commentForm.style.margin = "20px";
    commentForm.style.display = "flex";
    commentForm.style.width = "100%";
    commentForm.style.justifyContent = "center";
    commentForm.style.alignItems = "center";

    commentForm.appendChild(createCommentInput());
    commentForm.appendChild(createCommentSubmitBtn());

    return commentForm;
};

const createCommentInput = () => {
    // Create comment input
    const userCommentContainer = document.createElement("div");
    userCommentContainer.className = "user-comment-container";
    userCommentContainer.style.marginRight = "10px";

    const label = document.createElement("label");
    label.setAttribute("for", "user-comment");
    label.innerText = "Comment: ";

    const commentInput = document.createElement("input");
    commentInput.id = "user-comment";
    commentInput.name = "user-comment";
    commentInput.placeholder = "Add a comment... ";
    commentInput.required = true;

    userCommentContainer.appendChild(label);
    userCommentContainer.appendChild(commentInput);

    return userCommentContainer;
};

const createCommentSubmitBtn = () => {
    // Create submit button
    const submitBtn = document.createElement("input");
    submitBtn.id = "submit-comment"
    submitBtn.type = "submit";
    submitBtn.value = "Submit";

    submitBtn.addEventListener('click', submitComment);

    return submitBtn;
};

const submitComment = e => {
    e.preventDefault();
    const commentInput = document.querySelector('#user-comment');
    const commentText = commentInput.value;
    createComment(commentText);
    commentInput.value = "";
}

const createComment = (commentText) => {
    const newCommentContainer = document.createElement('div');
    newCommentContainer.style.display = "flex";
    newCommentContainer.style.margin = "10px";

    const newComment = document.createElement("p");
    newComment.innerText = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.style.marginLeft = "15px";
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', e => {
        // Remove comment from HTML DOM
        newCommentContainer.remove();
        let comments = localStorage.getItem("comment").split(";")
        comments.find((comment, i )=> {
            // console.log("comment", comment)
            // console.log("new comment", newComment.innerText)
            if(comment === newComment.innerText) {
                comments.splice(i, 1)
                console.log(comment)
                commentStorage(comments)
            }
        })
    });

    newCommentContainer.appendChild(newComment);
    newCommentContainer.appendChild(deleteButton);
    const comments = document.querySelector(".comments");
    comments.appendChild(newCommentContainer);

    const getComment = document.querySelectorAll("div > p");

    commentStorage(getComment);
    
    
};


const commentStorage = (getComment) => {
    console.log(getComment)
    const textArray = []
    getComment.forEach(comment => {
        if(typeof comment === "string"){
            textArray.push(comment)
        } else {
            textArray.push(comment.innerText)
        }
    })
    localStorage.setItem("comment", textArray.join(";"))
}
export const resetComments = () => {
    const comments = document.querySelector(".comments");
    Array.from(comments.children).forEach(child => child.remove());
};