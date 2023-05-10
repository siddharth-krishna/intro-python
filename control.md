# Control flow: if-else, loops

## If-else

If statement example:
```python
x = int(input("Enter a number:"))
if x % 2 == 0:
    print("Odd")
else:
    print("Even")
```

Anything that evaluates to `True` or `False` can be used as an if condition. Examples:
```python
print(3 > 8)
print(3 <= 8)
print(3 % 2 == 0)
print(3 in [1, 2, 3])
print(len([1, 4]) == 1)
```

Problem: make everything true:
```python
# change the values in this block so that all the numbers 1 to 6 are printed
number = 10
second_number = 10
first_array = []
second_array = [1,2,3]

if number > 15:
    print("1")
if first_array:
    print("2")
if len(second_array) == 2:
    print("3")
if len(first_array) + len(second_array) == 5:
    print("4")
if first_array and first_array[0] == 1:
    print("5")
if not second_number:
    print("6")
```

Problem: change the value of x in the first line to get this program to print `A`, then `B`, then `C`:
```python
x = 1
if x < 5:
    print('A')
elif x < 10:
    print('B')
else:
    print('C')
```

What is the difference between the following programs?
```python
x = 1
if x < 5:
    print('A')
elif x > 1:
    print('B')
```
```python
x = 1
if x < 5:
    print('A')
if x > 1:
    print('B')
```
```python
x = 1
if x < 5:
    print('A')
    if x > 1:
        print('B')
```

## Loops

Examples of for and while loops, and the break and continue commands:
```python
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break

for x in range(10):
    if x % 2 == 0:
        continue
    print(x)
```

Problem: write a program that adds up all the numbers from 1 to 100:
```python
# Your code goes here
```

Problem: loop and print (use both for and while):
```python
import random
numbers = [random.randint(1, 100) for _ in range(100)]
# Your code goes here
# Loop through and print out all even numbers from the numbers list in the same order they are received. Stop printing if you see any number greater than 66.
```

Here's an example of using a loop to create a list:
```python
new_planet = ''
planets = []
while new_planet.lower() != 'done':
    if new_planet:
        planets.append(new_planet)
    new_planet = input('Enter a new planet, or done if done')
print(planets)
```

Problem: write a program to play a number guessing game. This is what it should look like:
```
I'm thinking of a number between 1 and 100.
Enter your guess: 55
My number is greater than 55
Enter your guess: 70
My number is greater than 70
Enter your guess: 66
You guessed it! My number is 66.
```

[Problem](https://py.checkio.org/en/mission/conversion-from-camelcase/): convert a string from CamelCase (`MyFunctionName`) into the Python format, snake case (`my_function_name`).

[Problem](https://py.checkio.org/en/mission/conversion-into-camelcase/): convert a string from the Python format, snake case (`my_function_name`), into CamelCase (`MyFunctionName`).
