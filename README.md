# flowchart

A plugin for drawing flowchart using [flowchart.js](http://flowchart.js.org/) in Markdown code block.

## Install

```shell
ipm install flowchart
```

## Usage

    ```flowchart
    st=>start: Start:>http://www.google.com[blank]
    e=>end:>http://www.google.com
    op1=>operation: My Operation
    sub1=>subroutine: My Subroutine
    cond=>condition: Yes
    or No?:>http://www.google.com
    io=>inputoutput: catch something...

    st->op1->cond
    cond(yes)->io->e
    cond(no)->sub1(right)->op1
    ```

It will be rendered as:

![](https://github.com/inkdropapp/inkdrop-flowchart/raw/master/docs/images/example-01.png)

## Changelog

### 1.0.3

- fix(export): arrows don't appear in exported documents (Thanks [James](https://forum.inkdrop.app/t/arrows-on-flowchart-dont-make-it-to-pdf/1498))

### 1.0.0

- feat(\*): Support Inkdrop v4

### 0.2.0

- feat(print): Scale flowchart up to 100% in width for printing (Thanks @zainul)

### 0.1.4

- Show user-friendly error message

### 0.1.3

- Use ranspiled js instead of ES6

### 0.1.2

- Remove unused menu

### 0.1.1

- Support Inkdrop v3.1.1

### 0.1.0 - First Release

- Every feature added
- Every bug fixed
