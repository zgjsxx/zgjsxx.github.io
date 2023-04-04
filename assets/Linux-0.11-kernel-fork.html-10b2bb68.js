const n=JSON.parse('{"key":"v-d0b48072","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-fork.html","title":"Linux-0.11 kernel目录fork.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录fork.c详解 fork.c中主要实现内核对于创建新的进程的行为。其中copy_process是其最核心的函数。 copy_process int copy_process(int nr,long ebp,long edi,long esi,long gs,long none, \\t\\tlong ebx,long ecx,long edx, \\t\\tlong fs,long es,long ds, \\t\\tlong eip,long cs,long eflags,long esp,long ss)","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-fork.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录fork.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录fork.c详解 fork.c中主要实现内核对于创建新的进程的行为。其中copy_process是其最核心的函数。 copy_process int copy_process(int nr,long ebp,long edi,long esi,long gs,long none, \\t\\tlong ebx,long ecx,long edx, \\t\\tlong fs,long es,long ds, \\t\\tlong eip,long cs,long eflags,long esp,long ss)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-04T03:33:11.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-04T03:33:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录fork.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-04T03:33:11.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"copy_process","slug":"copy-process","link":"#copy-process","children":[]},{"level":2,"title":"copy_mem","slug":"copy-mem","link":"#copy-mem","children":[]},{"level":2,"title":"verify_area","slug":"verify-area","link":"#verify-area","children":[]},{"level":2,"title":"find_empty_process","slug":"find-empty-process","link":"#find-empty-process","children":[]}],"git":{"createdTime":1680579191000,"updatedTime":1680579191000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":4.97,"words":1491},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-fork.md","localizedDate":"2023年4月4日","excerpt":"<h1> Linux-0.11 kernel目录fork.c详解</h1>\\n<p>fork.c中主要实现内核对于创建新的进程的行为。其中copy_process是其最核心的函数。</p>\\n<h2> copy_process</h2>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">int</span> <span class=\\"token function\\">copy_process</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> nr<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> ebp<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> edi<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> esi<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> gs<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> none<span class=\\"token punctuation\\">,</span>\\n\\t\\t<span class=\\"token keyword\\">long</span> ebx<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> ecx<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> edx<span class=\\"token punctuation\\">,</span>\\n\\t\\t<span class=\\"token keyword\\">long</span> fs<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> es<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> ds<span class=\\"token punctuation\\">,</span>\\n\\t\\t<span class=\\"token keyword\\">long</span> eip<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> cs<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> eflags<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> esp<span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">long</span> ss<span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
