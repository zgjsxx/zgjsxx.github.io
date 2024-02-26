const e=JSON.parse('{"key":"v-72ea2b30","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture1-introduction.html","title":"第一讲：计算机的组织架构和汇编语言","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第一讲：计算机的组织架构和汇编语言 汇编语言 汇编语言和C/C++语言的区别是什么？ 汇编语言是底层语言，更接近于CPU本身可以理解的内容。CPU可以理解的是纯粹的字节流(机器语言)。几乎不会有人愿意通过写原始的字节流进行编程。汇编语言处于机器语言的上层， 将CPU可以理解的操作码(Opcode)抽象成了人类可以理解的命令， 例如add,mov等等。这些名字被称之为助记符。 和C/C++语言相比，汇编语言的工具较少。没有所谓的\\"标准汇编语言库\\"。如果你想要写一个字符串处理的方法，你只能自己编写。 汇编语言不能移植到其他类型的CPU上(x86 vs ARM)或者其他类型的操作系统上(Windows vs Linux)， 甚至不能移植到其它类型的汇编语言(YASM vs MASM vs GAS)。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture1-introduction.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第一讲：计算机的组织架构和汇编语言"}],["meta",{"property":"og:description","content":"第一讲：计算机的组织架构和汇编语言 汇编语言 汇编语言和C/C++语言的区别是什么？ 汇编语言是底层语言，更接近于CPU本身可以理解的内容。CPU可以理解的是纯粹的字节流(机器语言)。几乎不会有人愿意通过写原始的字节流进行编程。汇编语言处于机器语言的上层， 将CPU可以理解的操作码(Opcode)抽象成了人类可以理解的命令， 例如add,mov等等。这些名字被称之为助记符。 和C/C++语言相比，汇编语言的工具较少。没有所谓的\\"标准汇编语言库\\"。如果你想要写一个字符串处理的方法，你只能自己编写。 汇编语言不能移植到其他类型的CPU上(x86 vs ARM)或者其他类型的操作系统上(Windows vs Linux)， 甚至不能移植到其它类型的汇编语言(YASM vs MASM vs GAS)。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-26T06:32:16.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-26T06:32:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第一讲：计算机的组织架构和汇编语言\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-26T06:32:16.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"汇编语言","slug":"汇编语言","link":"#汇编语言","children":[]},{"level":2,"title":"计算机组织架构","slug":"计算机组织架构","link":"#计算机组织架构","children":[]},{"level":2,"title":"数字电路","slug":"数字电路","link":"#数字电路","children":[]},{"level":2,"title":"术语回顾","slug":"术语回顾","link":"#术语回顾","children":[]},{"level":2,"title":"数制","slug":"数制","link":"#数制","children":[]},{"level":2,"title":"数字电路","slug":"数字电路-1","link":"#数字电路-1","children":[]},{"level":2,"title":"硬件电路","slug":"硬件电路","link":"#硬件电路","children":[]},{"level":2,"title":"逻辑电路的问题","slug":"逻辑电路的问题","link":"#逻辑电路的问题","children":[]},{"level":2,"title":"汇编语言的开始","slug":"汇编语言的开始","link":"#汇编语言的开始","children":[]},{"level":2,"title":"程序的节(sections)","slug":"程序的节-sections","link":"#程序的节-sections","children":[]},{"level":2,"title":"调用操作系统的系统调用","slug":"调用操作系统的系统调用","link":"#调用操作系统的系统调用","children":[]},{"level":2,"title":"列出文件(Listing files)","slug":"列出文件-listing-files","link":"#列出文件-listing-files","children":[]},{"level":2,"title":"汇编和链接","slug":"汇编和链接","link":"#汇编和链接","children":[]},{"level":2,"title":"调试汇编程序","slug":"调试汇编程序","link":"#调试汇编程序","children":[]},{"level":2,"title":"反汇编现有的程序","slug":"反汇编现有的程序","link":"#反汇编现有的程序","children":[]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[]}],"git":{"createdTime":1708596031000,"updatedTime":1708929136000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":6}]},"readingTime":{"minutes":28.7,"words":8610},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture1-introduction.md","localizedDate":"2024年2月22日","excerpt":"<h1> 第一讲：计算机的组织架构和汇编语言</h1>\\n<h2> 汇编语言</h2>\\n<p>汇编语言和C/C++语言的区别是什么？</p>\\n<ul>\\n<li>\\n<p>汇编语言是底层语言，更接近于CPU本身可以理解的内容。CPU可以理解的是纯粹的字节流(机器语言)。几乎不会有人愿意通过写原始的字节流进行编程。汇编语言处于机器语言的上层， 将CPU可以理解的操作码(Opcode)抽象成了人类可以理解的命令， 例如<strong>add</strong>,<strong>mov</strong>等等。这些名字被称之为<strong>助记符</strong>。</p>\\n</li>\\n<li>\\n<p>和C/C++语言相比，汇编语言的工具较少。没有所谓的\\"标准汇编语言库\\"。如果你想要写一个字符串处理的方法，你只能自己编写。</p>\\n</li>\\n<li>\\n<p>汇编语言不能移植到其他类型的CPU上(x86 vs ARM)或者其他类型的操作系统上(Windows vs Linux)， 甚至不能移植到其它类型的汇编语言(YASM vs MASM vs GAS)。</p>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
