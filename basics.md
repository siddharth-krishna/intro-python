# Basics: variables, assignment, lists

There are two ways to run Python programs. You can either type them out line by line in the python interpreter (by running just the `python` command) and see the result of each line, or you can save your program to a file like `test.py` and run the file using `python test.py`.

Because the second method only prints values if you call the `print` function, all examples here will use `print` so that they will work on both methods.

## Variables and assignments

Try the following program:
```python
x = 2
print(x)
x = x + 1
print(x)
```

Programs are executed line by line, so the order of lines is important. Does this program
```python
x = 2
x = x + 1
x = 4
print(x)
```
have the same output as this one?
```python
x = 2
x = 4
x = x + 1
print(x)
```

When you assign the value of one variable to another variable, does changing one affect the other?
```python
x = 8
y = x
x = x + 1
print(y)
```

What about here?
```python
x = 8
x = x + 1
y = x
print(y)
```

## Lists

If you want to store more than one value in a variable, you can use a list.

```python
l = [2, 4, 7]
print(l)
print(l[0])
print(l[2])
l[1] = 5
print(l)
```

Does assignment copy lists?
```python
l = [1, 2, 3]
m = l
l[2] = 4
print(m)
```

You can *slice* a list to get a section of it:
```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(l[0])
print(l[2:5])
print(l[4:])
print(l[:4])
print(l[-1])
print(l[2:-2])
print(l[2:15])
```

What does the `len` function return?
```python
print(len(l))
print(len([1, 4]))
print(len([]))
```
