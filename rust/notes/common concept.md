# Common Programming Concepts 

## Variables and Mutability 

```rust
fn main() {
    const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3; // Constants
    let mut x = 5;
    let y = 7; // cannot assign twice to immutable variable

    {
        let x = x * 2; // shadowing
        println!("The value of x in the inner scope is: {}", x); // print 10
    }
    println!("The value of x is: {}", x); // print 5

    x = 6;
    println!("The value of x is: {}", x);
}
```

when mut is used. In some cases, you’ll want to make a variable mutable because it makes the code more convenient to write than if it had only immutable variables.

There are multiple trade-offs to consider in addition to the prevention of bugs. For example, in cases where you’re using large data structures, mutating an instance in place may be faster than copying and returning newly allocated instances. With smaller data structures, creating new instances and writing in a more functional programming style may be easier to think through, so lower performance might be a worthwhile penalty for gaining that clarity.

## Data Types

### basic
```rust
fn main() {
    // addition
    let sum = 5 + 10;

    // subtraction
    let difference = 95.5 - 4.3;

    // multiplication
    let product = 4 * 30;

    // division
    let quotient = 56.7 / 32.2;
    let floored = 2 / 3; // Results in 0

    // remainder
    let remainder = 43 % 5;

    let flag: bool = false;

    let c = 'z';
    let z = 'ℤ'; // Character Type
    let string: str = "Some content"; // string
}
```

### Compound Types
```rust
    // The Tuple Type
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup;

    println!("The value of y is: {}", y);
    println!("The value of z is: {}",  top.2);


    let a: [i32; 5] = [1, 2, 3, 4, 5]; // array , i32 is the type of each element. After the semicolon, the number 5 indicates the array contains five elements.

    println!("The value of array[2] is: {}", a[2]);
```

## Function

```rust
fn main() {
    print_labeled_measurement(5, 'h');

    let x = 5;
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of x, y is: {}{}", x, y);
    println!("The value is: {}", plus_one(3));
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    // function
    println!("The measurement is: {}{}", value, unit_label);
}

fn plus_one(x: i32) -> i32 {
    x + 1
}
```

## Control Flow

```rust
fn main() {
     let number = if condition { 5 } else { 6 };

    let mut count = 0;
    'counting_up: loop {
        println!("count = {}", count);
        let mut remaining = 10;

        loop {
            println!("remaining = {}", remaining);
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {}", count);

    let mut number = 3;

    while number != 0 {
        println!("{}!", number);

        number = number - 1;
    }

    let a = [10, 20, 30, 40, 50];

    for element in a.iter() {
        println!("the value is: {}", element);
    }

    for number in (1..4).rev() {
        println!("{}!", number);
    }
}
```
## Vector

Storing Lists of Values.

```rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3]; // with initial values

v.push(5);
v.push(6);
v.push(7);
v.push(8);

// get value
let third: &i32 = &v[2];
println!("The third element is {}", third);

match v.get(2) {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}

for i in &v {
    println!("{}", i);
}

for i in &mut v {
    *i += 50;
    println!("{}", i);
}

// vector with emun
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```
