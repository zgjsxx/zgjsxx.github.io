const e=JSON.parse('{"key":"v-4a77de84","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-mktime.html","title":"Linux-0.11 kernel目录mktime.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录mktime.c详解 模块简介 该模块较为简单，仅有一个函数，仅在内核中使用，计算系统开机时的滴答数。 函数详解 kernel_mktime long kernel_mktime(struct tm * tm)","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-mktime.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录mktime.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录mktime.c详解 模块简介 该模块较为简单，仅有一个函数，仅在内核中使用，计算系统开机时的滴答数。 函数详解 kernel_mktime long kernel_mktime(struct tm * tm)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T05:47:29.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-18T05:47:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录mktime.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-18T05:47:29.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"kernel_mktime","slug":"kernel-mktime","link":"#kernel-mktime","children":[]}]}],"git":{"createdTime":1680579191000,"updatedTime":1681796849000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.07,"words":322},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-mktime.md","localizedDate":"2023年4月4日","excerpt":"<h1> Linux-0.11 kernel目录mktime.c详解</h1>\\n<h2> 模块简介</h2>\\n<p>该模块较为简单，仅有一个函数，仅在内核中使用，计算系统开机时的滴答数。</p>\\n<h2> 函数详解</h2>\\n<h3> kernel_mktime</h3>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">long</span> <span class=\\"token function\\">kernel_mktime</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tm</span> <span class=\\"token operator\\">*</span> tm<span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};