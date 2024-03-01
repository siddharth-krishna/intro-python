import json
from markdown2 import markdown
from os import path
import pyparsing as pp

# Newlines are significant
pp.ParserElement.set_default_whitespace_chars(' \t')

def parse_header(tokens):
    return (tokens[1], tokens[3])

def parse_code_block(tokens):
    [key, code] = tokens[0].split('\n', 1)
    # Some code blocks have special meaning:
    if key in ['defaultcode', 'unittests', 'expectedans']:
        return {key: code}
    return f'<pre>{code}</pre>'

def parse_body(tokens):
    res = {}
    body = []
    for t in tokens:
        if isinstance(t, dict):
            assert len(t) == 1
            res.update(t)
        else:
            body.append(str(t))
    return {"description": ''.join(body), **res}

def parse_problem(tokens):
    return {"id": tokens[0][0], "title": tokens[0][1], **tokens[1]}

empty_line = pp.line_end
line = ~pp.Literal("#") + pp.CharsNotIn("\n") + pp.line_end

header = ("# " + pp.Word(pp.alphanums) + ":" + pp.rest_of_line + pp.line_end).add_parse_action(parse_header)

code_block = pp.QuotedString("```", multiline=True, convert_whitespace_escapes=False).add_parse_action(parse_code_block)

body = pp.OneOrMore(pp.html_comment.suppress() | code_block | line | empty_line).add_parse_action(parse_body)

problem = (header + pp.line_end.suppress() + body).add_parse_action(parse_problem)

problemset = pp.OneOrMore(pp.html_comment.suppress() +  pp.ZeroOrMore(pp.line_end).suppress() | problem)

this_dir = path.dirname(path.realpath(__file__))
with open(path.join(this_dir, "problemset.md"), "r", encoding="utf-8") as input_file:
    text = input_file.read()

problems = problemset.parse_string(text, parse_all=True)
# print('\n'.join([x.__repr__() for x in problems]))

# Now convert to the required JSON format
for p in problems:
    # HACK: Remove the <p> tags around the title
    p['title'] = markdown(p['title'])[3:-5]
    p['description'] = markdown(p['description'])

with open(path.join(this_dir, 'dist', 'problemset.js'), 'w') as fout:
    fout.write('// This file was automatically generated by parse_problems.py.\n\n')
    fout.write('const problemset = [\n')
    for p in problems:
        fout.write('  ')
        json.dump(p, fout)
        fout.write(',\n')
    fout.write('];\n')
