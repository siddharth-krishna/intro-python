<!-- The PyDojo Problemset

Each problem must have either:
  - id, title, description, defaultcode, unittests
  - OR TODO id, title, description, expectedans

The H1 contains `id: title`. Description is anything following the H1, except
for code blocks in the language `defaultcode`, `unittests`, or `expectedans`

-->

<!-- Basic functions: -->

# Plus2: Add two to a number

The code below defines a function `plus_two(n)` that is supposed to take an input number `n`, and return an output number that is `n` plus two. However, the code given below is wrong: if you call `plus_two(4)`, for example, it returns the correct answer `6`, but `plus_two(5)` should return `7` and this code returns `6`. Can you fix it?

```defaultcode
def plus_two(n):
    return 6  # Change this line!

print(plus_two(4))  # Expected: 6
print(plus_two(5))  # Expected: 7
```

```unittests
tests = [(n, n + 2) for n in [-25,0,10,15,100,98765]]
for n, ans in tests:
    assert ans == plus_two(n), f'plus_two({n}) should be {ans} but was {plus_two(n)}'
```

# Dbl: Double a number

The last problem asked you to add two to the input number. Now, write a function `double(n)` that takes an input number `n`, and returns an output number that is two times `n`:

```defaultcode
def double(n):
    return 8

print(double(4))  # Expected: 8
print(double(5))  # Expected: 10
```

```unittests
tests = [(n, 2 * n) for n in [-25,0,10,15,100,98765]]
for n, ans in tests:
    assert ans == double(n), f'double({n}) should be {ans} but was {double(n)}'
```

<!-- Lists: -->

<!-- 
Indexing
slicing
length

-->

<!-- Loops: -->

# SumN: Sum from `1` to `n`

Write a function `sum_to(n)` that adds up all the numbers from `1` up to `n`. If you call `sum_to(10)`, for example, it should return `55`.

```defaultcode
def sum_to(n):
    # Your code goes here

print(sum_to(10))  # Expected: 55
```

```unittests
tests = [(n, sum(range(n+1))) for n in [0,10,15,100,98765]]
for n, ans in tests:
    assert ans == sum_to(n), f'sum_to({n}) should be {ans} but was {sum_to(n)}'
```

# SumEven: Sum even numbers

Write a function `sum_evens(n)` that adds up all the <i>even</i> numbers from `1` up to `n`. If you call `sum_evens(10)`, for example, it should return `2+4+6+8+10=30`.

```defaultcode
def sum_evens(n):
    # Your code goes here

print(sum_evens(10))  # Expected: 30
```

```unittests
tests = [(n, sum(range(0,n+1,2))) for n in [0,10,15,100,98765]]
for n, ans in tests:
    assert ans == sum_evens(n), f'sum_evens({n}) should be {ans} but was {sum_evens(n)}'
```

<!--
TODO allow problems with text answers: e.g. how many times will this program print 4? What will be the output of this program? (Multiline ans)

imperative: execution is line-by-line
x = 3
x = 2
print(x)
x = 2
x = 3
y = x
print(y)

functions that return vs that do

indentation: inside vs outside function
def foo():
    print(3)
    print(4)
    return
print(5)
foo()
foo()

indentation: inside vs outside loop
indentation: inside vs outside if

Look through all stdlib list and string functions and make problems with them
-->