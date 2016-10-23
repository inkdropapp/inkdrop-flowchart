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
