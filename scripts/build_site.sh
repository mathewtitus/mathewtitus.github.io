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
  -c pages/cs/stan.md \
  -o pages/cs/stan.html

python3 scripts/build_blog.py \
  -t templates/research_template.html \
  -c pages/physics/peskin_schroeder/intro.md \
  -o pages/physics/peskin_schroeder/intro.html

python3 scripts/build_blog.py \
  -t templates/research_template.html \
  -c pages/physics/peskin_schroeder/iqft_ch2.md \
  -o pages/physics/peskin_schroeder/iqft_ch2.html

python3 scripts/build_blog.py \
  -t templates/blog_template.html \
  -c pages/h2o/wastewater.md \
  -o pages/h2o/wastewater.html


