const e=JSON.parse('{"key":"v-9dee97a2","path":"/posts/Linux/Linux-0.11/Linux-0.11-kernel-signal.html","title":"Linux-0.11 kernel目录进程管理signal.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录进程管理signal.c详解 signal.c主要涉及的是进程的信号处理。该章节中最难理解的是do_signal函数。 sys_sgetmask int sys_sgetmask()","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/Linux-0.11/Linux-0.11-kernel-signal.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录进程管理signal.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录进程管理signal.c详解 signal.c主要涉及的是进程的信号处理。该章节中最难理解的是do_signal函数。 sys_sgetmask int sys_sgetmask()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-21T03:32:45.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-03-21T03:32:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录进程管理signal.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-21T03:32:45.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"sys_sgetmask","slug":"sys-sgetmask","link":"#sys-sgetmask","children":[]},{"level":2,"title":"sys_ssetmask","slug":"sys-ssetmask","link":"#sys-ssetmask","children":[]},{"level":2,"title":"save_old","slug":"save-old","link":"#save-old","children":[]},{"level":2,"title":"get_new","slug":"get-new","link":"#get-new","children":[]},{"level":2,"title":"sys_signal","slug":"sys-signal","link":"#sys-signal","children":[]},{"level":2,"title":"sys_sigaction","slug":"sys-sigaction","link":"#sys-sigaction","children":[]},{"level":2,"title":"do_signal","slug":"do-signal","link":"#do-signal","children":[]}],"git":{"createdTime":1678414231000,"updatedTime":1679369565000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":9}]},"readingTime":{"minutes":6.27,"words":1880},"filePathRelative":"posts/Linux/Linux-0.11/Linux-0.11-kernel-signal.md","localizedDate":"2023年3月10日","excerpt":"<h1> Linux-0.11 kernel目录进程管理signal.c详解</h1>\\n<p>signal.c主要涉及的是进程的信号处理。该章节中最难理解的是<strong>do_signal</strong>函数。</p>\\n<h2> sys_sgetmask</h2>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">int</span> <span class=\\"token function\\">sys_sgetmask</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
