const express = require("express");
const shortid = require("shortid");

let users = [
  {
    id: "YY4cqEkka",
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane"
  },
  {
    id: "DcW92a1EAS",
    name: "John Doe",
    bio: "Race car driver"
  },
  {
    id: "zLP4sC3ibu",
    name: "Sarah Clarke",
    bio: "Love surfing, and traveling the world"
  }
];

const app = express();

// set up port to listen on
app.set("port", process.env.PORT || 3000);

// Parse incoming post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

// create new users
app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user."
    });
    return;
  }

  users = [...users, { id: shortid.generate(), name: name, bio: bio }];

  res.status(201).json(users);
});

// get all users
app.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved." });
    return;
  }
  res.status(200).json(users);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  if (!users) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved." });
    return;
  }

  const found = users.find(user => {
    return user.id === id;
  });

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
    return;
  }
  res.status(200).json(found);
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  let userChanges = {};
  let modifiedUser;

  if (!name && !bio) {
    res.status(400).json({
      message: "Please provide name or bio for the user."
    });
    return;
  }

  if (name) {
    userChanges.name = name;
  }

  if (bio) {
    userChanges.bio = bio;
  }

  if (!users) {
    res
      .status(500)
      .json({ message: "The user information could not be modified." });
    return;
  }

  const found = users.find(user => {
    return user.id === id;
  });

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
    return;
  }

  users = users.map(user => {
    if (user.id === id) {
      modifiedUser = { ...user, ...userChanges };
      return modifiedUser;
    }
    return user;
  });

  res.status(200).json(modifiedUser);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  if (!users) {
    res.status(500).json({ message: "The user could not be removed" });
    return;
  }

  const found = users.find(user => {
    return user.id === id;
  });

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
    return;
  }

  users = users.filter(user => {
    return user.id !== found.id;
  });

  res.status(200).json(found);
});

app.listen(app.get("port"), () => {
  console.log(`listening on port: ${app.get("port")}`);
});
