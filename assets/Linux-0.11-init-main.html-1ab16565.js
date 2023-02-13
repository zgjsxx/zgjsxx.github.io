const n=JSON.parse('{"key":"v-697b3c6e","path":"/posts/Linux/Linux-0.11-init-main.html","title":"Linux-0.11 入口函数main.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 入口函数main.c详解 if (memory_end &gt; 16*1024*1024) memory_end = 16*1024*1024; if (memory_end &gt; 12*1024*1024) buffer_memory_end = 4*1024*1024; else if (memory_end &gt; 6*1024*1024) buffer_memory_end = 2*1024*1024; else buffer_memory_end = 1*1024*1024;","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/Linux-0.11-init-main.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 入口函数main.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 入口函数main.c详解 if (memory_end &gt; 16*1024*1024) memory_end = 16*1024*1024; if (memory_end &gt; 12*1024*1024) buffer_memory_end = 4*1024*1024; else if (memory_end &gt; 6*1024*1024) buffer_memory_end = 2*1024*1024; else buffer_memory_end = 1*1024*1024;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-13T03:32:38.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-02-13T03:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 入口函数main.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-13T03:32:38.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1676259158000,"updatedTime":1676259158000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.18,"words":54},"filePathRelative":"posts/Linux/Linux-0.11-init-main.md","localizedDate":"2023年2月13日","excerpt":"<h1> Linux-0.11 入口函数main.c详解</h1>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>memory_end <span class=\\"token operator\\">&gt;</span> <span class=\\"token number\\">16</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">)</span>\\n    memory_end <span class=\\"token operator\\">=</span> <span class=\\"token number\\">16</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>memory_end <span class=\\"token operator\\">&gt;</span> <span class=\\"token number\\">12</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">)</span> \\n    buffer_memory_end <span class=\\"token operator\\">=</span> <span class=\\"token number\\">4</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>memory_end <span class=\\"token operator\\">&gt;</span> <span class=\\"token number\\">6</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">)</span>\\n    buffer_memory_end <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">else</span>\\n    buffer_memory_end <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token operator\\">*</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
