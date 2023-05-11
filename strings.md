# Strings and user input

Strings are a bit like lists:
```python
x = "hello"
print(x)
print(x[3])
print(x[1:3])
print(x + ' there')
print(len(x))
for c in x:
    print(c)
```

But you cannot modify a string like you modify a list, you have to copy it:
```python
x = "hello"
x[3] = 'p'
y = x[:3] + 'p' + x[4:]
print(y)
```

The `input` function gets input from the user as a string:
```python
# Ask the user for their name
name = input("What's your name? ")
print("Hello, " + name)
```

f-strings are very convenient:
```python
# Ask the user for their name
name = input("What's your name? ")
print(f"Hello, {name}")
```

## Problems

- Write a program that prints each letter of a string and its index

- Write a program that computes the length of a string (without using the `len` function, of course)

- Write a program to ask the user for their full name and converts it into an email address. For example:
    ```
    Enter your full name: Boaty McBoatface
    Your email is boaty.mcboatface@takenolab.com
    ```

- Write a program that counts the number of words in a string. For example:
    ```
    Enter a string: The quick brown fox
    The string has 4 words in it
    ```

- Write a program that checks if a string is a number. For example:
    ```
    Enter a string: 1234
    The string is a number
    Enter a string: 1234e
    The string is not a number
    Enter a string: f42kl
    The string is not a number
    ```

- Write a program that checks if a string is in snake case. For example:
    ```
    Enter a string: a_python_variable
    The string is in snake case
    Enter a string: aPythonVariable
    The string is not in snake case
    Enter a string: aPython_variable
    The string is not in snake case
    ```

- Write a program that checks if a string is in camel case. For example:
    ```
    Enter a string: a_python_variable
    The string is not in camel case
    Enter a string: aPythonVariable
    The string is in camel case
    Enter a string: aPython_variable
    The string is not in camel case
    ```

- Write a program that converts a string from snake case to camel case, and another program that converts a string from camel case to snake case.

Once you have completed the problems above, look at the Python documentation to see the inbuilt string functions:
https://docs.python.org/3/library/stdtypes.html#str
- Can you simplify your answers to the above problems using the inbuilt functions?

### Some more problems:

https://py.checkio.org/en/mission/acceptable-password-i/ (and then do parts II, III, etc)

https://py.checkio.org/en/mission/backward-string/

https://cs50.harvard.edu/python/2022/psets/0/faces/

https://py.checkio.org/en/mission/first-word-simplified/

https://py.checkio.org/en/mission/three-words/

https://cs50.harvard.edu/python/2022/psets/0/tip/

