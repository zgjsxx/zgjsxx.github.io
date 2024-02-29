const e=JSON.parse('{"key":"v-4ab9f3e6","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture4-twos-complement-arithmetic-instructions.html","title":"第四讲：算术运算和简单函数","lang":"zh-CN","frontmatter":{"description":"category: 汇编语言 第四讲：算术运算和简单函数 今天我们将介绍： 负值的二进制表示。 多字节数字的内存表示。 专用寄存器 rip、rflags 和其他一些寄存器。 算术指令add、sub、inc、dec。 算术指令对对标志寄存器 rflags 的影响。 我们将简要了解无符号乘法/除法/模指令 mul 和 div。 函数指令call和ret","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture4-twos-complement-arithmetic-instructions.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第四讲：算术运算和简单函数"}],["meta",{"property":"og:description","content":"category: 汇编语言 第四讲：算术运算和简单函数 今天我们将介绍： 负值的二进制表示。 多字节数字的内存表示。 专用寄存器 rip、rflags 和其他一些寄存器。 算术指令add、sub、inc、dec。 算术指令对对标志寄存器 rflags 的影响。 我们将简要了解无符号乘法/除法/模指令 mul 和 div。 函数指令call和ret"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-29T05:33:27.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-29T05:33:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第四讲：算术运算和简单函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-29T05:33:27.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"回顾","slug":"回顾","link":"#回顾","children":[{"level":3,"title":"寄存器","slug":"寄存器","link":"#寄存器","children":[]}]},{"level":2,"title":"负数","slug":"负数","link":"#负数","children":[{"level":3,"title":"数据尺寸的延展","slug":"数据尺寸的延展","link":"#数据尺寸的延展","children":[]},{"level":3,"title":"内存中的表示","slug":"内存中的表示","link":"#内存中的表示","children":[]}]},{"level":2,"title":"访问内存","slug":"访问内存","link":"#访问内存","children":[]},{"level":2,"title":"简单的循环","slug":"简单的循环","link":"#简单的循环","children":[]},{"level":2,"title":"包含文件","slug":"包含文件","link":"#包含文件","children":[]},{"level":2,"title":"算术运算","slug":"算术运算","link":"#算术运算","children":[]},{"level":2,"title":"简单的函数","slug":"简单的函数","link":"#简单的函数","children":[{"level":3,"title":"函数指针","slug":"函数指针","link":"#函数指针","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[]},{"level":2,"title":"附录","slug":"附录-1","link":"#附录-1","children":[]}],"git":{"createdTime":1709184807000,"updatedTime":1709184807000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":10.24,"words":3072},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture4-twos-complement-arithmetic-instructions.md","localizedDate":"2024年2月29日","excerpt":"<hr>\\n<p>category:</p>\\n<ul>\\n<li>汇编语言</li>\\n</ul>\\n<hr>\\n<h1> 第四讲：算术运算和简单函数</h1>\\n<p>今天我们将介绍：</p>\\n<ul>\\n<li>负值的二进制表示。</li>\\n<li>多字节数字的内存表示。</li>\\n<li>专用寄存器 <code>rip</code>、<code>rflags</code> 和其他一些寄存器。</li>\\n<li>算术指令<code>add</code>、<code>sub</code>、<code>inc</code>、<code>dec</code>。</li>\\n<li>算术指令对对标志寄存器 rflags 的影响。</li>\\n<li>我们将简要了解无符号乘法/除法/模指令 mul 和 div。</li>\\n<li>函数指令call和ret</li>\\n</ul>","autoDesc":true}');export{e as data};
