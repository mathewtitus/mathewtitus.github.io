# build_blog.py
#
# Mathew Titus, Feb 2024
# Sunstrand Technical Consulting
# 
# 
# 
##################################################################

import sys
import argparse
import markdown as md

parse = argparse.ArgumentParser()
parse.add_argument("-t", "--template", dest="template", default=None)
parse.add_argument("-c", "--content", dest="content", default=None)
parse.add_argument("-o", "--destination", dest="destination", default=None)


def generate_html(filepath):
  """
  Creates an html string based on the .md content at `filepath`.
  """

  # load content
  with open(filepath, 'r') as f:
    markdown = f.read()

  # convert
  html = md.markdown(markdown)

  # parse
  html = html.replace("\n", "")

  return html;


if __name__=="__main__":
  args = parse.parse_args()
  print(f"Building {args.destination}")
  assert bool(args.template) & bool(args.content) & bool(args.destination), "Error: Need template, content, and destination."
  
  with open(args.template, 'r') as f:
    site_template = f.read()

  html = generate_html(args.content)

  code = site_template.replace("[BLOG CONTENT HERE]", html)

  with open(args.destination, 'w') as f:
    f.write(code)

