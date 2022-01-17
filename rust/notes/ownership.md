# ownership

`Heap-data` copy will lost old one's ownership. It means old variables is not avaiable after copy.

`Stack-Only Data` copy alaways is clone. There are two data in memory.

`Functions` will cost ownership too.

# References and Borrowing


```rust
fn main() {
    let mut s = String::from("hello");

    calculate_length(&s) // Borrowing, don't cost ownership 
    change(&mut s); // pass a Mutable References
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.

# slice

String Literals Are Slices

```rust
let s = String::from("hello");

let len = s.len();

let slice1 = &s[3..len];  // 3 to all
let slice2 = &s[3..]; // 3 to all
let slice3 = &s[0..3]; // 0 to 3
let slice4 = &s[..3]; // 0 to 3

 let my_string_literal = "hello world";

  // `first_word` works on slices of string literals, whether partial or whole
  let word = first_word(&my_string_literal[0..6]);
  let word = first_word(&my_string_literal[..]);

  // Because string literals *are* string slices already,
  // this works too, without the slice syntax!
  let word = first_word(my_string_literal);

  // slice work with other type
  let a = [1, 2, 3, 4, 5];

  let slice = &a[1..3];

  assert_eq!(slice, &[2, 3]);
```