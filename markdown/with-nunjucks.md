---
layout: layouts/basic.njk
title: Nunjucks + markdown
templateEngine: njk,md
myData:
  one: un
  two: dous
  three: tres
---

# {{ title }}

Foo

{% for title, no in myData %}
* {{ title }}: [{{ no }}](/items/{{ no }}.html){% endfor %}
