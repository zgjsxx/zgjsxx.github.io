const n=JSON.parse('{"key":"v-39a875f0","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-fcntl.html","title":"Linux-0.11 文件系统fcntl.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 文件系统fcntl.c详解 模块简介 本模块实现了文件描述符复制的系统调用dup和dup2。除此以外还包含了fcntl这个可以修改已经打开的文件的状态。 函数详解 dupfd static int dupfd(unsigned int fd, unsigned int arg)","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-fcntl.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 文件系统fcntl.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 文件系统fcntl.c详解 模块简介 本模块实现了文件描述符复制的系统调用dup和dup2。除此以外还包含了fcntl这个可以修改已经打开的文件的状态。 函数详解 dupfd static int dupfd(unsigned int fd, unsigned int arg)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-23T14:25:25.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-23T14:25:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 文件系统fcntl.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-23T14:25:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"dupfd","slug":"dupfd","link":"#dupfd","children":[]},{"level":3,"title":"sys_dup2","slug":"sys-dup2","link":"#sys-dup2","children":[]},{"level":3,"title":"sys_dup","slug":"sys-dup","link":"#sys-dup","children":[]},{"level":3,"title":"sys_fcntl","slug":"sys-fcntl","link":"#sys-fcntl","children":[]}]},{"level":2,"title":"Q & A","slug":"q-a","link":"#q-a","children":[]}],"git":{"createdTime":1680686630000,"updatedTime":1682259925000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":5}]},"readingTime":{"minutes":2.27,"words":680},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-fcntl.md","localizedDate":"2023年4月5日","excerpt":"<h1> Linux-0.11 文件系统fcntl.c详解</h1>\\n<h2> 模块简介</h2>\\n<p>本模块实现了文件描述符复制的系统调用dup和dup2。除此以外还包含了fcntl这个可以修改已经打开的文件的状态。</p>\\n<h2> 函数详解</h2>\\n<h3> dupfd</h3>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">dupfd</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">unsigned</span> <span class=\\"token keyword\\">int</span> fd<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">unsigned</span> <span class=\\"token keyword\\">int</span> arg<span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
