const e=JSON.parse('{"key":"v-31ce37c6","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-assemble-language.html","title":"Linux-0.11中的汇编","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11中的汇编 内嵌汇编 基本的格式是： asm ( \\"statements\\" : output_regs : input_regs : clobbered_regs );","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-assemble-language.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11中的汇编"}],["meta",{"property":"og:description","content":"Linux-0.11中的汇编 内嵌汇编 基本的格式是： asm ( \\"statements\\" : output_regs : input_regs : clobbered_regs );"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T06:37:05.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-18T06:37:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11中的汇编\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-18T06:37:05.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"内嵌汇编","slug":"内嵌汇编","link":"#内嵌汇编","children":[]},{"level":2,"title":"mov(x)","slug":"mov-x","link":"#mov-x","children":[]},{"level":2,"title":"AND","slug":"and","link":"#and","children":[]},{"level":2,"title":"std和cld","slug":"std和cld","link":"#std和cld","children":[]},{"level":2,"title":"TEST","slug":"test","link":"#test","children":[]},{"level":2,"title":"JE JZ","slug":"je-jz","link":"#je-jz","children":[]},{"level":2,"title":"JNE JNZ","slug":"jne-jnz","link":"#jne-jnz","children":[]}],"git":{"createdTime":1680686630000,"updatedTime":1681799825000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":4},{"name":"zgjsxx","email":"119160625@qq.com","commits":1}]},"readingTime":{"minutes":1.23,"words":370},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-assemble-language.md","localizedDate":"2023年4月5日","excerpt":"<h1> Linux-0.11中的汇编</h1>\\n<h2> 内嵌汇编</h2>\\n<p>基本的格式是：</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">asm</span> <span class=\\"token punctuation\\">(</span> <span class=\\"token string\\">\\"statements\\"</span> \\n    <span class=\\"token operator\\">:</span> output_regs \\n    <span class=\\"token operator\\">:</span> input_regs \\n    <span class=\\"token operator\\">:</span> clobbered_regs\\n    <span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};