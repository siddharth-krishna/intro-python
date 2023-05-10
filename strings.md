# Strings and user input

Strings are a bit like lists:
```python
x = "hello"
print(x)
print(x[3])
print(x[1:3])
print(x + ' there')
```

But you cannot modify a list, you have to copy it:
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

More information on strings:
https://docs.python.org/3/library/stdtypes.html#str

Some problems:

https://py.checkio.org/en/mission/acceptable-password-i/

https://py.checkio.org/en/mission/backward-string/

https://cs50.harvard.edu/python/2022/psets/0/faces/

https://py.checkio.org/en/mission/first-word-simplified/

https://py.checkio.org/en/mission/three-words/

https://cs50.harvard.edu/python/2022/psets/0/tip/

