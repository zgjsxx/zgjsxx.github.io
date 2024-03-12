const e=JSON.parse('{"key":"v-91dbc0bc","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture16-c-compatibles-structures-alignment-packing.html","title":"第十六讲： 结构体和结构体对齐；信号","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第十六讲： 结构体和结构体对齐；信号 C/C++结构体(struct)实际上只不过是按照一定的排列方式存储在内存中的多个数据。如果我们想要与使用结构体的C/C++程序进行交互，我们需要了解如何在汇编语言中构造出等效的内容。 一个简单的结构体的例子如下所示： struct thing { double a; // 8 bytes char b; // 1 byte int c; // 4 bytes char* d; // 8 bytes };","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture16-c-compatibles-structures-alignment-packing.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第十六讲： 结构体和结构体对齐；信号"}],["meta",{"property":"og:description","content":"第十六讲： 结构体和结构体对齐；信号 C/C++结构体(struct)实际上只不过是按照一定的排列方式存储在内存中的多个数据。如果我们想要与使用结构体的C/C++程序进行交互，我们需要了解如何在汇编语言中构造出等效的内容。 一个简单的结构体的例子如下所示： struct thing { double a; // 8 bytes char b; // 1 byte int c; // 4 bytes char* d; // 8 bytes };"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-12T06:36:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-12T06:36:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第十六讲： 结构体和结构体对齐；信号\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-12T06:36:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"汇编语言中的结构","slug":"汇编语言中的结构","link":"#汇编语言中的结构","children":[]},{"level":2,"title":"函数调用规约(结构体)","slug":"函数调用规约-结构体","link":"#函数调用规约-结构体","children":[]}],"git":{"createdTime":1709629879000,"updatedTime":1710225363000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":7.28,"words":2184},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture16-c-compatibles-structures-alignment-packing.md","localizedDate":"2024年3月5日","excerpt":"<h1> 第十六讲： 结构体和结构体对齐；信号</h1>\\n<p>C/C++结构体(<code>struct</code>)实际上只不过是按照一定的排列方式存储在内存中的多个数据。如果我们想要与使用结构体的C/C++程序进行交互，我们需要了解如何在汇编语言中构造出等效的内容。</p>\\n<p>一个简单的结构体的例子如下所示：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">thing</span> <span class=\\"token punctuation\\">{</span> \\n    <span class=\\"token keyword\\">double</span> a<span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">// 8 bytes</span>\\n    <span class=\\"token keyword\\">char</span>   b<span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">// 1 byte</span>\\n    <span class=\\"token keyword\\">int</span>    c<span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">// 4 bytes</span>\\n    <span class=\\"token keyword\\">char</span><span class=\\"token operator\\">*</span>  d<span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">// 8 bytes    </span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
