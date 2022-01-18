# Cargo - rust package manager

`cargo new` - To start a new package with Cargo

`cargo new --lib {libname}` - crete a lib package

# the module system

## package 

A package is one or more crates that provide a set of functionality.

## crete

a rust will make a crete, related functionality together in a scope so the functionality is easy to share between multiple projects. 

root file will aoto choose `src/main.rs` or `src/lib.rs`

## use

```rust
use std::collections::HashMap;
use std::collections::HashMap as NiceMap;

// combine use
use std::io;
use std::io::Write; 
use std::io::{self, Write};

// use by glob
use std::collections::*;

// separating into different files
// src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}
// src/lib.rs
use pub use crate::front_of_house::hosting;
```


## case

```rust
// crate
//  └── front_of_house
//      ├── hosting
//      │   ├── add_to_waitlist
//      │   └── seat_at_table
//      └── serving
//          ├── take_order
//          ├── serve_order
//          └── take_payment

mod front_of_house {
  pub mod hosting {
      pub fn add_to_waitlist() {}

      fn seat_at_table() {}
  }

  mod serving {
      fn take_order() {}

      fn server_order() {}

      fn take_payment() {}

  }
}

use front_of_house::hosting; // use `use` to bring an item into scope with use and a relative path.

fn serve_order() {}

mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }

    fn cook_order() {}
    pub struct Breakfast {
      pub toast: String,
      seasonal_fruit: String,
  }

  impl Breakfast {
      pub fn summer(toast: &str) -> Breakfast {
          Breakfast {
              toast: String::from(toast),
              seasonal_fruit: String::from("peaches"),
          }
      }
  }
}

pub fn eat_at_restaurant() {
  hosting::add_to_waitlist();
  // Order a breakfast in the summer with Rye toast
  let mut meal = back_of_house::Breakfast::summer("Rye");
  // Change our mind about what bread we'd like
  meal.toast = String::from("Wheat");
  println!("I'd like {} toast please", meal.toast);

  let order1 = back_of_house::Appetizer::Soup;
  let order2 = back_of_house::Appetizer::Salad;
  // The next line won't compile if we uncomment it; we're not allowed
  // to see or modify the seasonal fruit that comes with the meal
  // meal.seasonal_fruit = String::from("blueberries");
}
```
