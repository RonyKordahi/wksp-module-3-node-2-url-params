# 3.2.0 - Review concepts

---

## EJS

- What's the difference between these two?

```js
<%- myVar %> //implements HTML
<%= myVar %> //as if it does .toString
```

_...Why do we have two options?_

---

What is this for?

```js
<%- include('<PATH_TO_EJS_FILE', {}) %>
```

_...What makes this so powerful?_

---

What notation do we use to run JS snippets inside of an `.ejs` file?

`const array = ['one', 'two', 'three']`

```js
// Example
<ul>
    <% array.forEach(element => { %>
        <li><%= element %></li>
    <% >}); %>
</ul>
```

---

## Express

- What express _routing method_ did we use yesterday?
- What are its parameters?
- What is the minimum amount of code to set up an express server?

```js
// Example
app.get(path, function(request, response) {});
--------------------------------------------------
//creating the server
const express = require('express');
const app = exress();
app.get("/hello", function(request, response) {
    response.send("hello");
});

app.listen(8000), console.log("Server is up! Port 8000");
```

---