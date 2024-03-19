const s=JSON.parse('{"key":"v-54e1e62d","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture18-c-styles-strings.html","title":"第十八讲 c字符串","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第十八讲 c字符串 C风格字符串是一个字节数组，其中最后一个字节等于0, 我们可以遍历字符串直到找到0字节来计算出字符串的长度。在 C/C++ 中，这看起来像这样： size_t strlen(char* s) { size_t l = 0; while(*s != 0) { ++l; ++s; } return l; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture18-c-styles-strings.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第十八讲 c字符串"}],["meta",{"property":"og:description","content":"第十八讲 c字符串 C风格字符串是一个字节数组，其中最后一个字节等于0, 我们可以遍历字符串直到找到0字节来计算出字符串的长度。在 C/C++ 中，这看起来像这样： size_t strlen(char* s) { size_t l = 0; while(*s != 0) { ++l; ++s; } return l; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-19T09:03:41.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-19T09:03:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第十八讲 c字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-19T09:03:41.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"字符串指令","slug":"字符串指令","link":"#字符串指令","children":[{"level":3,"title":"rep前缀","slug":"rep前缀","link":"#rep前缀","children":[]},{"level":3,"title":"传输指令：lods、stos 和 movs","slug":"传输指令-lods、stos-和-movs","link":"#传输指令-lods、stos-和-movs","children":[]},{"level":3,"title":"比较指令：cmps 和 scas","slug":"比较指令-cmps-和-scas","link":"#比较指令-cmps-和-scas","children":[]},{"level":3,"title":"字符串操作 strlen","slug":"字符串操作-strlen","link":"#字符串操作-strlen","children":[]},{"level":3,"title":"并行化strlen","slug":"并行化strlen","link":"#并行化strlen","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[]}],"git":{"createdTime":1709629879000,"updatedTime":1710839021000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":6}]},"readingTime":{"minutes":12.6,"words":3780},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture18-c-styles-strings.md","localizedDate":"2024年3月5日","excerpt":"<h1> 第十八讲 c字符串</h1>\\n<p>C风格字符串是一个字节数组，其中最后一个字节等于0, 我们可以遍历字符串直到找到0字节来计算出字符串的长度。在 C/C++ 中，这看起来像这样：</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token class-name\\">size_t</span> <span class=\\"token function\\">strlen</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span><span class=\\"token operator\\">*</span> s<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">size_t</span> l <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">while</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">*</span>s <span class=\\"token operator\\">!=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token operator\\">++</span>l<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token operator\\">++</span>s<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> l<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{s as data};
