const e=JSON.parse('{"key":"v-30b8b062","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-open.html","title":"Linux-0.11 文件系统open.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 文件系统open.c详解 模块简介 函数详解 sys_ustat int sys_ustat(int dev, struct ustat * ubuf)","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-open.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 文件系统open.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 文件系统open.c详解 模块简介 函数详解 sys_ustat int sys_ustat(int dev, struct ustat * ubuf)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-05T13:54:25.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-05T13:54:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 文件系统open.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-05T13:54:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"sys_ustat","slug":"sys-ustat","link":"#sys-ustat","children":[]},{"level":3,"title":"sys_utime","slug":"sys-utime","link":"#sys-utime","children":[]},{"level":3,"title":"sys_access","slug":"sys-access","link":"#sys-access","children":[]},{"level":3,"title":"sys_chdir","slug":"sys-chdir","link":"#sys-chdir","children":[]},{"level":3,"title":"sys_chroot","slug":"sys-chroot","link":"#sys-chroot","children":[]},{"level":3,"title":"sys_chmod","slug":"sys-chmod","link":"#sys-chmod","children":[]},{"level":3,"title":"sys_chown","slug":"sys-chown","link":"#sys-chown","children":[]},{"level":3,"title":"sys_open","slug":"sys-open","link":"#sys-open","children":[]},{"level":3,"title":"sys_creat","slug":"sys-creat","link":"#sys-creat","children":[]},{"level":3,"title":"sys_close","slug":"sys-close","link":"#sys-close","children":[]}]},{"level":2,"title":"Q & A","slug":"q-a","link":"#q-a","children":[]}],"git":{"createdTime":1680686630000,"updatedTime":1680702865000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":0.37,"words":112},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-open.md","localizedDate":"2023年4月5日","excerpt":"<h1> Linux-0.11 文件系统open.c详解</h1>\\n<h2> 模块简介</h2>\\n<h2> 函数详解</h2>\\n<h3> sys_ustat</h3>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">int</span> <span class=\\"token function\\">sys_ustat</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> dev<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">ustat</span> <span class=\\"token operator\\">*</span> ubuf<span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
