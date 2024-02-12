#!/bin/bash

cd /Users/mtitus/Documents/GitHub/mathewtitus.github.io/
python3 scripts/build_blog.py \
  -t templates/blog_template.html \
  -c pages/stats/voles.md \
  -o pages/stats/voles.html

python3 scripts/build_blog.py \
  -t templates/blog_template.html \
  -c pages/stats/ttest.md \
  -o pages/stats/ttest.html

python3 scripts/build_blog.py \
  -t templates/blog_template.html \
  -c pages/stats/stan.md \
  -o pages/stats/stan.html
