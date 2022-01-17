# struct

```rust
struct User {
  username: String,
  email: String,
  sign_in_count: u64,
  active: bool,
}

fn build_user(email: String, username: String) -> User {
  User {
      email,
      username,
      active: true,
      sign_in_count: 1,
  }
}

fn main() {
  let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
  };

  user1.email = String::from("anotheremail@example.com");

  let user2 = User {
    email: String::from("another@example.com"),
    ..user1
  };

  let user3 = build_user(String::from("someone@example.com"), String::from("name3"));

  struct Color(i32, i32, i32); // Using Tuple Structs without Named Fields to Create Different Types
  struct Point(i32, i32, i32);

  let black = Color(0, 0, 0);
  let origin = Point(0, 0, 0);

  struct AlwaysEqual; // Unit-Like Structs Without Any Fields

  let subject = AlwaysEqual;
}
```

## Method Syntax

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle::square(10); 

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```
